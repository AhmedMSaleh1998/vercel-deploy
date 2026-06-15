"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CreateCashOrder, CreateVisaOrder, shippingAddressType } from './payment'
import { cartContext } from '../_context/CartContext'
import { toast } from 'sonner'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';

type PaymentFormValues = {
  details: string;
  phone: string;
  city: string;
  type: string;
};

export default function PaymentPage() {
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash"
    },
  })

  const { cartId, setNumOfCartItems, setCartData } = useContext(cartContext)

  async function handlePayment(value: PaymentFormValues) {

    const userData: shippingAddressType = {
      shippingAddress: {
        city: value.city,
        details: value.details,
        phone: value.phone,
      }
    }

    if (value.type == "cash") {
      const res = await CreateCashOrder(cartId, userData)

      if (res.status === "success") {
        setNumOfCartItems(0)
        setCartData(null)

        toast.success("Order Created", { position: 'top-center' })
      } else {
        toast.error("Error")
      }
    } else {
      const res = await CreateVisaOrder(cartId, userData)
      console.log(res);
      window.open(res.session.url)
    }
  }

  return <>
    <h1 className='text-center text-5xl my-5'>Payment</h1>
    <div className='container max-w-5xl mx-auto'></div>
    <form onSubmit={form.handleSubmit(handlePayment)} className='w-3/4 mx-auto'>
      <Controller
        name="details"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Details</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Details"
              autoComplete="off" />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Phone"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>City</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your City"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className='text-3xl'>Payment Method</div>

      <Controller
        name="type"
        control={form.control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem className='my-2' value="cash" id="cash" />
              <Label htmlFor="cash">Cash</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem className='my-2' value="visa" id="visa" />
              <Label htmlFor="visa">Visa</Label>
            </div>
          </RadioGroup>
        )}
      />

      <Button className='text-center w-full bg-blue-600'>Pay Now</Button>

    </form>
  </>
}