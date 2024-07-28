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
import ImageUplaod from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboards } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

interface Props {
  initialData: Billboards | null;
}

type BillboardFormSettings = z.infer<typeof formSchema>;

const BillBoardForm: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false); //it will control delete alert model
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const router = useRouter();

  const title = initialData ? "Edit billboards" : "Create billboards";
  const description = initialData
    ? "Edit a billboards"
    : "Add a new billboards";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboards created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormSettings) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${param.storeId}/billboard/${param.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${param.storeId}/billboard`, data);
      }
      router.push(`/${param.storeId}/billboard`);
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
      await axios.delete(
        `/api/${param.storeId}/billboard/${param.billboardId}`
      );
      router.push(`/${param.storeId}/billboard`);
      router.refresh();
      toast.success("Billboard deleted successfully");
    } catch (e) {
      toast.error("Make sure you removed all categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUplaod
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)} //this will set image url from cloudnairy to form data and onSubmit function will extract it
                    onRemove={() => field.onChange("")} //on change ye sab field se aare hai
                  ></ImageUplaod>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator></Separator>
    </>
  );
};

export default BillBoardForm;
