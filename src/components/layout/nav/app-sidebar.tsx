import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Avatar from 'boring-avatars';
import Link from 'next/link';
import { NavMain } from '@/components/layout/nav/nav-main';
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Avatar
                    name="Blu"
                    variant="sunset"
                    colors={[
                      'oklch(0.65 0.25 250)',
                      'oklch(0.95 0.02 240)',
                      'oklch(0.95 0.02 240)',
                      'oklch(0.65 0.25 250)',
                      'oklch(0.85 0.25 240)',
                    ]}
                    size={32}
                  />
                  <span className="text-md tracking-tight font-semibold text-foreground">
                    blu components
                  </span>
                  <span className="text-xs text-muted-foreground px-1 py-0.75 bg-accent rounded">
                    v0.0.1
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
