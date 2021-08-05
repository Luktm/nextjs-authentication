import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
    // the higher the number, more secure it is
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    // bcryptjs can compare hashed password where the password we stored by hashPassword() function
    const isValid = await compare(password, hashedPassword);
    return isValid;
}