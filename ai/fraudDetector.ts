// ai/fraudDetector.ts
import * as tf from '@tensorflow/tfjs-node';

export async function trainFraudModel(voteData: number[][], labels: number[]) {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, inputShape: [voteData[0].length], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  const xs = tf.tensor2d(voteData);
  const ys = tf.tensor2d(labels, [labels.length, 1]);
  await model.fit(xs, ys, { epochs: 30, batchSize: 16, verbose: 0 });

  await model.save('file://./models/fraud-model');
  console.log('Fraud model trained and saved.');
}

export async function detectAnomalies(newVotes: number[][]) {
  const model = await tf.loadLayersModel('file://./models/fraud-model/model.json');
  const xs = tf.tensor2d(newVotes);
  const predictions = model.predict(xs) as tf.Tensor;
  return predictions.arraySync().map((v: number[]) => v[0] > 0.7); // true = anomaly
}
