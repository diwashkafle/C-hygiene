"use client";

import Image from "next/image";
import { Product, deleteProduct } from "@/lib/actions/products";
import { useState } from "react";
import { Trash2, Edit } from "lucide-react";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
};

export default function ProductList({ products, onEdit }: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("के तपाईं यो उत्पादन मेटाउन निश्चित हुनुहुन्छ?")) return;

    setDeletingId(id);
    const result = await deleteProduct(id);
    
    if (result.success) {
      // Product deleted, page will revalidate
    } else {
      alert(result.error);
    }
    setDeletingId(null);
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
        <p className="text-gray-500">कुनै उत्पादन भेटिएन</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                फोटो
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                नाम
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                श्रेणी
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                मूल्य
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                मिति
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                कार्य
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-16 w-16 relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {product.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.categoryName || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  रु. {product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString("ne-NP")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-[#0C8033] hover:text-green-700 inline-flex items-center gap-1"
                  >
                    <Edit size={16} />
                    सम्पादन
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    {deletingId === product.id ? "मेटाउँदै..." : "मेटाउनुहोस्"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}