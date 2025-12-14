"use client";

import { useState } from "react";
import { X, Trash2, Plus } from "lucide-react";
import { Category, createCategory, deleteCategory } from "@/lib/actions/products";

type Props = {
  categories: Category[];
  onClose: () => void;
};

export default function CategoryManager({ categories, onClose }: Props) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;

    setIsAdding(true);
    const result = await createCategory(newCategoryName);
    
    if (result.success) {
      setNewCategoryName("");
    } else {
      alert(result.error);
    }
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("के तपाईं यो श्रेणी मेटाउन निश्चित हुनुहुन्छ?")) return;

    const result = await deleteCategory(id);
    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">श्रेणी व्यवस्थापन</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Add New Category */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="नयाँ श्रेणी नाम"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C8033]"
            />
            <button
              onClick={handleAdd}
              disabled={isAdding || !newCategoryName.trim()}
              className="bg-[#0C8033] text-white px-4 py-2 rounded-lg hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
            >
              <Plus size={18} />
              थप्नुहोस्
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{category.name}</span>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}