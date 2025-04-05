import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row scrollbar-hide overflow-auto">
      <div className="w-full flex-none">
        <SideNav>{children}</SideNav>
      </div>
    </div>
  );
}