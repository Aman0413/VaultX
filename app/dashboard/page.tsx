import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import React from 'react'

export default async function Dashboard() {

    const session = await auth();
    return (
        <div>Dashboard Page

            <p>
                {JSON.stringify(session)}
            </p>

            <form action={async () => {
                'use server'
                await signOut()
            }}>

                <Button type='submit'>
                    Logout
                </Button>
            </form>
        </div>
    )
}
