import Link from 'next/link';

import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {

  // when we called [...nextauth].js from auth-form signIn() method, it store jwt at cookies, 
  // so we could use useSession to check user has logged in or not
  // session has user object which encoded in jwt cookies
  const [session, loading] = useSession();

  async function logoutHandler() {
    const result = await signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}

          <li>
            {
              session && <Link href='/profile'>Profile</Link>
            }

          </li>
          <li>
            {
              session && <button onClick={logoutHandler}>Logout</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
