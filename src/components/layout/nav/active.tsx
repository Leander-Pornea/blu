'use client';

import { usePathname } from 'next/navigation';
import { navData } from '@/data/nav-data';
import { ThemeToggle } from '../theme/theme-toggle';

export function ActiveNavItem() {
  const pathname = usePathname();

  // Find the active navigation item
  const activeItem = navData.navMain.find(item => item.url === pathname);

  if (!activeItem) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-sm font-medium">{activeItem.name}</span>
      <ThemeToggle />
    </div>
  );
}
