'use client';

import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroup,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navData } from '@/data/nav-data';
import { cn } from '@/lib/utils';

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>pages</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navData.navMain.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton tooltip={item.name} isActive={isActive}>
                  <Link href={item.url} className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        'mr-1.5 size-5 text-muted-foreground',
                        isActive && 'text-primary'
                      )}
                    />
                    <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
