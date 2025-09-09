import { getMyPostedjobs } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from './jobCard';

function MyPostedJobs() {
    const { isLoaded, user } = useUser();
    const {
        loading: loadingJobs,
        data: myJobs,
        fn: fnMyJobs,
    } = useFetch(getMyPostedjobs, {
        recruiter_id: user.id
    });
    useEffect(() => {
        if (isLoaded) fnMyJobs();
    }, [isLoaded])
    if (!isLoaded || loadingJobs) return <BarLoader width={"100%"} color='#36d7b7' />
    return (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myJobs?.length ? (
                myJobs.map((job) => {
                    return (
                            <JobCard
                                key={job.id}
                                isMyJob
                                job={job}
                                onJobAction={fnMyJobs}
                            />
                    );
                })
            ) : (
                <div>No Jobs Found</div>
            )}
        </div>
    )
}

export default MyPostedJobs
