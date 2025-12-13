// components/Admin/DashboardClient.tsx
"use client";

import { useState } from "react";
import { Product } from "@/lib/actions/products";
import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import ProductFormModal from "./ProductFormModal";

type Props = {
  initialProducts: Product[];
};

export default function DashboardClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">उत्पादन व्यवस्थापन</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#0C8033] text-white px-4 py-2 rounded-xl hover:brightness-110 transition-all"
        >
          नयाँ उत्पादन थप्नुहोस्
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}

      {/* Filters */}
      <ProductFilters
        products={products}
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