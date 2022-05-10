// Here, we're creating bespoke hashing of the password (rather than using a library liek BCrypt)
import crypto from 'crypto';

// When a User registers ...
// Step 1: User will supply a password,
export function hashPassword(password: string){
    // Step 2: random piece of 'salt is generated,
    const salt = crypto.randomBytes(16).toString("hex");
    // Note: A salt is a random piece of data to make otherwise-identical passwords unique (User A and User B choose 'password', but salting makes them different after conversion)

    // Step 3a: the user-supplied password is combined with the salt and stored ...
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    // Step 3b: ... *along with* the salt.
    return { hash, salt };
}

// When a User tries to log in ...
export function verifyPassword({
    candidatePassword, 
    salt, 
    hash,
}: {
    candidatePassword: string;
    salt: string;
    hash: string;
}) {
    // Step 1: The user's inputted password/candidate pw will be passed in, along with the *user object's* salt (so we already know the salt), and hashed ...
    const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

    // Step 2: *If* the user's hashed *inputted* pw === user object's hashed pw, they are verified (or else return 'false')
    return candidateHash === hash;
}