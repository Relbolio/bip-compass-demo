import { FileIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

type Props = {
  // apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
  // onChange: (url?: string) => void
  // value?: string

  onChange: (base64: string, fileType?: "image" | "pdf") => void;
  label: string;
  value?: string;
  disabled?: boolean;
};

const FileUpload = ({ onChange, label, value, disabled }: Props) => {
  // const type = value?.split('.').pop()

  const [base64, setBase64] = useState(value);
  const [fileType, setFileType] = useState<"image" | "pdf">("image");

  const handleChange = useCallback(
    (base64: string, type: "image" | "pdf") => {
      onChange(base64, type);
      setFileType(type);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        const type = file.type.startsWith("image/") ? "image" : "pdf";
        handleChange(event.target.result, type);
      };
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsBinaryString(file);
      }
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
  });

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {fileType !== "pdf" ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={() => onChange("")} variant="ghost" type="button">
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    );
  }
  return (
    // <div className="w-full bg-muted/30">
    //   <UploadDropzone
    //     endpoint={apiEndpoint}
    //     onClientUploadComplete={(res) => {
    //       onChange(res?.[0].url)
    //     }}
    //     onUploadError={(error: Error) => {
    //       console.log(error)
    //     }}
    //   />
    // </div>
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-muted-foreground ">{label}</p>
        <div className="text-muted-foreground">
          <Upload className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
