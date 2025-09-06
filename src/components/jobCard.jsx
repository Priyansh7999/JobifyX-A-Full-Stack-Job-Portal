import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

// job card component to show job details
// props: job, isMyJob, savesInit, onJobSaved
// job: object containing job details
export default function JobCard({
    job, isMyJob = false, savesInit = false, onJobSaved = () => { }
}) {
    const { user } = useUser();
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}
                    {!isMyJob && <Trash2Icon fill="red" size={18} className='text-red-300 cursor-pointer' />}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className='flex justify-between'>
                    {job.company && <img src={job.company.logo_url} alt={job.company.name} className='h-8 mb-2' />}
                    <div className='flex gap-1 items-center'>
                        <MapPinIcon className='inline mr-2' size={15} />
                        <span>{job.location}</span>
                    </div>      
                </div>
                <hr />
                {job.description.substring(0,job.description.indexOf("."))}...
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button 
                        variant="secondary" 
                        className='w-full' >
                        More Details
                    </Button>
                </Link>
                <Heart size={20} stroke='red' fill='red' />
            </CardFooter>
        </Card>
    )
}
