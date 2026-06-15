"use client"

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { registerFormInputs } from '@/constants/register-inputs'
import { registerSchema } from '@/schemas/auth.schemas'
import { Registertype } from '@/types/register.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { register } from '../../api/_actions/register'

export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { handleSubmit, control } = useForm<Registertype>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: Registertype) => {
    setLoading(true)
    try {
      const res = await register(data)
      if (res) {
        router.push("/login")
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("An error occurred during registration:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Register page</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
        <FieldGroup>
          {registerFormInputs.map(({ name, placeholder }) => (
            <Controller
              key={name}
              name={name as keyof Registertype}
              control={control}
              render={({ fieldState, field }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>{name}</FieldLabel>
                  <Input
                    {...field}
                    id={name}
                    aria-invalid={fieldState.invalid}
                    placeholder={placeholder}
                    autoComplete="off"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={loading}
            className="w-full disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </FieldGroup>
      </form>
    </>
  )
}