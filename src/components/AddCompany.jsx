import React, { useEffect } from 'react'
import z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import useFetch from '@/hooks/useFetch';
import { addNewCompany } from '@/api/apiCompanies';
import { BarLoader } from 'react-spinners';
const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});
function AddCompany({ fetchCompanies }) {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);
    
    return (
        <Dialog>
            <DialogTrigger>
                <Button type="button" size={"sm"} variant={"secondary"}>
                    Add Company
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Company</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-2 justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        placeholder="Company Name"
                        {...register("name")}
                    />
                    <Input
                        type={"file"}
                        accept="image/*"
                        placeholder="Company Logo"
                        className={"file:text-grat-500"}
                        {...register("logo")}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        variant={"destructive"}
                    >
                        Add
                    </Button>
                </form>
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}
                {errorAddCompany?.message && <p className='text-red-500'>{errorAddCompany?.message}</p>}
                {loadingAddCompany && <BarLoader width={"100%"} color='#36d7b7'/>}

            </DialogContent>

        </Dialog>
    )
}

export default AddCompany
