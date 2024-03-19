// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Plus, Trash } from "lucide-react";
// import { useUploadThing } from "@/lib/uploadthing";

// interface ImageUploadProps {
//   value: string[];
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onChange,
//   onRemove,
//   value,
// }) => {
//   const [uploadedImage, setUploadedImage] = useState<File | null>(null);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles: File[]) => {
//       setUploadedImage(acceptedFiles[0]);
//     },
//     accept: {
//       "image/*": [
//         ".png",
//         ".jpg",
//         ".jpeg",
//         ".bmp",
//         ".gif",
//         ".tif",
//         ".tiff",
//         ".webp",
//       ],
//     },
//     multiple: false,
//   });

//   const { startUpload,isUploading } = useUploadThing("uploadChatImage", {
//     async onClientUploadComplete(res) {
//       if (res) {
//         onChange(res[0].url);
//       }
//     },
//     onUploadError(res) {
//       toast.error("Upload failed");
//     },
//   });

//   const handleUpload = () => {
//     if (uploadedImage) {
//       startUpload([uploadedImage]);
//     } else {
//       toast.error("Please select an image to upload.");
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {value.map((url) => (
//           <div key={url} className="relative h-[200px] w-[200px]">
//             <div className="absolute right-0 top-0 z-10">
//               <Button
//                 type="button"
//                 onClick={() => onRemove(url)}
//                 size="sm"
//                 className="bg-red-1 text-white"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image
//               src={url}
//               alt="collection"
//               className="rounded-lg object-cover"
//               fill
//             />
//           </div>
//         ))}
//       </div>

//       <div {...getRootProps()} className="cursor-pointer">
//         <input {...getInputProps()} />
//         <Button
//           type="button"
//           onClick={handleUpload}
//           className="bg-grey-1 text-white"
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Upload Image
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;

// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Plus, Trash } from "lucide-react";
// import { useUploadThing } from "@/lib/uploadthing";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// interface ImageUploadProps {
//   value: string[];
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onChange,
//   onRemove,
//   value,
// }) => {
//   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles: File[]) => {
//       setUploadedImage(acceptedFiles[0]);
//     },
//     accept: {
//       "image/*": [
//         ".png",
//         ".jpg",
//         ".jpeg",
//         ".bmp",
//         ".gif",
//         ".tif",
//         ".tiff",
//         ".webp",
//       ],
//     },
//     multiple: false,
//   });

//   const { startUpload, isUploading } = useUploadThing("uploadChatImage", {
//     async onClientUploadComplete(res) {
//       if (res) {
//         onChange(res[0].url);
//         setIsButtonDisabled(false);
//       }
//     },
//     onUploadError(res) {
//       toast.error("Upload failed");
//       setIsButtonDisabled(false);
//     },
//   });

// const handleUpload = () => {
//   if (uploadedImage) {
//     setIsButtonDisabled(true);

//     const reader = new FileReader();
//     reader.onload = () => {
//       const image = new Image(); // Create a new instance of Image without arguments
//       image.onload = () => {
//         const { width, height } = image;
//         const ratio = width / height;

//         if (ratio < 0.8 || ratio > 1.2) {
//           toast.error(
//             "Please select a square or near-square image (ratio between 0.8 and 1.2).",
//           );
//           setUploadedImage(null);
//           setIsButtonDisabled(false);
//         } else {
//           startUpload([uploadedImage]);
//         }
//       };
//       image.src = reader.result as string;
//     };
//     reader.readAsDataURL(uploadedImage);
//   } else {
//     toast.error("Please select an image to upload.");
//   }
// };

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {value.map((url) => (
//           <div key={url} className="relative h-[200px] w-[200px]">
//             <div className="absolute right-0 top-0 z-10">
//               <Button
//                 type="button"
//                 onClick={() => onRemove(url)}
//                 size="sm"
//                 className="bg-red-1 text-white"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image
//               src={url}
//               alt="collection"
//               className="rounded-lg object-cover"
//               fill
//             />
//           </div>
//         ))}
//       </div>

//       <div {...getRootProps()} className="cursor-pointer">
//         <input {...getInputProps()} />
//         <Button
//           type="button"
//           onClick={handleUpload}
//           className="bg-grey-1 text-white"
//           disabled={isButtonDisabled}
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Upload Image
//         </Button>
//       </div>

//       <AlertDialog open={isUploading}>
//         <AlertDialogContent className="bg-transparent backdrop-blur-md">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Uploading...</AlertDialogTitle>
//             <AlertDialogDescription>
//               Please wait while the image is being uploaded.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default ImageUpload;

"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/loader";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      console.log("this is the file involved", file);
      setIsButtonDisabled(true);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      console.log("this is the image.src", img.src);
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (aspectRatio < 0.8 || aspectRatio > 1.2) {
          toast.error("Image must be a square or near to a square.", {
            duration: 10000,
          });
          console.log("the image is not of good size");
        } else {
          console.log("The image is about to be uploaded");
          startUpload([file]); // Use the 'file' variable directly
        }
        setIsButtonDisabled(false);
      };
    },
    accept: {
      "image/*": [
        ".png",
        ".jpg",
        ".jpeg",
        ".bmp",
        ".gif",
        ".tif",
        ".tiff",
        ".webp",
      ],
    },
    multiple: false,
  });

  const { startUpload, isUploading } = useUploadThing("uploadChatImage", {
    onUploadBegin(fileName) {
      setIsButtonDisabled(false);
      console.log("you are about to upload the image");
    },
    async onClientUploadComplete(res) {
      if (res) {
        onChange(res[0].url);
        setIsButtonDisabled(false);
      }
    },
    onUploadError(res) {
      toast.error("Upload failed");
      setIsButtonDisabled(false);
    },
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px]">
            <div className="absolute right-0 top-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <NextImage
              src={url}
              alt="collection"
              className="rounded-lg object-cover"
              height={200}
              width={200}
            />
          </div>
        ))}
      </div>

      <div className="cursor-pointer">
        <input {...getInputProps()} />
        <Button
          type="button"
          {...getRootProps()}
          className="bg-grey-1 text-white"
          disabled={isButtonDisabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </div>

      <AlertDialog open={isUploading}>
        <AlertDialogContent className="bg-transparent ">
          <Loader />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageUpload;
