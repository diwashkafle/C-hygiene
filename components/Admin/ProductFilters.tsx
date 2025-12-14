"use client";

import { useState, useEffect } from "react";
import { Product, Category } from "@/lib/actions/products";

type Props = {
  products: Product[];
  categories: Category[];
  onFilterChange: (filtered: Product[]) => void;
};

export default function ProductFilters({ products, categories, onFilterChange }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState("सबै");

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategoryId !== "all") {
      filtered = filtered.filter((p) => p.categoryId === parseInt(selectedCategoryId));
    }

    const now = new Date();
    if (dateFilter === "आज") {
      filtered = filtered.filter((p) => {
        const productDate = new Date(p.createdAt);
        return productDate.toDateString() === now.toDateString();
      });
    } else if (dateFilter === "७ दिन") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((p) => new Date(p.createdAt) >= weekAgo);
    } else if (dateFilter === "३० दिन") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((p) => new Date(p.createdAt) >= monthAgo);
    }

    onFilterChange(filtered);
  }, [searchTerm, selectedCategoryId, dateFilter, products, onFilterChange]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            खोज्नुहोस्
          </label>
          <input
            type="text"
            placeholder="उत्पादन खोज्नुहोस्..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            श्रेणी
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
          >
            <option value="all">सबै श्रेणी</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मिति अनुसार
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
          >
            <option value="सबै">सबै समय</option>
            <option value="आज">आज</option>
            <option value="७ दिन">पछिल्लो ७ दिन</option>
            <option value="३० दिन">पछिल्लो ३० दिन</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {products.length} उत्पादनहरू देखाइँदै
      </div>
    </div>
  );
}