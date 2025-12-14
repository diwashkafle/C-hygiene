// components/Admin/ProductFormModal.tsx
"use client";

import { useState } from "react";
import { createProduct, updateProduct, Product, Category, createCategory } from "@/lib/actions/products";
import { X, Plus } from "lucide-react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

type Props = {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
};

export default function ProductFormModal({ product, categories, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    product?.categoryId?.toString() || ""
  );
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
    const router = useRouter();

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    setIsCreatingCategory(true);
    const result = await createCategory(newCategoryName.trim());

    if (result.success && result.data) {
      setLocalCategories([...localCategories, result.data]);
      setSelectedCategoryId(result.data.id.toString());
      setNewCategoryName("");
      setShowNewCategory(false);
      router.refresh();
    } else {
      toast.error(result.error || "Failed to create category");
    }
    setIsCreatingCategory(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!imageUrl) {
      toast.error("कृपया फोटो अपलोड गर्नुहोस् वा URL राख्नुहोस्");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", imageUrl);

    const result = product
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);

      setIsSubmitting(false);

    if (result.success) {
      toast.success(`उत्पादन ${product ? "अपडेट" : "सिर्जना"} सफल भयो`);
      onClose();
    } else {
      toast.error(result.error || "Failed to create/update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              <div className="space-y-2">
                {!showNewCategory ? (
                  <div className="flex gap-2">
                    <select
                      name="categoryId"
                      required
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
                    >
                      <option value="">छान्नुहोस्</option>
                      {localCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategory(true)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="नयाँ श्रेणी थप्नुहोस्"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="नयाँ श्रेणी नाम"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033] focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleCreateCategory();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleCreateCategory}
                        disabled={isCreatingCategory || !newCategoryName.trim()}
                        className="px-3 py-2 bg-[#0C8033] text-white rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCreatingCategory ? "..." : "थप्नुहोस्"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewCategory(false);
                          setNewCategoryName("");
                        }}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              उत्पादनको फोटो *
            </label>
            <CloudinaryUploadWidget
              value={imageUrl}
              onChange={setImageUrl}
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