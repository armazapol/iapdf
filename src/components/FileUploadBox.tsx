"use client";

import React, { useEffect, useRef, useState } from "react";
import { Eye, Trash2, UploadCloud } from "lucide-react";

interface FileUploadBoxProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
}

export default function FileUploadBox({ setFiles:setFilesProps, files: filesProps}: FileUploadBoxProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
    setFilesProps((prev) => [...prev, ...Array.from(newFiles)])
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilesProps((prev) => prev.filter((_, i) => i !== index))
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };
  
  useEffect(() => {
    setFiles(filesProps);
  }, [filesProps]);

  return (
    <div
      className={`border-2 border-dashed p-6 rounded-lg cursor-pointer transition-all ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="text-center text-gray-500">
        <UploadCloud className="mx-auto mb-2" size={32} />
        <p className="text-sm">
          Drag and drop your files here, or <span className="text-blue-600 underline">click to upload</span>.
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-2 border rounded"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL, "_blank");
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
