import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // client side to verify session by leverage next-auth
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if(isLoading) {
    return (<p>Loading...</p>);
  }
  
  return <AuthForm />;
}

export default AuthPage;
