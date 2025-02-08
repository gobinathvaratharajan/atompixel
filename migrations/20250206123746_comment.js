/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comment", (table) => {
    table.specificType("id", "char(36) primary key");
    table.string("text").notNullable();
    table.timestamp("create_at").defaultTo(knex.fn.now());
    table
      .string("photo_id", 36)
      .references("id")
      .inTable("photo")
      .onDelete("cascade");
    table
      .string("account_id", 36)
      .references("id")
      .inTable("account")
      .onDelete("cascade");
    table
      .string("user_id", 36)
      .references("id")
      .inTable("users")
      .onDelete("cascade");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comment");
};
