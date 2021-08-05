import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../utils/auth-util';
import { connectToDatabase } from '../../../utils/db-util';

// catch all incoming request, and check whether this user has correct authorization to make a request
export default NextAuth({
    session: {
        // jwt are being use
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text", placeholder: "test@test.com" },
                password: {label: "Password", type: "password"}
            },
            // receive incoming request and check the authorization
             // signIn(1,2) 2 argument from next-auth/client will pass into this authorize(crendetials) from auth-from.js line 49
            async authorize(credentials) {
                const client = await connectToDatabase();

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    // when we throw an error, next auth auto provide the error and redirect the client another page, but we can overwrite that page
                    throw new Error('No user found!');
                }

                // credntials.password is sent from client send, then we compare it with database
                // compare the password has already hash, but bcryptjs could resolve it by using that pacakge
                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Could not log you in');
                }

                client.close();

                // return back the user email, but not paswword and store the cookie in the session, we can use getSession() in getserversideprops context.req to check authentication
                return { email: user.email };
            }
        })
    ],
});