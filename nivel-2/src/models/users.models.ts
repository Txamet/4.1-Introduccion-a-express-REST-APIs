import prisma from "../prismaClient";


export const searchUser=(async(userData:any)=>{
    return await prisma.user.findFirst({
        where:{name:userData.name}
    });
});

export const findUserById = (async (id: number) => {
    return await prisma.user.findFirst({
        where: { id: Number(id)},
    });
});




export const createNewUser = async (userData: any) => {
    return await prisma.user.create({
        data: userData
    });
};


export const updateNewUser = async (id: number, userData: any) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: userData
    });
};











