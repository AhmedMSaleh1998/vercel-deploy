"use client"

import { MyLogin } from '@/app/api/_actions/login'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/auth.schemas'
import { LoginDataType } from '@/types/login.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'

export default function Login() {

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema)

  })

  async function handleLogin(values: LoginDataType) {
    console.log(values);


    //MyLogin(values)

    signIn("credentials", { ...values, redirect: true, callbackUrl: "/" })

  }
  return <>
    <h1>Log in</h1>

    <div className="max-w-5xl mx-auto p-5 bg-amber-50">

      <form onSubmit={form.handleSubmit(handleLogin)}>


        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
              <Input
                type='password'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className='w-full my-3 cursor-pointer text-xl'>LOG IN NOW</Button>

      </form>

    </div>
  </>
}







































// "use client"
// import { Button } from '@/components/ui/button'
// import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { loginSchema } from '@/schemas/register'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useState } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { redirect, useRouter } from 'next/navigation'
// import { login } from '../../api/login'
// import { loginFormInputs } from '@/constants/login-inputs'
// import { LoginType } from '@/types/login.type';
// import { signIn } from 'next-auth/react'
// // import { toast } from 'sonner'

// export default function Login() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false);
//   const { handleSubmit, control } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginType) => {
//     setLoading(true)
//     //  const res = await login(data);
//     const res = await signIn("credentials", { ...data, redirect: false, callbackUrl: "/ " })
//     console.log(res)
//     if (res?.ok && !res?.error) {
//       toast.success("Welcome Back", { position: "top-center" });
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 1000);
//     }
//     else {
//       toast.error("Something wrong", { position: "top-center" });
//     }
//     setLoading(false);
//   };

//   return <>
//     <h1>login page</h1>
//     <form onSubmit={handleSubmit(onSubmit)} className='w-1/2 mx-auto'>

//       <FieldGroup>

//         {loginFormInputs.map(({ name, placeholder }) =>
//           <Controller
//             key={name}
//             name={name}
//             control={control}
//             render={({ fieldState, field }) =>
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={name}>{name}</FieldLabel>
//                 <Input
//                   id={name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder={placeholder}
//                   autoComplete="off"
//                   {...field}
//                 />

//                 <FieldError errors={[fieldState.error]} />
//               </Field>} />)}


//         <Button disabled={loading} className='disabled:opacity-50'>submit</Button>

//       </FieldGroup>

//     </form>
//   </>

// }
