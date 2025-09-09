import { getApplications } from '@/api/apiApplication';
import useFetch from '@/hooks/useFetch'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import ApplicationCard from './ApplicationCard';
import { useUser } from '@clerk/clerk-react';

function MyApplications() {
    const { isLoaded, user } = useUser();
    const {
        loading: loadingApplications,
        data: applications,
        error: errorApplications,
        fn: fnApplications,
    } = useFetch(getApplications,{
        user_id: user.id
    });
    useEffect(() => {
        if (isLoaded) fnApplications();
    }, [isLoaded])
    if (!isLoaded || loadingApplications) return <BarLoader width={"100%"} color='#36d7b7' />

    return (
        <div className='flex flex-col gap-2'>
            {
              applications?.map((application)=>{
                return <ApplicationCard key={application.id} application={application} isCandidate/>
              })
            }
        </div>
    )
}

export default MyApplications
