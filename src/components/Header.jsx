import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const { user } = useUser();

    // to get the search params from the url
    const [Search, setSearch] = useSearchParams();
    // if the url contains ?signIn=true then show the sign in form
    useEffect(() => {
        if (Search.get("signIn") === "true") {
            setShowSignIn(true);
        }
    }, [Search]);

    // function to close the sign in form when clicked outside the form
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    };
    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to="/">
                    <img src="/logo.png" alt="Logo" className="h-20" />
                </Link>
                <div className='flex items-center gap-4'>
                    {/* if user is not signed in */}
                    <SignedOut>
                        <Button variant={"outline"} onClick={() => setShowSignIn(true)}>Login</Button>
                    </SignedOut>

                    {/* if user is signed in */}
                    <SignedIn>
                        {/* post a job only seen by recruiters */}
                        {
                            user?.unsafeMetadata?.role === 'recruiter' && (
                                <Link to="/post-job">
                                    <Button variant="destructive" className='rounded-full'>
                                        <PenBox size={20} className='mr-2' />
                                        Post a Job
                                    </Button>
                                </Link>
                            )
                        }


                        {/* user menu */}
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    labelIcon={<BriefcaseBusinessIcon size={16} />}
                                    href='/my-jobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<Heart size={16} />}
                                    href='/saved-jobs'
                                />
                            </UserButton.MenuItems>

                        </UserButton>
                    </SignedIn>
                </div>
            </nav>
            {showSignIn && (
                <div
                    className="fixed z-10 inset-0 flex items-center justify-center bg-black/60"
                    // function to close when clicked outside the sign in form
                    onClick={handleOverlayClick}
                >
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    )
}

export default Header
