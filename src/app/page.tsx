import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme/theme-toggle';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border rounded-lg p-4 shadow-lg gap-4">
        <h1 className="text-4xl font-semibold">Hello, world</h1>
        <Button>Click me</Button>
        <Button variant="outline">Click me</Button>
        <Button variant="ghost">Click me</Button>
        <Button variant="link">Click me</Button>
        <Button variant="secondary">Click me</Button>
        <Button variant="destructive">Click me</Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
