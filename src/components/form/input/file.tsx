import Image from "next/image";
import React, { RefObject, useRef, useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";

interface FileInputProps {
  label?: string;
  secondLabel?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgClassName?: string;
  value?: string | null;
  onChange: (file: File | null, fileUrl: string | null) => void;
  id: string;
}
const FileInput: React.FC<FileInputProps> = ({
  label,
  secondLabel,
  imgHeight,
  imgWidth,
  id,
  imgClassName,
  value,
  onChange,
}) => {
  const [filePath, setFilePath] = useState<string | null>(() => {
    if (value) return value;

    return null;
  });

  const inputRef: RefObject<any> = useRef(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget?.files && event.currentTarget?.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setFilePath(url);
      onChange(file, url);
    }
  };

  function handleDelete() {
    inputRef.current.value = "";
    setFilePath(null);
    onChange(null, null);
  }

  return (
    <div>
      {label ? (
        <span className="font-light mb-2 block text-sm">{label}</span>
      ) : null}
      {!filePath ? (
        <label
          htmlFor={id}
          className="border-2 border-gray-300 border-dashed py-7 rounded-lg w-full block hover:bg-gray-50 transition-all cursor-pointer"
        >
          <div>
            <SlCloudUpload className="mx-auto text-purple-900 w-5 h-5 mb-2" />
            {secondLabel ? (
              <span className="text-purple-900 font-light text-center block text-sm">
                {secondLabel}
              </span>
            ) : null}
          </div>
        </label>
      ) : null}
      <input
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
      />
      {filePath ? (
        <div className="p-3 border-gray-200 border rounded-lg">
          <div className="relative">
            <button
              type="button"
              className="absolute right-0"
              onClick={handleDelete}
            >
              <TiDeleteOutline className="w-9 h-9 text-gray-500" />
            </button>

            <Image
              src={filePath}
              alt={label || "Image input"}
              className={`object-cover w-full ${imgClassName}`}
              width={imgWidth || 200}
              height={imgHeight || 200}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FileInput;
