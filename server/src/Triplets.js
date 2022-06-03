import fs from 'fs';

// The app loads multiple triplet sets. Each is from a 
// different museum and based on a different embedding
// method.
const TripletConfig = [
  { museum: 'wm', method: 'sentence', path: './data/triplets_wm_sbert_title_subjects_256d_500.json', proxy: true },
  { museum: 'wm', method: 'graph', path: './data/triplets_wm_graph_500.json', proxy: true },
  { museum: 'bel', method: 'sentence', path: './data/triplets_bel_sbert_Title_Description_ExpertTags_256d_500.json' },
  { museum: 'bel', method: 'graph', path: './data/triplets_bel_graph_500.json' },
]

const triplets = TripletConfig.reduce((all, config) => {
  console.log('Loading triplet file: ' + config.path);

  const str = fs.readFileSync(config.path);

  const triplets = JSON.parse(str).map(t => ({
    museum: config.museum,
    method: config.method,
    proxy: config.proxy,
    ...t,
  }));
  
  return [...all, ...triplets];
}, []);

console.log('Loaded ' + triplets.length + ' triplets');

export const getRandomTriplet = () => {
  const randomIndex = Math.floor(Math.random() * triplets.length);
  return triplets[randomIndex];
}