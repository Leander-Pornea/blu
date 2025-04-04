import { LoginForm } from './login';
import { Separator } from '@/components/ui/separator';
import { SignUpForm } from './signup';
export default function FormsPage() {
  return (
    <div className="flex flex-col items-start justify-start min-h-[calc(100vh-3.5rem)] w-full px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col items-start justify-start gap-3 md:gap-4 w-full max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter">React hook form</h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          uses zod for validation and react hook form for the form.
        </p>
        <Separator className="my-4" />
        <div className="flex flex-row items-start justify-start gap-3 md:gap-4 w-full max-w-3xl">
          <LoginForm />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
