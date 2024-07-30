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
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .regex(/^#/, { message: "String must be a vallid hex code" }),
});

interface Props {
  initialData: Color | null;
}

type ColorsFormSettings = z.infer<typeof formSchema>;

const ColorFormSettings: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false); //it will control delete alert model
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const router = useRouter();

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color" : "Add a new color";
  const toastMessage = initialData ? "Color updated." : "Color created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ColorsFormSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorsFormSettings) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${param.storeId}/colors/${param.colorId}`, data);
      } else {
        await axios.post(`/api/${param.storeId}/colors`, data);
      }
      router.push(`/${param.storeId}/colors`);
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
      await axios.delete(`/api/${param.storeId}/colors/${param.colorId}`);
      router.push(`/${param.storeId}/colors`);
      router.refresh();
      toast.success("Color deleted successfully");
    } catch (e) {
      toast.error("Make sure you removed all colors first.");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color name"
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
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      ></Input>
                      <div
                        className="p-4 border rounded-full "
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
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

export default ColorFormSettings;
