import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput){
    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        // data: input,
        // Question: what's a 'rest operator'?
        data: { ...rest, salt, password: hash },
    });

    return user
}

export async function findUserByEmail(email: string) {
    // Note: Prisma only has "findFirst", "findMany", & "findUnique" ... not simply "find"
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true,
        }
    });
}