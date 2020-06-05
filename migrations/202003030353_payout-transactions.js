exports.up = (knex) => knex.schema.createTable('payout-transactions', (table) => {
  table.increments('id').unsigned().notNullable();
  table.text('payoutId').unsigned().notNullable();
  table.text('senderItemId').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('payout-transactions');
