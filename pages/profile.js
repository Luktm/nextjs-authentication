import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';

function ProfilePage(props) {
  console.log(props);
  
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  /**
   * another way of extract cookies the to check whether use is logged in or not
   * an elegant way to prevent unauthenticated user open profile page by typing in url
   */
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  // all of this also will pass to _app.js pageProps, we can utilize it there
  return {
    props: { session: session },
  };

}

export default ProfilePage;
