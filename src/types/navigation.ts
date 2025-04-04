import type { LinkProps } from 'next/link';

interface User {
  name: string;
  email: string;
  avatar: React.ReactNode;
}

interface NavItem {
  name: string;
  url: LinkProps['href'];
  icon: React.ElementType;
}

interface NavData {
  user: User;
  navMain: NavItem[];
}

export type { User, NavItem, NavData };
