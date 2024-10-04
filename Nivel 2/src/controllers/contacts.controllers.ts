import { prisma } from "../models/db.models"; 

export const deleteContact = (async(req: any,res: any)=>{
    const contactId: number = req.params.contactId;
    const showContact = await prisma.contact.findFirst({
        where: {contactId: Number(contactId)}
    });

    if (!showContact || showContact.deleted == true) {
        res.status(404).end("Contact not found");

    } else {
        const eraseContact= await prisma.contact.update({
            where:{contactId: Number(contactId)},
            data:{deleted: true}
        });
    
        res.status(200).json("Contact deleted") ;
    }
});

export const uptadeContact = (async(req: any, res: any)=>{
    try {
        const contactId: number = req.params.contactId;
        const searchDeletedContact = await prisma.contact.findFirst({
            where: {contactId: Number(contactId), deleted: false}
        });

        if (!searchDeletedContact) return res.status(404).end("Contact not found")

        const {name, last_name, email, phone_number} = req.body;
        const putContact = await prisma.contact.update({
            where: {contactId : Number(contactId)},
            data:{name, last_name, email, phone_number}
        });

        res.status(200).json(putContact)
    
    } catch (error) {
        res.status(500);
        res.end("Error: Invalid format of data")
    }
});

export const recoverContact = (async (req: any, res: any) => {
    const contactId = req.params.contactId;
    const searchDeletedContact = await prisma.contact.findFirst({
        where: {contactId: Number(contactId), deleted: true}
    });

    if (!searchDeletedContact) return res.status(404).end("Contact not found")

    const searchContact = await prisma.contact.findFirst({
        where: {email: searchDeletedContact?.email, deleted: false}
    })

    if (searchContact) return res.status(400).end("Contact already exists with another contactId")
    
    const recoveredContact = await prisma.contact.update({
        where: {contactId: Number(contactId)},
        data: { deleted: false },
    });

    res.status(200).json("Contact recovered"); 
});

export const favoriteContact = (async (req: any, res: any) => {
    const contactId = req.params.contactId;
    const showContact = await prisma.contact.findFirst({
        where: {contactId: Number(contactId), deleted: false}
    });

    if(!showContact) return res.status(404).end("Contact not found");

    if (showContact?.favorite == false) {
        const favContact = await prisma.contact.update({
            where: {contactId: Number(contactId)},
            data: { favorite: true },
        });

        res.status(200).json("Contact is favorite now")

    } else {
        const noFavContact = await prisma.contact.update({
            where: {contactId: Number(contactId)},
            data: { favorite: false },
        });

        res.status(200).json("Contact is no longer a favorite")
    }
});

export const getContacts = (async(req: any, res: any)=>{
    const showContacts = await prisma.contact.findMany({
       where: {deleted:false}
   });

   if (showContacts.length == 0) {
        res.status(200).end("Contacts list is empty")    
    } else {
        res.json(showContacts)     
    }
});

export const createUserContact = (async(req: any, res: any)=>{
    try {
        const idUser = req.params.userId;
        const searchUserId = await prisma.user.findFirst({
            where: {id: Number(idUser)}
        });

        if (!searchUserId) return res.status(400).end("User not found")

        const {name, last_name, email, phone_number}= req.body;    
        const newUserContact = await prisma.contact.create({
            data:{
                name, last_name, email, phone_number, userId: Number(idUser)
               } 
        });

        res.json(newUserContact)  

    } catch (error) {
        res.status(500);
        res.end("Error: Invalid format of data")
    }
});
