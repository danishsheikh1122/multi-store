"use client";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/apiAlert";
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
import useOriginHook from "@/hooks/use-origin-hook";
import prisma from "@/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
  initialData: Store;
}
const formSchema = z.object({
  name: z.string().min(1),
});
type FormSettings = z.infer<typeof formSchema>;
const SettingsForm: React.FC<Props> = ({ initialData }) => {
  const [open, setOpen] = useState(false); //it will control delete alert model
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const router = useRouter();
  const origin = useOriginHook();
  const form = useForm<FormSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: FormSettings) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${param.storeId}`, data);
      router.refresh();
      toast.success("Store updated successfully");
    } catch (e) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${param.storeId}`);
      router.push("/");
      router.refresh();
      toast.success("Store deleted successfully");
    } catch (e) {
      toast.error("Make sure you removed all products and categories first.");
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
        <Heading
          title="Settings"
          description="Manage store preferences"
        ></Heading>
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4"></Trash>
        </Button>
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
                      placeholder="Store name"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            save changes
          </Button>
        </form>
      </Form>
      <Separator></Separator>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL" //only next public is important
        // description={`${origin}/api/${param.storeId}`} this will refer to window.location.origin but it will cause hydration errors so we've created a hook
        description={`${origin}/api/${param.storeId}`}//this will not cause hydation error
        
        variant="public"
      ></ApiAlert>
    </>
  );
};

export default SettingsForm;
