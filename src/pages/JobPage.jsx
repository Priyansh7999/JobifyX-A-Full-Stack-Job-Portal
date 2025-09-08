
import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import ApplyJobDrawer from '@/components/ApplyJob';
import ApplicationCard from '@/components/ApplicationCard';

export default function JobPage() {
  const { isLoaded, user } = useUser();

  const { id } = useParams();
  const {
    loading: loadingJob,
    data: job,
    error: errorJob,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  })

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  })

  const handleStatusChange = (value) => {
    const isOpen = value === "open" ? true : false;
    fnHiringStatus(isOpen).then(() => fnHiringStatus());
  }

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  console.log(job);

  if (!isLoaded || loadingJob)
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold text-4xl pb-3 sm:text-6xl tracking-tighter'>{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.company?.name} className='h-12' />
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon />
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className='flex gap-2'>
          {job?.isOpen ? <><DoorOpen /> Open</> : <><DoorClosed /> Closed</>}
        </div>
      </div>

      {/* hiring status */}
      {loadingHiringStatus && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className='gradient-title text-2xl sm:text-3xl font-bold'>About The Job</h2>
      <p className='sm:text-lg'>{job?.description}</p>
      <p className='text-2xl sm:text-3xl font-bold'>What we are looking for</p>
      <MDEditor.Markdown source={job?.requirements} className='bg-transparent sm:text-lg' />

      {/* render applications for recruiter */}
      {
        job?.recruiter_id != user?.id && <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      }
      {
        job?.applications?.length>0 && job?.recruiter_id === user?.id && (
          <div className='flex flex-col gap-3'>
            <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
            {
              job?.applications.map((application)=>{
                return <ApplicationCard key={application.id} application={application} />
              })
            }
          </div>
        )
      }
    </div>
  )
}
