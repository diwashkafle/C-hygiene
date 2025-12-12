import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("Products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
  price: integer().notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({withTimezone:true}).notNull().defaultNow(),
  updatedAt: timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(() => new Date()),
});
