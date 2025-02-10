/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('account_user', (table) => {
        table.increments('key').primary().unsigned();
        table.string('username');
        table.string('permission', 64);
        table.string('bio');
        table.string('avatar');
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
    return knex.schema.dropTable('account_user');
};
