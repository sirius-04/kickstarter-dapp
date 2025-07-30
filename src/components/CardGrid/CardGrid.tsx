import { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
  return (
    <div className="@container grid grid-cols-1 sm:grid-cols-2 gap-3 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      {children}
    </div>
  );
}