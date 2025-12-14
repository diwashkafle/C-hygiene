import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("Categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),
  createdAt: timestamp({withTimezone:true}).notNull().defaultNow(),
});

export const productsTable = pgTable("Products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
  price: integer().notNull(),
  categoryId: integer().notNull().references(() => categoriesTable.id, { onDelete: 'restrict' }),
  imageUrl: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({withTimezone:true}).notNull().defaultNow(),
  updatedAt: timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const adminsTable = pgTable("Admins", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 50 }).notNull().default("admin"),
  createdAt: timestamp({withTimezone:true}).notNull().defaultNow(),
  updatedAt: timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(() => new Date()),
});