"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import Loader from "../loader";

interface DrawerDialogLoaderProps {
  open: boolean;
  setOpen?: (open: boolean) => void;
}

export function DrawerDialogLoader({ open, setOpen }: DrawerDialogLoaderProps) {
  const { width } = useWindowSize();
  const isDesktop = (width ?? 0) >= 768;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="m-0 bg-transparent p-0 shadow-none backdrop-blur-lg">
          <div className="flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full">
              <Loader />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-h-50vh m-0 border-none">
        <div className="flex  items-center justify-center">
          <div className="h-[300px] w-[300px] rounded-full">
            <Loader />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
