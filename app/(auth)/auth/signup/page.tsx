'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { SignupSchema } from '@/schemas';
import Link from 'next/link';
import { signup } from '@/actions/auth';
import toast from 'react-hot-toast';
import { useTransition } from 'react';




export default function Signup() {

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {

        startTransition(() => {
            signup(values).then((data) => {
                form.reset();
                if (data.success) {
                    toast.success(data.message)
                }
                if (!data.success) {
                    toast.error(data.message)
                }
            })
        });



    }

    return (
        <section className=' w-screen h-screen flex justify-center items-center'>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Signup</CardTitle>
                    <CardDescription>Enter your details to signup to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} id="name" type="text" placeholder="Your Name" />
                                            </FormControl>
                                        </FormItem>
                                    )}

                                />
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} id="email" type="email" placeholder="m@example.com" />
                                            </FormControl>
                                        </FormItem>
                                    )}

                                />
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} id="password" type="password" placeholder="******" />
                                            </FormControl>
                                        </FormItem>
                                    )}

                                />

                                <div>
                                    <Link href={'/auth/signin'}>
                                        <p className='text-xs text-gray-500 cursor-pointer hover:text-black'>Already have an account?</p>
                                    </Link>
                                </div>
                            </div>
                            <Button type="submit" className="w-full my-5" disabled={isPending}>
                                Signup
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section >
    )
}
