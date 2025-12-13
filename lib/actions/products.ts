// app/actions/products.ts
"use server";

import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { eq, desc, } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

// Get all products
export async function getProducts() {
  try {
    const products = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.createdAt));
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: "Failed to fetch products" };
  }
}

// Create product
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db.insert(productsTable).values({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, error: "Failed to create product" };
  }
}

// Update product
export async function updateProduct(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await db
      .update(productsTable)
      .set({
        name,
        description,
        price,
        category,
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(productsTable.id, id));

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, error: "Failed to update product" };
  }
}

// Delete product
export async function deleteProduct(id: number) {
  try {
    await db.delete(productsTable).where(eq(productsTable.id, id));

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
}