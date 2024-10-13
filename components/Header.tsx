"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (  
    <div className="flex items-center justify-between p-5">
      {user && (
      <h1>{user?.firstName}{`'s`} space</h1>
    )}

 
    {/* BreadCrumbs */}

    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
    
    
    </div>
  )
}

export default Header