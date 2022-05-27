import fs from 'fs';

const str = fs.readFileSync('./data/triplets_wm_sbert_title_subjects_256d_500.json');
const triplets = JSON.parse(str);

export const getRandomTriplet = () => {
  const randomIndex = Math.floor(Math.random() * triplets.length);
  return triplets[randomIndex];
}