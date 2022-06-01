import r from 'rethinkdb';

import DB_CONFIG from '../config';

const conn = () => 
  r.connect(DB_CONFIG).then(conn => ({ conn, table: r.table('rating') }));

export const insertRating = rating =>
  conn()
    .then(({ conn, table }) => table
      .insert(rating, { conflict: 'replace' })
      .run(conn));

export const listRatings = (offset = 0, size = 20) =>
  conn()
    .then(({ conn, table }) => table
      .orderBy({ index: r.desc('timestamp') })
      .skip(offset)
      .limit(size)
      .run(conn))
    .then(cursor => cursor.toArray());