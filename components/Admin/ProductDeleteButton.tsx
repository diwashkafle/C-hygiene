"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/actions/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner"

// 👇 1. UPDATE THE PROPS HERE so TypeScript stops yelling
export function ProductDeleteButton({
  productId,
  onOptimisticDelete, 
}: {
  productId: number;
  onOptimisticDelete: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setOpen(false); // Close dialog instantly

    // 👇 2. THIS IS WHERE IT IS USED
    // This removes the row from the table immediately
    onOptimisticDelete(productId); 
    
    try {
      const result = await deleteProduct(productId);
      
      if (result.success) {
        toast.success("उत्पादन सफलतापूर्वक मेटाइयो");
        router.refresh(); 
      } else {
        toast.error("उत्पादन मेटाउन असफल भयो");
        router.refresh(); 
      }
    } catch (error) {
      toast.error("Something went wrong");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50">
          <Trash2 size={16} />
          मेट्नुहोस्
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>यो उत्पादन मेटाउनुहोस् ?</DialogTitle>
          <DialogDescription>
            मेटाएपछि यसलाई पूर्ववत गर्न सकिँदैन, त्यसैले कृपया सावधानीपूर्वक
            अगाडि बढ्नुहोस्।
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)} 
            disabled={isLoading}
          >
            रद्द गर्नुहोस्
          </Button>
          <Button 
            variant="destructive"
            onClick={handleDelete} 
            disabled={isLoading}
          >
            {isLoading ? "मेटाउँदै..." : "मेटाउनुहोस्"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}