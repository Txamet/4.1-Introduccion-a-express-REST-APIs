import express from "express";
import { deleteContact, 
    updateContact, 
    recoverContact, 
    favoriteContact, 
    getContacts, 
    createUserContact,
     getUserContactsController, 
     getUserFavoritesController, 
     getUserDeletedContactsController
     } from "../controllers/contacts.controllers";

const router = express.Router();


router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/recover", recoverContact);

router.patch("/:contactId/favorites", favoriteContact);

router.get("/", getContacts)

router.post("/:userId", createUserContact);

router.get("/:userId",getUserContactsController);

router.get("/:userId/favorites", getUserFavoritesController)

router.get("/:userId/deleted", getUserDeletedContactsController)

export default router;