/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('photo_likes', (table) => {
        table.specificType('id', 'char(36) primary key');
        table
            .string('photo_id', 36)
            .references('id')
            .inTable('photo')
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
    return knex.schema.dropTable('photo_likes');
};
