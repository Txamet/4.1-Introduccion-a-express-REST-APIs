import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient

if (process.env.NODE_ENV === 'test') {
    prisma = require('../tests/client').default;
} else {
    prisma = new PrismaClient();
}

export const getAllContacts = async () => {
    return await prisma.contact.findMany({
        where: { deleted: false }
    });
};

export const createNewContact = async (contactData: any) => {
    return await prisma.contact.create({
        data: contactData
    });
};

export const deleteOneContact = async (id: number) => {
    return await prisma.contact.update({
        where: { contactId: Number(id) },
        data: { deleted: true }
    });
};

export const updateOneContact = async (id: number, conctactData: any) => {
    return await prisma.contact.update({
        where: { contactId: Number(id) },
        data: conctactData
    });
};

export const recoverOneContact = async (id: number) => {
    return await prisma.contact.update({
        where: { contactId: Number(id) },
        data: { deleted: false }
    });
};

export const favoriteOneContact = (async (id: number) => {
    const showContact = await prisma.contact.findFirst({
        where: { contactId: Number(id), deleted: false }
    });

    if (showContact?.favorite == false) {
        return await prisma.contact.update({
            where: { contactId: Number(id) },
            data: { favorite: true },
        });

    } else {
        return await prisma.contact.update({
            where: { contactId: Number(id) },
            data: { favorite: false },
        });
    }
});

export const findContactByEmail = (async (email: string) => {
    return await prisma.contact.findFirst({
        where: { email, deleted: false },
    });
});

export const findContactById = (async (id: number) => {
    return await prisma.contact.findFirst({
        where: { contactId: Number(id), deleted: false },
    });
});

export const findDeletedContactById = (async (id: number) => {
    return await prisma.contact.findFirst({
        where: { contactId: Number(id), deleted: true },
    });
});

export const getUserContacts= async(userId:number)=>{
return await prisma.contact.findMany({
    where:{userId, deleted:false},
    orderBy:{name:'asc'}
});
};

export const getUserFavorites =async(userId:number)=>{
    return await prisma.contact.findMany({
        where:{userId, favorite:true, deleted:false},
        orderBy:{name:'asc'}
    });
};

export const getUserDeletedContacts= async (userId:number)=>{
    return await prisma.contact.findMany({
        where:{userId, deleted:true},
        orderBy: {name: 'asc'}
    });
}

