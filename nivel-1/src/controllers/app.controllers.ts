import { getAllContacts, createNewContact, deleteOneContact, uptadeOneContact, recoverOneContact, favoriteOneContact, findContactByEmail, findContactById, findDeletedContactById } from "../models/app.models"

export const createContact = (async(req: any, res: any)=>{
    try {
        const searchContact = await findContactByEmail(req.body);
        if (searchContact) return res.status(409).json({error: "Contact already exists"});

        const newContact = await createNewContact(req.body);
        res.status(200).json(newContact);  

    } catch (error) {
        res.status(500).json({error: "Error creating contact: Invalid format of data"});
    }
});

export const deleteContact = (async(req: any,res: any)=>{
    try {
        const searchContact = await findContactById(req.params.contactId);

        if (!searchContact) {
            res.status(404).json({error: "Contact not found"});

        } else {
            await deleteOneContact(req.params.contactId);
            res.status(200).json({success: "Contact deleted"}) ;
        }

    } catch (error) {
        res.status(500).json({error: "Error trying to delete contact"});
    }
});

export const uptadeContact = (async(req: any, res: any)=>{
    try {
        const searchContact = await findContactById(req.params.contactId);
        if (!searchContact) return res.status(404).json({error: "Contact not found"});

        const putContact = await uptadeOneContact(req.params.contactId, req.body);
        if (!putContact) return res.status(404).json({error: "Invalid format of data"});

        res.status(200).json(putContact);
    
    } catch (error) {
        res.status(500).json({error: "Error retrieving contact"});
    }
});

export const recoverContact = (async (req: any, res: any) => {
    try {
        const searchContactById = await findDeletedContactById(req.params.contactId);
        if (!searchContactById) return res.status(404).json({error: "Contact not found"});

        const searchContactByEmail = await findContactByEmail(searchContactById);
        if (searchContactByEmail) return res.status(409).json({error: "Contact already exists with another contactId"});
    
        await recoverOneContact(req.params.contactId);
        res.status(200).json({success: "Contact recovered"}); 

    } catch (error) {
        res.status(500).json({error: "Error retrieving contact"});
    }
});

export const favoriteContact = (async (req: any, res: any) => {
    try {
        const searchContact = await findContactById(req.params.contactId);
        if (!searchContact) return res.status(404).json({error: "Contact not found"});

        const setFavorite = await favoriteOneContact(req.params.contactId);
        
        if (setFavorite.favorite == true) {
            res.status(200).json("Contact is favorite now");

        } else { 
            res.status(200).json("Contact is no longer a favorite"); 
        }
    
    } catch (error) {
        res.status(500).json({error: "Error retrieving contact"});
    }
});

export const getContacts = (async(req: any, res: any)=>{
    try {
        const showContacts = await getAllContacts();

        if (showContacts.length == 0) {
            res.status(200).json("Contacts list is empty");  

        } else {
            res.status(200).json(showContacts);     
        }

    } catch (error) {
        res.status(500).json({error: "Error retrieving contacts"})
    }
});
