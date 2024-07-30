"use client";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sizes } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

interface Props {
  initialData: Sizes | null;
}

type SizesFormSettings = z.infer<typeof formSchema>;

const SizeFormSettings: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false); //it will control delete alert model
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const router = useRouter();

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizesFormSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizesFormSettings) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${param.storeId}/sizes/${param.sizeId}`, data);
      } else {
        await axios.post(`/api/${param.storeId}/sizes`, data);
      }
      router.push(`/${param.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (e) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${param.storeId}/sizes/${param.sizeId}`);
      router.push(`/${param.storeId}/sizes`);
      router.refresh();
      toast.success("Size deleted successfully");
    } catch (e) {
      toast.error("Make sure you removed all sizes first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const sizes = [
    { sizeValue: "xs" },
    { sizeValue: "sm" },
    { sizeValue: "md" },
    { sizeValue: "lg" },
    { sizeValue: "xl" },
    { sizeValue: "xxl" },
  ];

  return (
    <>
      {/* this will handel delete button */}
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      ></AlertModal>

      <div className="flex justify-between items-center">
        <Heading title={title} description={description}></Heading>
        {initialData && (
          <Button
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4"></Trash>
          </Button>
        )}
      </div>
      <Separator></Separator>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={"Select a size"}
                          defaultValue={field.value}
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((item) => (
                        <SelectItem key={item.sizeValue} value={item.sizeValue}>
                          {item.sizeValue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator></Separator>
    </>
  );
};

export default SizeFormSettings;
