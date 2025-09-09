import MyApplications from '@/components/MyApplications';
import MyPostedJobs from '@/components/MyPostedJobs';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

export default function MyJobs() {
  const {user, isLoaded} = useUser();
  if(!isLoaded) return <BarLoader width={"100%"} color='#36d7b7' />
  return (
    <div>
      <h1 className='gradient-title text-5xl sm:7xl font-extrabold text-center pb-8'>
        {user?.unsafeMetadata?.role === "candidate" ? "My Applications" : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? <MyApplications /> : <MyPostedJobs />}

    </div>
  )
}
