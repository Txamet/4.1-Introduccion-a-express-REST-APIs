import {prismaMock} from './client';
import * as contactModel from "../models/app.models";
import {jest, describe, test, expect, beforeEach} from '@jest/globals';

describe("Testing model endpoints", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Should create a new contact", async () => {
        const newContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };

        prismaMock.contact.create.mockResolvedValue(newContact);

        const result = await contactModel.createNewContact({
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021
        });

        expect(result).toEqual(newContact);
        expect(prismaMock.contact.create).toHaveBeenCalledWith({
            data: {
                name: "Samantha",
                last_name: "Doe",
                email: "sam_doe@gmail.com",
                phone_number: 600000021,

            }
        });
    });

    test("Should retrieve all contacts that are not deleted", async () => {
        const showContacts = [
            {
                contactId: 1,
                name: "Samantha",
                last_name: "Doe",
                email: "sam_doe@gmail.com",
                phone_number: 600000021,
                favorite: false,
                deleted: false
            },
            {
                contactId: 2,
                name: "John",
                last_name: "Doe",
                email: "john@gmail.com",
                phone_number: 600000000,
                favorite: false,
                deleted: false
            }];

        prismaMock.contact.findMany.mockResolvedValue(showContacts);

        const result = await contactModel.getAllContacts();
     
        expect(result).toEqual(showContacts);
        expect(prismaMock.contact.findMany).toHaveBeenCalledWith({
            where: { deleted: false}
        });
    });

    test("Should delete one contact", async () =>{
        const deleteContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };

        prismaMock.contact.update.mockResolvedValue(deleteContact);

        const result = await contactModel.deleteOneContact(1);

        expect(result).toEqual(deleteContact);
        expect(prismaMock.contact.update).toHaveBeenCalledWith({
            where: { contactId: 1 },
            data: { deleted: true }
        });
    });

    test("Should update a contact", async () => {
        const updateContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe edited",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };

        prismaMock.contact.update.mockResolvedValue(updateContact);
        
        const result = await contactModel.uptadeOneContact(1, {last_name: "Doe edited"});

        expect(result).toEqual(updateContact);
        expect(prismaMock.contact.update).toHaveBeenCalledWith({
            where: { contactId: 1 },
            data: { last_name: "Doe edited" }
        });
    });

    test("Should mark a contact as favorite", async () => {
        const favoriteteContact = {
            contactId: 1,
            name: "Samantha",
            last_name: "Doe",
            email: "sam_doe@gmail.com",
            phone_number: 600000021,
            favorite: false,
            deleted: false
        };

        prismaMock.contact.findFirst.mockResolvedValue(favoriteteContact);
        prismaMock.contact.update.mockResolvedValue({ ...favoriteteContact, favorite: true });
        
        const result = await contactModel.favoriteOneContact(1);

        expect(result.favorite).toBe(true);
        expect(prismaMock.contact.update).toHaveBeenCalledWith({
            where: { contactId: 1 },
            data: { favorite: true }
        });
    });

    


});



/*
// Acorde a los docs de Prisma
test('should create new user ', async () => {
    const newContact = {
        contactId: 1,
        name: "Samantha",
        last_name: "Doe",
        email: "sam_doe@gmail.com",
        phone_number: 600000021,
        favorite: false,
        deleted: false
    };

  prismaMock.contact.create.mockResolvedValue(newContact)

  await expect(contactModel.createNewContact(newContact)).resolves.toEqual({
    contactId: 1,
    name: "Samantha",
    last_name: "Doe",
    email: "sam_doe@gmail.com",
    phone_number: 600000021,
    favorite: false,
    deleted: false
  })
})
*/
