// components/Admin/DashboardClient.tsx
"use client";

import { useState, useEffect } from "react"; // ✅ Removed useCallback
import { useRouter } from "next/navigation";
import { Product, Category } from "@/lib/actions/products";
import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import ProductFormModal from "./ProductFormModal";
import CategoryManager from "./CategoryManager";
import { MenuSquare, PackagePlus } from "lucide-react";
import { toast } from "sonner"

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

  useEffect(() => {
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ✅ No useCallback needed - simple functions
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    router.refresh();
  };

  const handleCloseCategoryManager = () => {
    setShowCategoryManager(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between px-2 items-center">
        <h2 className="sm:text-2xl text-xl font-bold text-gray-900">उत्पादन व्यवस्थापन</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="bg-gray-600 items-center flex gap-1 sm:gap-4 text-white px-4 py-2 rounded-xl hover:brightness-110 transition-all"
          >
            <MenuSquare />
            <span className="hidden sm:flex">श्रेणी व्यवस्थापन</span>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0C8033] flex gap-1 sm:gap-4 text-white px-4 py-2 rounded-xl hover:brightness-110 transition-all"
          >
            <PackagePlus />
            <span className="hidden sm:flex">नयाँ उत्पादन थप्नुहोस्</span>
          </button>
        </div>
      </div>

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

      <ProductFilters
        products={products}
        categories={categories}
        onFilterChange={setFilteredProducts}
      />

      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
      />
    </div>
  );
}