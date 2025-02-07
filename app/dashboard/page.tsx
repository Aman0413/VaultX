'use client'

import { Button } from '@/components/ui/button';
import React, { useEffect, useTransition } from 'react'
import { PlusCircle, } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/schemas';
import { useSession } from 'next-auth/react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { savepassword } from '@/actions/user';
import toast from 'react-hot-toast';
import PasswordGrid from '@/components/PasswordGrid';


export default function Dashboard() {
    const [isPending, startTransition] = useTransition()

    const session = useSession();

    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            userId: "",
            siteName: "",
            siteURL: "",
            username: "",
            password: "",
        }
    })

    useEffect(() => {
        // put email to userId so in backend it fetch userid
        if (session.data?.user?.email) {
            form.setValue('userId', session.data.user.email);
        }
    }, [session.data, form]);

    

    const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
        // put email to userId so in backend it fetch userid
        const userEmail = session.data?.user?.email || ''
        form.setValue('userId', userEmail);
        startTransition(() => {
            savepassword(values).then((data) => {
                form.reset();
                if (!data?.success) {
                    toast.error(data.message)
                }
                if (data.success) {
                    toast.success(data.message)
                }
            })
        });

    }

    return (
        <div className='container mx-auto p-5'>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Password
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Password</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-4 py-4">
                                    <FormField
                                        control={form.control}
                                        name='siteName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="siteName" type="text" placeholder="e.g., Gmail Account" />
                                                </FormControl>
                                            </FormItem>
                                        )}

                                    />
                                    <FormField
                                        control={form.control}
                                        name='username'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username/Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="username" type="text" placeholder="john.doe@example.com" />
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
                                                    <Input {...field} id="password" type="password" placeholder="*******" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='siteURL'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} id="siteURL" type="text" placeholder="https://example.com" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit' className="w-full" disabled={isPending}>
                                    Save Password
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>


            </div>

            <PasswordGrid />
        </div>
    )
}
