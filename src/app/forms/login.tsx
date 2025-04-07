'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { toast } from 'sonner';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import Avatar from 'boring-avatars';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // 🚀

    toast.success('Form submitted successfully', {
      icon: null,
      description: (
        <div className="-mx-2">
          <pre className="mt-2 p-4 overflow-x-auto">
            <code className="text-sm whitespace-pre-wrap break-all font-mono">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        </div>
      ),
    });
  }

  return (
    <Card className="w-full sm:w-auto md:w-sm flex flex-col h-full">
      <CardHeader>
        <Avatar
          name="Blu"
          variant="sunset"
          colors={[
            'oklch(0.65 0.25 250)',
            'oklch(0.95 0.02 240)',
            'oklch(0.95 0.02 240)',
            'oklch(0.65 0.25 250)',
            'oklch(0.85 0.25 240)',
          ]}
          size={32}
        />
        <CardTitle className="text-xl">Sign in to blu</CardTitle>
        <CardDescription>Sign in to blu to continue.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col h-full">
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex flex-row gap-2 w-full">
                <Link
                  href="/forms/"
                  className="flex-1"
                  onClick={() => {
                    toast.success('Google login clicked', {
                      icon: null,
                    });
                  }}
                >
                  <Button type="button" variant="outline" className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="0.98em"
                      height="1em"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285f4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34a853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#fbbc05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                      ></path>
                      <path
                        fill="#eb4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>{' '}
                    Google
                  </Button>
                </Link>
                <Link
                  href="/forms/"
                  className="flex-1"
                  onClick={() => {
                    toast.success('Microsoft login clicked', {
                      icon: null,
                    });
                  }}
                >
                  <Button type="button" variant="outline" className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                      <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                      <path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path>
                      <path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path>
                    </svg>{' '}
                    Microsoft
                  </Button>
                </Link>
              </div>
              <Separator orientation="horizontal" className="my-2" />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col justify-end items-center gap-2 mt-auto">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <Link
                href="/forms/"
                className="text-sm text-muted-foreground hover:underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
