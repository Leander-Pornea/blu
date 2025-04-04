import { NavData } from '@/types/navigation';
import {
  RiHomeLine,
  RiTable2,
  RiQuillPenAiLine,
  RiSettings6Line,
} from '@remixicon/react';
import Avatar from 'boring-avatars';

export const navData: NavData = {
  user: {
    name: 'Leander Pornea',
    email: 'leander@example.com',
    avatar: <Avatar name="Leander Pornea" variant="beam" />,
  },
  navMain: [
    {
      name: 'home',
      url: '/',
      icon: RiHomeLine,
    },
    {
      name: 'tables',
      url: '/tables',
      icon: RiTable2,
    },
    {
      name: 'forms',
      url: '/forms',
      icon: RiQuillPenAiLine,
    },
    {
      name: 'settings',
      url: '/settings',
      icon: RiSettings6Line,
    },
  ],
};
