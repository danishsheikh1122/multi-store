"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface Props {
  title: string;
  description: string;
  variant: "public" | "admin";
}
const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<Props> = ({ title, description, variant }) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Description copied to clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4"></Server>
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        {/* code native html element */}
        <code className="reative rounded bg-muted px-[0.3rem] py-[0.2rem]font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => onCopy(description)}
        >
          <Copy className="h-4 w-4"></Copy>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
