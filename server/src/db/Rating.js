import r from 'rethinkdb';

import DB_CONFIG from '../config';

const conn = () => 
  r.connect(DB_CONFIG).then(conn => ({ conn, table: r.table('rating') }));

export const insertRating = rating =>
  conn()
    .then(({ conn, table }) => table
      .insert(rating, { conflict: 'replace' })
      .run(conn));