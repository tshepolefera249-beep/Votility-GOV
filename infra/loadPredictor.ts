// infra/loadPredictor.ts
import os from 'os';
import { exec } from 'child_process';
import * as tf from '@tensorflow/tfjs-node';

let model: tf.LayersModel;

export async function trainLoadModel(samples: number[][], labels: number[]) {
  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [samples[0].length], units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  await model.fit(tf.tensor2d(samples), tf.tensor2d(labels, [labels.length, 1]), { epochs: 15 });
}

export async function predictAndScale() {
  const cpu = os.loadavg()[0];
  const mem = 1 - os.freemem() / os.totalmem();
  const pred = model.predict(tf.tensor2d([[cpu, mem]])) as tf.Tensor;
  const [shouldScale] = (await pred.data()) as Float32Array;

  if (shouldScale > 0.7) {
    console.log('⚡ Predicted load spike — scaling up...');
    exec('kubectl scale deployment votility-app --replicas=3');
  } else {
    console.log('✅ Load normal.');
  }
}
