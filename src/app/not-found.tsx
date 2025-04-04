import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-row h-screen w-screen items-center justify-center gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">uhh...</h1>
        <Button size="lg" variant="outline">
          <Link href="/">let&apos;s go back</Link>
        </Button>
      </div>
    </div>
  );
}
