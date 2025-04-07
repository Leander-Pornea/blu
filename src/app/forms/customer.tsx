'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

// UI Components
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
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';

// Icons
import {
  RiSaveLine,
  RiUploadLine,
  RiMapPinLine,
  RiShoppingBasketLine,
  RiBankCard2Line,
  RiFileCopy2Line,
} from '@remixicon/react';

// =============================================
// Form Schema Definition
// =============================================
const formSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  customerName: z.string().min(1, { message: 'Customer name is required' }),
  status: z.boolean().default(true).optional(),
  customerGroup: z.string().optional(),
  customerType: z.string().min(1, { message: 'Please select a customer type' }),
  // Address Information
  billingAddress: z.string().min(1, { message: 'Billing address is required' }),
  shippingAddress: z.string().min(1, { message: 'Shipping address is required' }),
  officePhone: z.string().min(1, { message: 'Office phone is required' }),
  warehousePhone: z.string().min(1, { message: 'Warehouse phone is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  website: z.string().url({ message: 'Invalid website URL' }).optional(),
  mapLocation: z
    .string()
    .optional()
    .refine(
      val =>
        !val ||
        val.includes('google.com/maps') ||
        val.includes('maps.google.com') ||
        val.includes('maps.app.goo.gl'),
      {
        message: 'Please enter a valid Google Maps URL',
      }
    ),

  // Sales Information
  salesman: z.string().min(1, { message: 'Please select a salesman' }),
  priceType: z.string().min(1, { message: 'Please select a price type' }),
  vatType: z.string().min(1, { message: 'Please select a VAT type' }),
  tinNo: z.string().min(1, { message: 'Please enter a TIN number' }),
  businessEntity: z.string().min(1, { message: 'Please select a business entity type' }),
  deductEWT: z.boolean().default(false).optional(),
  // Payment Information
  creditLimit: z.number().min(1, { message: 'Credit limit must be a positive number' }),
  creditTerms: z.string().min(1, { message: 'Please select a credit term' }),
  bankName: z.string().min(1, { message: 'Please enter a bank name' }),
  bankAccountNo: z.string().min(1, { message: 'Please enter a bank account number' }),
  bankAccountName: z.string().min(1, { message: 'Please enter a bank account name' }),
});

// =============================================
// Helper Components
// =============================================

// Google Maps Icon Component
function GoogleMapsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#48b564"
        d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
      ></path>
      <path
        fill="#fcc60e"
        d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
      ></path>
      <path
        fill="#2c85eb"
        d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
      ></path>
      <path
        fill="#ed5748"
        d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
      ></path>
      <path
        fill="#5695f6"
        d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
      ></path>
    </svg>
  );
}

