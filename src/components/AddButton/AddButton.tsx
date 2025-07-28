'use client'

import { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type AddButtonProps = {
  label: string,
  variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function AddButton({ label, variant = 'secondary', ...props }: AddButtonProps) {
  return (
    <Button variant={variant} {...props} size='sm'>
      <Plus /> 
      {label}
    </Button>
  )
}
