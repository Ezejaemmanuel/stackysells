// "use client";

// import { useState } from "react";
// import { Trash } from "lucide-react";

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
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// interface DeleteProps {
//   item: string;
//   id: string;
//   onDeleteSuccess?: () => void;
//   children: React.ReactNode;
// }

// const Delete: React.FC<DeleteProps> = ({
//   item,
//   id,
//   onDeleteSuccess,
//   children,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       const itemType = item === "product" ? "products" : "collections";
//       const res = await fetch(`/api/${itemType}/${id}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setLoading(false);
//         setOpen(false);
//         toast.success(`${item} deleted`);
//         onDeleteSuccess?.();
//       } else {
//         setLoading(false);
//         toast.error("Something went wrong! Please try again.");
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       toast.error("Something went wrong! Please try again.");
//     }
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <span
//           className="cursor-pointer text-sm text-red-500"
//           onClick={() => setOpen(true)}
//         >
//           {children}
//         </span>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="text-grey-1">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-red-1">
//             Are you absolutely sure?
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your{" "}
//             {item}.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             className="bg-red-1 text-white"
//             onClick={onDelete}
//             disabled={loading}
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default Delete;
