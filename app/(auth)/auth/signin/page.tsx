'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { LoginSchema, } from '@/schemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { login } from '@/actions/auth';
import Link from 'next/link';
import { useTransition } from 'react';
import toast from 'react-hot-toast';


export default function Signin() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then((data) => {
                form.reset();
                if (!data?.success) {
                    toast.error(data?.message)
                }
            })
        });
    }
    return (
        <section className=' w-screen h-screen flex justify-center items-center'>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
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
                                    <Link href={'/auth/signup'}>
                                        <p className='text-xs text-gray-500 cursor-pointer hover:text-black'>Does not have an account?</p>
                                    </Link>
                                </div>
                            </div>
                            <Button type="submit" className="w-full my-5" disabled={isPending}>
                                Login
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section >
    )
}
