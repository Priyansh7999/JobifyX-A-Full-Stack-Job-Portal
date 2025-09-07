import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/jobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/clerk-react'
import { State } from 'country-state-city';
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
  console.log(jobs);


  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch(getCompanies)

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search");
    if (query) setSearchQuery(query);
  }


  if (!isLoaded) return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl tracking-tighter text-center pb-8'>Latest Jobs</h1>

      {/* Add filters */}
      <form onSubmit={handleSearch} className='flex h-14 w-full gap-2 items-center mb-3'>
        <Input
          type="text"
          name="search"
          placeholder="Search jobs..."
          className="h-full flex-1 px-4 text-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                State?.getStatesOfCountry("IN")?.map((state) => (
                  <SelectItem key={state.isoCode} value={`${state.name}, India`}>{`${state.name}, India`}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                companies?.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button variant={'destructive'} className='mt-4 w-full' onClick={() => {
        setLocation("");
        setCompany_id("");
        setSearchQuery("");
      }}>
        Clear Filters
      </Button>
      {
        loadingJobs && (
          <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
        )
      }

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <>
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                </>

              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  )
}