// Map Location Button Component
function MapLocationButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <Button
      variant="outline"
      type="button"
      size="sm"
      className={`absolute right-1 top-1 h-7 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      Open in
      <span className="font-bold">
        <GoogleMapsIcon />
      </span>
      Maps
    </Button>
  );
}

// =============================================
// Form Section Components
// =============================================

// Basic Information Section
function BasicInformationSection({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
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
      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
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
  );
}

// Address Information Tab Content
function AddressInformationTab({
  form,
  copyBillingToShipping,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  copyBillingToShipping: () => void;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold tracking-tight">Address Information</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Edit information regarding customer address and contact details
      </p>
      <div className="flex flex-col gap-4 flex-grow">
        {/* Billing Address */}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <FormField
            control={form.control}
            name="billingAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Billing address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Enter billing address"
                      className={`resize-none h-24 pr-16 ${
                        form.formState.errors.billingAddress
                          ? 'border-red-500 focus-visible:ring-red-500'
                          : ''
                      }`}
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      id={field.name}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-2 right-2 text-xs text-muted-foreground"
                      onClick={copyBillingToShipping}
                    >
                      <RiFileCopy2Line className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* Shipping Address */}
          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Shipping address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter shipping address"
                    className="resize-none h-24"
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
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Office Phone */}
          <FormField
            control={form.control}
            name="officePhone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Office Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter office phone number"
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
          {/* Warehouse Phone */}
          <FormField
            control={form.control}
            name="warehousePhone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Warehouse Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter warehouse phone number"
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
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
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
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter website URL"
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
        <div className="flex flex-col gap-4 items-start">
          {/* Map Location */}
          <FormField
            control={form.control}
            name="mapLocation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Map Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter Google Maps URL"
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="pr-40"
                    />
                    {field.value ? (
                      <Link href={field.value as string} target="_blank">
                        <MapLocationButton />
                      </Link>
                    ) : (
                      <MapLocationButton disabled={true} />
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

// Sales Information Tab Content
function SalesInformationTab({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold tracking-tight">Sales Information</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Edit information regarding customer sales details
      </p>
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Salesman */}
          <FormField
            control={form.control}
            name="salesman"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Salesman</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormItem>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a salesman" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Salesman 1</SelectItem>
                        <SelectItem value="2">Salesman 2</SelectItem>
                        <SelectItem value="3">Salesman 3</SelectItem>
                      </SelectContent>
                    </FormItem>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* Price Type */}
          <FormField
            control={form.control}
            name="priceType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormItem>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a price type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Standard Price</SelectItem>
                        <SelectItem value="2">Special Price</SelectItem>
                        <SelectItem value="3">Wholesale Price</SelectItem>
                      </SelectContent>
                    </FormItem>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* VAT Type */}
          <FormField
            control={form.control}
            name="vatType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>VAT Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormItem>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a VAT type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Inclusive</SelectItem>
                        <SelectItem value="2">Exclusive</SelectItem>
                        <SelectItem value="3">Zero Rated</SelectItem>
                      </SelectContent>
                    </FormItem>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* TIN Number */}
          <FormField
            control={form.control}
            name="tinNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>TIN Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter TIN number"
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
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Business Entity */}
          <FormField
            control={form.control}
            name="businessEntity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Business Entity</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormItem>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a business entity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Corporation</SelectItem>
                        <SelectItem value="2">Partnership</SelectItem>
                        <SelectItem value="3">Sole Proprietorship</SelectItem>
                      </SelectContent>
                    </FormItem>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        {/* Deduct EWT */}
        <FormField
          control={form.control}
          name="deductEWT"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-row items-start border p-4 rounded-md w-full">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none ml-3">
                <FormLabel>Deduct EWT</FormLabel>
                <FormDescription>
                  Enable this option to deduct Expanded Withholding Tax
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

// Payment Information Tab Content
function PaymentInformationTab({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold tracking-tight">Payment Information</h2>
      <p className="text-muted-foreground text-sm mb-4">
        Edit information regarding customer payment details
      </p>
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Credit Limit */}
          <FormField
            control={form.control}
            name="creditLimit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Credit Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter credit limit"
                    value={field.value || ''}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* Credit Terms */}
          <FormField
            control={form.control}
            name="creditTerms"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Credit Terms</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormItem>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a credit term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Net 15</SelectItem>
                        <SelectItem value="2">Net 30</SelectItem>
                        <SelectItem value="3">Net 45</SelectItem>
                        <SelectItem value="4">Net 60</SelectItem>
                      </SelectContent>
                    </FormItem>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* Bank Name */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter bank name"
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
          {/* Bank Account Number */}
          <FormField
            control={form.control}
            name="bankAccountNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank Account Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter bank account number"
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
        <div className="flex flex-col gap-4 items-start">
          {/* Bank Account Name */}
          <FormField
            control={form.control}
            name="bankAccountName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank Account Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter bank account name"
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
      </div>
    </div>
  );
}

// =============================================
// Main Component
// =============================================
export function CustomerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 'C' + Math.floor(Math.random() * 9000 + 1000),
      customerName: '',
      status: false,
      creditLimit: 0,
      creditTerms: '',
      bankName: '',
      bankAccountNo: '',
      bankAccountName: '',
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
    let totalWeight = 0;

    // Define required fields and their weights
    const requiredFields = [
      // Basic Information
      { field: 'id' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'customerName' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'customerType' as keyof z.infer<typeof formSchema>, weight: 10 },

      // Address Information
      { field: 'billingAddress' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'shippingAddress' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'officePhone' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'warehousePhone' as keyof z.infer<typeof formSchema>, weight: 10 },
      { field: 'email' as keyof z.infer<typeof formSchema>, weight: 10 },

      // Sales Information
      { field: 'salesman' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'priceType' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'vatType' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'tinNo' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'businessEntity' as keyof z.infer<typeof formSchema>, weight: 5 },

      // Payment Information
      { field: 'creditLimit' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'creditTerms' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'bankName' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'bankAccountNo' as keyof z.infer<typeof formSchema>, weight: 5 },
      { field: 'bankAccountName' as keyof z.infer<typeof formSchema>, weight: 5 },
    ];

    // Calculate total weight and progress
    requiredFields.forEach(({ field, weight }) => {
      totalWeight += weight;
      if (values[field]) progress += weight;
    });

    // Calculate percentage and ensure it doesn't exceed 100%
    const percentage = Math.min(Math.round((progress / totalWeight) * 100), 100);
    setFormProgress(percentage);
  }, [form, watchedValues]);

  // Copy billing address to shipping address
  const copyBillingToShipping = () => {
    const billingAddress = form.getValues('billingAddress');
    form.setValue('shippingAddress', billingAddress, { shouldDirty: true, shouldValidate: true });

    toast.success('Address copied', {
      icon: <RiFileCopy2Line className="h-4 w-4" />,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log('Form submitted with values:', JSON.stringify(values, null, 2));

    toast.success(
      <div className="flex flex-col gap-2 max-w-xs">
        <div className="font-semibold">Form submitted successfully</div>
        <pre
          className="border shadow-md p-2 rounded-md overflow-auto max-h-40 whitespace-pre-wrap break-words"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>,
      {
        icon: null,
        duration: 5000, // Show for 5 seconds
      }
    );
  }

  return (
    <Card className="w-full flex flex-col h-full">
      <CardHeader className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <CardTitle className="text-xl">Customer Form</CardTitle>
          <CardDescription>Add a new customer</CardDescription>
        </div>
        <div className="flex flex-row gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <RiSaveLine className="w-4 h-4 mr-1" />
            Save draft
          </Button>
          <Button
            variant="ghost"
            className="flex-1 md:flex-none hover:underline underline-offset-2"
          >
            <RiUploadLine className="w-4 h-4 mr-1" />
            Load draft
          </Button>
        </div>
      </CardHeader>

      {/* Form Progress */}
      <div className="px-6">
        <div className="p-6 border rounded-md shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Form Completion</span>
            <span className="text-sm text-muted-foreground">{formProgress}%</span>
          </div>
          <Progress value={formProgress} className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Progress is calculated based on completed <span className="underline">required</span>{' '}
            fields.
          </p>
        </div>
      </div>

      <CardContent className="flex flex-col flex-grow p-6">
        <Form {...form}>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log('Form submit event triggered');
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-6 flex flex-col h-full"
          >
            {/* Basic Information Section */}
            <BasicInformationSection form={form} />

            <div className="py-2">
              <Separator orientation="horizontal" className="my-2" />
            </div>

            {/* Tabs Section */}
            <div className="flex flex-col md:flex-row gap-4 w-full items-start">
              <Tabs
                defaultValue="tab-1"
                orientation="vertical"
                className="w-full flex-col md:flex-row"
              >
                <TabsList className="flex-row md:flex-col gap-1 h-auto md:h-full shadow-xs dark:border-border border border-zinc-300 shadow-zinc-950/10">
                  {/* Address Tab */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-1"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-300 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-zinc-900 data-[state=inactive]:dark:to-zinc-950 data-[state=inactive]:dark:border-zinc-800 data-[state=inactive]:dark:shadow-zinc-950/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:from-slate-200 data-[state=inactive]:hover:to-slate-300 data-[state=inactive]:dark:hover:from-muted/70 data-[state=inactive]:dark:hover:to-muted/90"
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
                  {/* Sales Information Tab */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-2"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-300 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-zinc-900 data-[state=inactive]:dark:to-zinc-950 data-[state=inactive]:dark:border-zinc-800 data-[state=inactive]:dark:shadow-zinc-950/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:from-slate-200 data-[state=inactive]:hover:to-slate-300 data-[state=inactive]:dark:hover:from-muted/70 data-[state=inactive]:dark:hover:to-muted/90"
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
                  {/* Payment Information Tab */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <TabsTrigger
                            value="tab-3"
                            className="p-3 from-primary/85 to-primary text-primary-foreground inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:from-primary/75 dark:bg-linear-to-t border border-zinc-300 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50 data-[state=active]:brightness-100 data-[state=inactive]:bg-linear-to-t data-[state=inactive]:to-background data-[state=inactive]:from-slate-200 data-[state=inactive]:dark:from-zinc-900 data-[state=inactive]:dark:to-zinc-950 data-[state=inactive]:dark:border-zinc-800 data-[state=inactive]:dark:shadow-zinc-950/20 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:from-slate-200 data-[state=inactive]:hover:to-slate-300 data-[state=inactive]:dark:hover:from-muted/70 data-[state=inactive]:dark:hover:to-muted/90"
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
                </TabsList>
                {/* Tabs Content */}
                <div className="grow text-start mt-4 md:mt-0">
                  <TabsContent value="tab-1" className="px-0 md:px-4 pb-4">
                    <AddressInformationTab
                      form={form}
                      copyBillingToShipping={copyBillingToShipping}
                    />
                  </TabsContent>
                  <TabsContent value="tab-2" className="px-0 md:px-4 pb-4">
                    <SalesInformationTab form={form} />
                  </TabsContent>
                  <TabsContent value="tab-3" className="px-0 md:px-4 pb-4">
                    <PaymentInformationTab form={form} />
                  </TabsContent>
                  <TabsContent value="tab-4" className="px-0 md:px-4 pb-4">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold tracking-tight">History</h2>
                      <p className="text-muted-foreground text-sm mb-4">
                        Edit information regarding customer history
                      </p>
                      <div className="flex-grow">
                        <p className="text-muted-foreground text-xs">Content for Tab 4</p>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="flex flex-col justify-end items-end gap-3 mt-auto pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto"
                onClick={() => {
                  console.log('Submit button clicked');
                  // Log form values before submission
                  console.log('Current form values:', form.getValues());
                }}
              >
                Add customer
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
