'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ReactElement, ReactNode, useRef } from "react";
import { Form } from "../ui/form";
import { UseFormReturn } from "react-hook-form";

type PopOutDialogProps = {
  triggerComponent: ReactElement;
  title: string;
  children: ReactNode;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void | Promise<void>;
};

export default function PopOutDialog({
  triggerComponent,
  title,
  children,
  form,
  onSubmit,
}: PopOutDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      closeRef.current?.click();
    } catch (err) {
      console.error("Submission error:", err);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {children}
            <DialogClose asChild>
              <button type="button" ref={closeRef} className="hidden" />
            </DialogClose>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button variant="secondary" type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

    </Dialog>
  );
}
