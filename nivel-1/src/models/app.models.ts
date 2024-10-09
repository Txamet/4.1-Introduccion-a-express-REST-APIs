import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        where: { contactId: Number(id)},
        data: { deleted: true }
    });
};

export const uptadeOneContact = async (id: number, conctactData: any) => {
    return await prisma.contact.update({
        where: { contactId: Number(id)},
        data: conctactData
    });
};

export const recoverOneContact = async (id: number) => {
    return await prisma.contact.update({
        where: { contactId: Number(id)},
        data: {deleted: false}
    });
};

export const favoriteOneContact = (async (id: number) => {
    const showContact = await prisma.contact.findFirst({
        where: {contactId: Number(id), deleted: false}
    });

    if (showContact?.favorite == false) {
        return await prisma.contact.update({
            where: {contactId: Number(id)},
            data: { favorite: true },
        });

    } else {
        return await prisma.contact.update({
            where: {contactId: Number(id)},
            data: { favorite: false },
        });
    }
});

export const findContactByEmail = (async (contactData: any) => {
    return await prisma.contact.findFirst({
        where: { email: contactData.email, deleted: false},
    });
});

export const findContactById = (async (id: number) => {
    return await prisma.contact.findFirst({
        where: { contactId: Number(id), deleted: false},
    });
});

export const findDeletedContactById = (async (id: number) => {
    return await prisma.contact.findFirst({
        where: { contactId: Number(id), deleted: true},
    });
});