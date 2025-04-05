import { Button } from '@/components/ui/button';
import { badgeVariants } from '@/components/ui/badge';
import { RiGithubLine, RiGithubFill } from '@remixicon/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start min-h-[calc(100vh-3.5rem)] w-full px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col items-start justify-start gap-3 md:gap-4 w-full max-w-3xl">
        <Link
          href="https://github.com/Leander-Pornea"
          className={cn(
            badgeVariants({ variant: 'outline' }),
            'duration-300 transition-all hover:underline'
          )}
        >
          <span>I&#39;m on Github</span>
          <RiGithubLine className="ml-1" />
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">I try stuff</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Building and refining components while tracking personal development in frontend skills. A
          hands-on approach to learning and improving through practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <Button variant="default" asChild className="w-full sm:w-auto">
            <Link href="/forms">start browsing</Link>
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link
              href="https://github.com/Leander-Pornea/blu"
              className="flex items-center justify-center gap-1"
            >
              <RiGithubFill />
              <span>view on github</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
