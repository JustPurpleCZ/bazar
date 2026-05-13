import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bazar = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  seller: text("seller").notNull(),
  status: text("status").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(),
  desc: text("desc").notNull(),
  image: text("image").notNull(),
  email: text("email").notNull()

});
