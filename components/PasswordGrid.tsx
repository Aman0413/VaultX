'use client'

import React, { useEffect, useState } from 'react'
import PasswordInfoCard, { PasswordInfoCardProps } from './PasswordCard'
import { useSession } from 'next-auth/react';
import { allCredentails } from '@/actions/user';

export default function PasswordGrid() {

    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState<PasswordInfoCardProps[]>([]);
    const email = session?.data?.user?.email || ''

    useEffect(() => {
        setLoading(true)
        allCredentails(email).then((data) => {
            setLoading(false)
            setCredentials(data.data)
        })
    }, [email])

    useEffect(() => {
    }, [])



    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-10 p-5'>

            {
                loading ? <p className=''>Loading.....</p> : <>
                    {
                        credentials.map((item) => {
                            return <PasswordInfoCard
                                key={item.id}
                                id={item.id}
                                siteName={item.siteName}
                                siteURL={item.siteURL}
                                username={item.username}
                                userId={item.userId}
                                password={item.password}
                            />
                        })
                    }
                </>
            }


        </div>
    )
}
