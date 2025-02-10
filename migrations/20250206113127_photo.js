/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('photo', (table) => {
        table.specificType('id', 'char(36) primary key');
        table.string('name').notNullable();
        table.string('description');
        table.timestamps(true, true);
        table
            .string('account_id', 36)
            .references('id')
            .inTable('account')
            .onDelete('cascade');
        table
            .string('user_id', 36)
            .references('id')
            .inTable('users')
            .onDelete('cascade');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('photo');
};
