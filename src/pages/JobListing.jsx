import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/jobCard';
import useFetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';

export default function JobListing() {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error: errorJobs
  } = useFetch(getJobs, {
    searchQuery, location, company_id
  })

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl tracking-tighter text-center pb-8'>Latest Jobs</h1>

      {/* Add filters */}

      {
        loadingJobs && (
          <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
        )
      }

      {
        loadingJobs === false && (
          <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                   <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div>No jobs found</div>
              )
            }
          </div>
        )
      }

    </div>
  )
}
