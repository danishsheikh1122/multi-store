"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface Props {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUplaod: React.FC<Props> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    //cloudinary dosent have type safety so any
    onChange(result.info.secure_url); //this is not from documentation we figured out
  };

  if (!isMounted) return null; //means we are in server side no need to render anything and cause hydration error
  //so we will check if we are in client side only then we will render below return
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(
          //this will iterate over uploaded images
          (
            url //it will contain all the img urls
          ) => (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash className="h-4 w-4"></Trash>
                </Button>
              </div>
                <Image  className="object-cover" alt="image" src={url} fill/>
            </div>
          )
        )}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        // onUploadAdded={onUpload}
        uploadPreset="an85tgnf"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button disabled={disabled} onClick={onClick} variant={"secondary"}>
              <ImagePlus className="h-4 w-4"></ImagePlus>
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUplaod;
