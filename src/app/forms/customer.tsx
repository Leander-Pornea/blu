'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  RiSaveLine,
  RiUploadLine,
  RiMapPinLine,
  RiShoppingBasketLine,
  RiHistoryLine,
  RiBankCard2Line,
} from '@remixicon/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  customerName: z.string().min(1, { message: 'Customer name is required' }),
  status: z.boolean().default(true).optional(),
  customerGroup: z.string().optional(),
  customerType: z.string({ required_error: 'Please select a customer type' }),
});

export function CustomerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      customerName: '',
      status: false,
    },
    mode: 'onChange',
  });

  // Track form progress
  const [formProgress, setFormProgress] = React.useState(0);

  // Watch form values for progress calculation
  const watchedValues = form.watch();

  // Update progress when form values change
  React.useEffect(() => {
    const values = form.getValues();
    let progress = 0;

    // Define required fields and their weights
    const requiredFields = [
      { field: 'id' as keyof z.infer<typeof formSchema>, weight: 33 },
      { field: 'customerName' as keyof z.infer<typeof formSchema>, weight: 33 },
      { field: 'customerType' as keyof z.infer<typeof formSchema>, weight: 34 },
    ];

    // Calculate progress based on filled required fields
    requiredFields.forEach(({ field, weight }) => {
      if (values[field]) progress += weight;
    });

    setFormProgress(progress);
  }, [form, watchedValues]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

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
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl">Customer Form</CardTitle>
          <CardDescription>Add a new customer</CardDescription>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="outline">
            <RiSaveLine className="w-4 h-4 mr-1" />
            Save draft
          </Button>
          <Button variant="ghost">
            <RiUploadLine className="w-4 h-4 mr-1" />
            Load draft
          </Button>
        </div>
      </CardHeader>

      {/* Form Progress */}
      <div className="p-6 border mx-6 rounded-md shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Form Progress</span>
          <span className="text-sm text-muted-foreground">{formProgress}%</span>
        </div>
        <Progress value={formProgress} className="h-2" />
      </div>

      <CardContent className="flex flex-col flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-6 w-full items-start">
                {/* ID */}
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer ID"
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
                {/* Customer Name */}
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer name"
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
              <div className="flex flex-row gap-6 w-full items-start">
                {/* Customer Group */}
                <FormField
                  control={form.control}
                  name="customerGroup"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Customer Group</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormItem>
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a customer group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Customer Group 1</SelectItem>
                              <SelectItem value="2">Customer Group 2</SelectItem>
                              <SelectItem value="3">Customer Group 3</SelectItem>
                            </SelectContent>
                          </FormItem>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* Customer Type */}
                <FormField
                  control={form.control}
                  name="customerType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Customer Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormItem>
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a customer type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">Customer Type 1</SelectItem>
                              <SelectItem value="2">Customer Type 2</SelectItem>
                              <SelectItem value="3">Customer Type 3</SelectItem>
                            </SelectContent>
                          </FormItem>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2 w-full items-center">
                {/* Active Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start border p-4 rounded-md w-full">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none ml-3">
                        <FormLabel>Active Status</FormLabel>
                        <FormDescription>
                          Enable this option to mark the customer as active in the system
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="py-2">
              <Separator orientation="horizontal" className="my-2" />
            </div>

            <div className="flex flex-row gap-4 w-full items-start">
              <Tabs defaultValue="tab-1" orientation="vertical" className="w-full flex-row">
                <TabsList className="gap-1 flex-col h-auto shadow-xs bg-linear-to-t to-background from-slate-200 dark:from-muted/50 dark:border-border border border-zinc-300 shadow-zinc-950/10">
                  {/* Address */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-1"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-muted/50 data-[state=inactive]:dark:border-border data-[state=inactive]:border-zinc-300 data-[state=inactive]:shadow-zinc-950/10 data-[state=inactive]:text-muted-foreground"
                          >
                            <RiMapPinLine size={24} aria-hidden="true" className="w-6 h-6" />
                          </TabsTrigger>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="px-2 py-1 text-xs">
                        Address
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* Sales Information */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-2"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-muted/50 data-[state=inactive]:dark:border-border data-[state=inactive]:border-zinc-300 data-[state=inactive]:shadow-zinc-950/10 data-[state=inactive]:text-muted-foreground"
                          >
                            <RiShoppingBasketLine
                              size={24}
                              aria-hidden="true"
                              className="w-6 h-6"
                            />
                          </TabsTrigger>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="px-2 py-1 text-xs">
                        Sales Information
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* Payment Information */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-3"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-muted/50 data-[state=inactive]:dark:border-border data-[state=inactive]:border-zinc-300 data-[state=inactive]:shadow-zinc-950/10 data-[state=inactive]:text-muted-foreground"
                          >
                            <RiBankCard2Line size={24} aria-hidden="true" className="w-6 h-6" />
                          </TabsTrigger>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="px-2 py-1 text-xs">
                        Payment Information
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* History */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-4"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-muted/50 data-[state=inactive]:dark:border-border data-[state=inactive]:border-zinc-300 data-[state=inactive]:shadow-zinc-950/10 data-[state=inactive]:text-muted-foreground"
                          >
                            <RiHistoryLine size={24} aria-hidden="true" className="w-6 h-6" />
                          </TabsTrigger>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="px-2 py-1 text-xs">
                        History
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsList>
                <div className="grow rounded-md border text-start">
                  <TabsContent value="tab-1" className="p-4">
                    <p className="text-muted-foreground text-xs">Content for Tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab-2" className="p-4">
                    <p className="text-muted-foreground text-xs">Content for Tab 2</p>
                  </TabsContent>
                  <TabsContent value="tab-3" className="p-4">
                    <p className="text-muted-foreground text-xs">Content for Tab 3</p>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="flex flex-col justify-end items-center gap-3 mt-auto pt-4">
              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              {/* Forgot Password Link */}
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
