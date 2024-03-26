import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWindowSize } from "@uidotdev/usehooks";

interface AlertDialogDemoProps {
  children: React.ReactNode;
  id: string;
  component: React.ComponentType<{
    open: boolean;
    setIsOpen: (open: boolean) => void;
    id: string;
    className?: string;
  }>;
}

export function AlertDialogDrawer({
  children,
  component: Component,
  id,
}: AlertDialogDemoProps) {
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowSize();
  const isDesktop = (width ?? 0) >= 768;

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <Component open={open} setIsOpen={setOpen} id={id} />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Component open={open} setIsOpen={setOpen} id={id} className="px-4" />
      </DrawerContent>
    </Drawer>
  );
}
