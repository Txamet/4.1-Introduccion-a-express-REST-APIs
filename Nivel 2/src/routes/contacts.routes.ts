import express from "express";
import { deleteContact, uptadeContact, recoverContact, favoriteContact, getContacts, createUserContact } from "../controllers/contacts.controllers";

const router = express.Router();


router.delete("/:contactId", deleteContact);

router.put("/:contactId", uptadeContact);

router.patch("/:contactId/recover", recoverContact);

router.patch("/:contactId/favorites", favoriteContact);

router.get("/", getContacts)

router.post("/:userId", createUserContact);


export default router;
