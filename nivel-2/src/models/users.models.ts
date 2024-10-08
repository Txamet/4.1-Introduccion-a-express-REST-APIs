import { PrismaClient } from "@prisma/client";

 export let prismaUser: PrismaClient

if (process.env.NODE_ENV === 'test') {
    prismaUser = require('../tests/client').default;
} else {
    prismaUser = new PrismaClient();
}



export const searchUser=(async(userData:any)=>{
    return await prismaUser.user.findFirst({
        where:{name:userData.name}
    });
});

export const findUserById = (async (id: number) => {
    return await prismaUser.user.findFirst({
        where: { id: Number(id)},
    });
});




export const createNewUser = async (userData: any) => {
    return await prismaUser.user.create({
        data: userData
    });
};


export const updateNewUser = async (id: number, userData: any) => {
    return await prismaUser.user.update({
        where: { id: Number(id) },
        data: userData
    });
};











