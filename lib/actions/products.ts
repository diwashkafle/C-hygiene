"use server";

import { db } from "@/db";
import { productsTable, categoriesTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImageByUrl } from "@/lib/cloudinary";

export type Category = {
  id: number;
  name: string;
  createdAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string | null;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getCategories() {
  try {
    const categories = await db
      .select()
      .from(categoriesTable)
      .orderBy(categoriesTable.name);

    return { success: true, data: categories };
  } catch (error) {
    console.error("Get categories error:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createCategory(name: string) {
  try {
    const [newCategory] = await db
      .insert(categoriesTable)
      .values({ name })
      .returning();

    revalidatePath("/(protected)/admin/dashboard", "page");
    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Create category error:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

    revalidatePath("/(protected)/admin/dashboard", "page");
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      success: false,
      error: "Cannot delete category with existing products",
    };
  }
}

export async function getProducts() {
  try {
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        description: productsTable.description,
        price: productsTable.price,
        categoryId: productsTable.categoryId,
        categoryName: categoriesTable.name,
        imageUrl: productsTable.imageUrl,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
      })
      .from(productsTable)
      .leftJoin(
        categoriesTable,
        eq(productsTable.categoryId, categoriesTable.id)
      )
      .orderBy(desc(productsTable.createdAt));

    return { success: true, data: products };
  } catch (error) {
    console.error("Get products error:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const imageUrl = formData.get("imageUrl") as string;

    const [newProduct] = await db
      .insert(productsTable)
      .values({
        name,
        description,
        price,
        categoryId,
        imageUrl,
      })
      .returning();

    revalidatePath("/(protected)/admin/dashboard", "page");
    return {
      success: true,
      message: "Product created successfully",
      date: newProduct,
    };
  } catch (error) {
    console.error("Create product error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create product";
    return { success: false, error: errorMessage };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const categoryId = parseInt(formData.get("categoryId") as string);
    const newImageUrl = formData.get("imageUrl") as string;

    const [oldProduct] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    if (!oldProduct) {
      return { success: false, error: "Product not found" };
    }

    const [updatedProduct] = await db
      .update(productsTable)
      .set({
        name,
        description,
        price,
        categoryId,
        imageUrl: newImageUrl,
        updatedAt: new Date(),
      })
      .where(eq(productsTable.id, id))
      .returning();

    if (oldProduct.imageUrl !== newImageUrl) {
      deleteCloudinaryImageByUrl(oldProduct.imageUrl).catch((error) => {
        console.error("Failed to delete old image from Cloudinary:", error);
      });
    }

    revalidatePath("/(protected)/admin/dashboard", "page");
    return {
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: number) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
      .limit(1);

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    await db.delete(productsTable).where(eq(productsTable.id, id));

    deleteCloudinaryImageByUrl(product.imageUrl).catch((error) => {
      console.error("Failed to delete image from Cloudinary:", error);
    });

    revalidatePath("/(protected)/admin/dashboard", "page");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
