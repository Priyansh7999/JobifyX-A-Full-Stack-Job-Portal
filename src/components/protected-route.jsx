import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

// this component is used to protect routes
function ProtectedRoute({children}) {
    // use useUser from clerk to check if user is signed in 
    const {isSignedIn, user, isLoaded} = useUser();
    const {pathname} = useLocation();
    if(isLoaded && !isSignedIn){
        return <Navigate to={`/?signIn=true`} />
    }

    if(user!=undefined && !user.unsafeMetadata?.role && pathname!=="/onboarding"){
        return <Navigate to='/onboarding' />
    }
    return children;
}

export default ProtectedRoute;
