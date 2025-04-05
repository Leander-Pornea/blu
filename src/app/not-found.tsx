import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">
          sorry, this page doesn&apos;t exist.
        </p>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">go back omg</Link>
        </Button>
      </div>
    </div>
  );
}
