// components/Admin/ProductFormModal.tsx
"use client";

import { useState } from "react";
import { createProduct, updateProduct, Product } from "@/lib/actions/products";
import { X } from "lucide-react";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductFormModal({ product, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const result = product
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

    if (result.success) {
      onClose();
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            {product ? "उत्पादन सम्पादन गर्नुहोस्" : "नयाँ उत्पादन थप्नुहोस्"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              उत्पादनको नाम *
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={product?.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
              placeholder="जस्तै: प्रांगारिक मल"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              विवरण *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={product?.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
              placeholder="उत्पादनको संक्षिप्त विवरण"
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                मूल्य (रुपैयाँमा) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                defaultValue={product?.price}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
                placeholder="५०"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                श्रेणी *
              </label>
              <select
                name="category"
                required
                defaultValue={product?.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
              >
                <option value="">छान्नुहोस्</option>
                <option value="कृषि">कृषि</option>
                <option value="सरसफाई">सरसफाई</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              फोटो URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              defaultValue={product?.imageUrl}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              रद्द गर्नुहोस्
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0C8033] text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "सुरक्षित गर्दै..." : "सुरक्षित गर्नुहोस्"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}