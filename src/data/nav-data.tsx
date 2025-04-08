import { NavData } from '@/types/navigation';
import { RiHomeLine, RiQuillPenAiLine } from '@remixicon/react';
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
      name: 'forms',
      url: '/forms',
      icon: RiQuillPenAiLine,
    },
  ],
};
