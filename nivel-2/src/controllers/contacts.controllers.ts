import{
    getAllContacts,
    createNewContact,
    deleteOneContact,
    updateOneContact,
    recoverOneContact,
    favoriteOneContact,
    findContactByEmail,
    findDeletedContactById,
    findContactById,
    getUserContacts,
    getUserFavorites,
    getUserDeletedContacts,
}from "../models/contact.models";

import{findUserById} from "../models/users.models"

export const getContacts = async (req: any, res: any) => {
    try {
        const contacts = await getAllContacts();
        if (contacts.length === 0) {
            res.status(200).end("Contacts list is empty");
        } else {
            res.json(contacts);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching contacts" });
    }
};


export const createUserContact = async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const { name, last_name, email, phone_number } = req.body;

        const contactExists = await findContactByEmail(email);
        if (contactExists) {
            return res.status(400).json({ error: "Contact already exists" });
        }

        const newContact = await createNewContact({
            name, last_name, email, phone_number, userId: Number(userId)
        });

        res.status(200).json(newContact);
    } catch (error) {
        res.status(500).json({ error: "Error creating contact" });
    }
};

export const updateContact = async (req: any, res: any) => {
    try {
        const { contactId } = req.params;
        const { name, last_name, email, phone_number } = req.body;

        const contact = await findContactById(contactId);
        if (!contact) return res.status(404).json({ error: "Contact not found" });

        const updatedContact = await updateOneContact(contactId, { name, last_name, email, phone_number });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Error updating contact" });
    }
};

export const deleteContact = async (req: any, res: any) => {
    try {
        const { contactId } = req.params;
        const contact = await findContactById(contactId);

        if (!contact) return res.status(404).json({ error: "Contact not found" });

        await deleteOneContact(contactId);
        res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting contact" });
    }
};

export const recoverContact = async (req: any, res: any) => {
    try {
        const { contactId } = req.params;
        const contact = await findDeletedContactById(contactId);

        if (!contact) return res.status(404).json({ error: "Deleted contact not found" });

        const searchContactByEmail = await findContactByEmail(contact.email);
        if (searchContactByEmail) return res.status(409).json({error: "Contact already exists with another contactId"});

        const recoveredContact = await recoverOneContact(contactId);
        res.status(200).json(recoveredContact);
    } catch (error) {
        res.status(500).json({ error: "Error recovering contact" });
    }
};

export const favoriteContact = async (req: any, res: any) => {
    try {
        const { contactId } = req.params;
        const contact = await favoriteOneContact(contactId);

        if (!contact) return res.status(404).json({ error: "Contact not found" });

        const message = contact.favorite ? "Contact is now a favorite" : "Contact is no longer a favorite";
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error: "Error toggling favorite" });
    }
};

export const getUserContactsController = async (req: any, res: any) => {
    try {
        const { userId } = req.params;

        const user= await findUserById(Number(userId));
        if(!user){return res.status(404).json({ error: "User not found" });}

        const contacts = await getUserContacts(Number(userId));

        if (contacts.length === 0) {
            res.status(200).json({ message: "Contact list is empty" });
        } else {
            res.json(contacts);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user's contacts" });
    }
};


export const getUserFavoritesController = async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const user= await findUserById(Number(userId));
        if(!user){return res.status(404).json({ error: "User not found" });}

        const favorites = await getUserFavorites(Number(userId));

        if (favorites.length === 0) {
            res.status(200).json({message:"Favorite list is empty"});
        } else {
            res.json(favorites);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user's favorites" });
    }
};

export const getUserDeletedContactsController = async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const user= await findUserById(Number(userId));
        if(!user){return res.status(404).json({ error: "User not found" });}

        const deletedContacts = await getUserDeletedContacts(Number(userId));

        if (deletedContacts.length === 0) {
            res.status(200).json({message:"There are no deleted contacts"});
        } else {
            res.json(deletedContacts);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user's deleted contacts" });
    }
};