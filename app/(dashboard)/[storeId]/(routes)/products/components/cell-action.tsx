"use client";
import React, { useState } from "react";
import { ProductColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface Props {
  data: ProductColumn;
}

const CellAction: React.FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product id copied to the clipboard.");
  };

  const onEdit = (id: string) => {
    router.push(`/${params.storeId}/products/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast.success("Product deleted successfully");
    } catch (e) {
      toast.error("Make sure you removed all products");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      {/* this alert will handel delete button */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      ></AlertModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">open menu</span>
            <MoreHorizontal className="h-4 w-4"></MoreHorizontal>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 w-4 h-4"></Copy>
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(data.id)}>
            <Edit className="mr-2 w-4 h-4"></Edit>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4"></Trash>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
