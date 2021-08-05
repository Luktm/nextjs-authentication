// getSession send a new request, then we can immediately get the session
// useSession has a bug, so getSession being use to send a new request
// import { useSession, getSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  // // this work with [...nextauth].js being loging from auth-form signIn();
  // // const [session, loading] = useSession();

  // useEffect(() => {
  //   getSession().then((session) => {

  //     // if we do not have the session we navigate it back to auth page
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }

  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>
  // }

  async function changePasswordHandler(passwordData) {
    
    // api route
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        // passwordData: {"oldPassword", "newPassword"}
        body: JSON.stringify(passwordData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      console.log(data);
  }
  
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
