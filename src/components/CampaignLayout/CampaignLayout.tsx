export default function CampaignLayout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <section>
      {title && <h1>{title}</h1>}
      <div className="grid grid-cols-[1fr_auto] py-4 sm:grid-cols-[auto-fit,minmax(300px,1fr)] gap-8">
        {children}
      </div>
    </section>
  );
}
