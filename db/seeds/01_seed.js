/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('songs').del();
  await knex('artists').del();

  await knex('artists').insert([
    {name: 'mr.children'},
    {name: 'B\'z'},
    {name: 'スピッツ'},
  ]);

  await knex('songs').insert([
    {name: 'HANABI', artist_id: 1},
    {name: 'Tommorow Never Knows', artist_id: 1},
    {name: '終わりなき旅', artist_id: 1},
    {name: 'ultra soul', artist_id: 2},
    {name: 'OCEAN', artist_id: 2},
    {name: 'ロビンソン', artist_id: 3},
  ]);
};
