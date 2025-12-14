"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product, Category } from "@/lib/actions/products";
import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import ProductFormModal from "./ProductFormModal";
import CategoryManager from "./CategoryManager";
import { MenuSquare, PackagePlus } from "lucide-react";


type Props = {
  initialProducts: Product[];
  categories: Category[];
};

export default function DashboardClient({ initialProducts, categories }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
    router.refresh(); 
  };

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingProduct(null);
    router.refresh(); // ✅ Refresh to get latest data
  }, [router]);

  const handleCloseCategoryManager = useCallback(() => {
    setShowCategoryManager(false);
    router.refresh(); // ✅ Refresh to get latest categories
  }, [router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between px-2 items-center">
        <h2 className="sm:text-2xl text-xl font-bold text-gray-900">उत्पादन व्यवस्थापन</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="bg-gray-600 items-center flex gap-1 sm:gap-4 text-white px-4 py-2 rounded-xl hover:brightness-110 transition-all"
          >
            <MenuSquare className="" /><span className="hidden sm:flex">श्रेणी व्यवस्थापन </span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0C8033] flex gap-1 sm:gap-4 text-white px-4 py-2 rounded-xl hover:brightness-110 transition-all"
          >
            <PackagePlus className="" /><span className="hidden sm:flex">नयाँ उत्पादन थप्नुहोस्  </span>
            
          </button>
        </div>
      </div>

      {/* Modals */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onClose={handleCloseForm}
        />
      )}

      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onClose={handleCloseCategoryManager}
        />
      )}

      {/* Filters */}
      <ProductFilters
        products={products}
        categories={categories}
        onFilterChange={setFilteredProducts}
      />

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
      />
    </div>
  );
}