// /api/user/change-password.js
import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../utils/auth-util';
import { connectToDatabase } from '../../../utils/db-util';

async function handler(req, res) {
    // protecting api route
    if (req.method !== 'PATCH') {
        return;
    }

    // check session cookies jwt token has there or not, find in chrome application
    const session = await getSession({ req: req });

    // not token found
    if (!session) {
        // authentication is missing
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    // authenticated user, session store user data
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: "user not found" });
        client.close();
        return;
    }


    const currentPassword = user.password;

    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword)


    if (!passwordAreEqual) {
        res.status(422).json({ message: 'Invalid password.' });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    // password correct, second argument is describe, $set understood by mongodb
    // select the email and set password to new password
    const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    client.close();
    res.status(200).json({ message: 'Password updated!' });
}

export default handler;