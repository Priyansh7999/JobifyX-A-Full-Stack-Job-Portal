import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllStates } from 'country-state-city/lib/state'
import { State } from 'country-state-city'
import useFetch from '@/hooks/useFetch'
import { getCompanies } from '@/api/apiCompanies'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import { Navigate, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button'
import { addNewJob } from '@/api/apiJobs'
import AddCompany from '@/components/AddCompany'
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
})
export default function PostJob() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate ();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: ""
    },
    resolver: zodResolver(schema)
  })

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded])

  const {
    fn: fnCreateJob,
    data: dataCreateJob,
    loading: loadingCreateJob,
    error: errorsCreateJob
  } = useFetch(addNewJob);

  const onSubmit=(data)=>{
    fnCreateJob({...data, recruiter_id: user.id, isOpen:true});
  };

  useEffect(() => {
    if (dataCreateJob?.length>0) {
      navigate('/jobs');
    }
  }, [loadingCreateJob])


  if (!isLoaded || loadingCompanies) return <BarLoader width={"100%"} color='#36d7b7' />

  if (user?.unsafeMetadata?.role === 'candidate') return <Navigate to='/jobs' />


  return (
    <div>
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8'>Post a Job</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 p-4 pb-0'
      >
        {/* TITLE */}
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

        {/* DESCRIPTION */}
        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
          {/* LOCATION */}
          <Controller
            control={control}
            name='location'
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a location" />
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
            )}
          />
          {/* COMPANY LIST */}
          <Controller
            name='company_id'
            control={control}
            render={({ field }) => (
              <Select
               value={field.value}
               onValueChange={field.onChange}
               >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select or Add a new Company">
                    {
                      field.value
                        ? companies?.find((company) => company.id === Number(field.value))?.name
                        : "Select or Add a new Company"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      companies?.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          <img src={company.logo_url} alt={company.name} className='w-6 h-6 mr-2 object-contain' /> {company.name}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompany fetchCompanies={fnCompanies} />
        </div>
        {
          errors?.location && <p className='text-red-500'>{errors.location.message}</p>
        }
        {
          errors?.company_id && <p className='text-red-500'>{errors.company_id.message}</p>
        }
        <div>
          <Controller 
            control={control}
            name='requirements'
            render={({ field }) => (
              <MDEditor 
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {
            errors?.requirements && <p className='text-red-500'>{errors.requirements.message}</p>
          }
        </div>
        {
          errorsCreateJob && <p className='text-red-500'>{errorsCreateJob?.message}</p>
        }
        {
          loadingCreateJob && <BarLoader width={"100%"} color='#36d7b7' />
        }
        <Button type='submit' variant={"blue"} size={"lg"} className={"mt-2"}>
            Post Job
        </Button>
      </form>
    </div>
  )
}
