export function analyzeSentiment(feedback: string) {
  const positiveWords = ['good','great','love','happy','excellent'];
  const negativeWords = ['bad','hate','angry','terrible','poor'];
  const text = feedback.toLowerCase();
  let score = 0;
  positiveWords.forEach(word => { if(text.includes(word)) score += 1; });
  negativeWords.forEach(word => { if(text.includes(word)) score -= 1; });
  return score; // positive = happy users, negative = unhappy users
}
