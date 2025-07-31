export default function CampaignLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <section>
      <h1>{title}</h1>
      <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 sm:gap-2">
        {children}
      </div>
    </section>
  );
}
