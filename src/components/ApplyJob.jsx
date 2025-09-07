import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';

const ApplyJobDrawer = (
    { user, job, fetchJob, applied = false }
) => {
    return (
        <Drawer open={applied ? false : undefined}>
            <DrawerTrigger asChild>
                <Button
                    size="lg"
                    variant={job?.isOpen && !applied ? "blue" : "destructive"}
                    disabled={!job?.isOpen || applied}
                >
                    {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                    <DrawerDescription>Please fill out the form below to apply for this job.</DrawerDescription>
                </DrawerHeader>

                <form>
                    

                </form>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ApplyJobDrawer;
