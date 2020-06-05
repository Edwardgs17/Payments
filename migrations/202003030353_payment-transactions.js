exports.up = (knex) => knex.schema.createTable('payment-transactions', (table) => {
  table.increments('id').unsigned().notNullable();
  table.text('paymentId').unsigned().notNullable();
  table.text('payerId').unsigned().notNullable();
  table.text('sku').unsigned().notNullable();
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable('payment-transactions');
