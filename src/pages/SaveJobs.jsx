import { getSavedjobs } from '@/api/apiJobs'
import JobCard from '@/components/jobCard';
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';

export default function SaveJobs() {
  const { isLoaded, user } = useUser();
  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    error: errorSavedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedjobs);
  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded])
  if (!isLoaded || loadingSavedJobs) return <BarLoader width={"100%"} color='#36d7b7' />
  return (
    <div>
      <h1 className='gradient-title text-5xl sm:7xl font-extrabold text-center pb=8'>
        Saved Jobs
      </h1>
      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return (
                <>
                  <JobCard
                    key={saved.id}
                    job={saved?.job}
                    savedInit={true}
                    onJobSaved={() => fnSavedJobs()}
                  />
                </>

              );
            })
          ) : (
            <div>No Saved Jobs Found </div>
          )}
        </div>
      )}
    </div>
  )
}
