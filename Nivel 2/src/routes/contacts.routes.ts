import express from "express";
import { deleteContact, uptadeContact, recoverContact, favoriteContact, getContacts, createUserContact, getUserContacts, getUserFavorites, getUserDeletedContacts } from "../controllers/contacts.controllers";

const router = express.Router();


router.delete("/:contactId", deleteContact);

router.put("/:contactId", uptadeContact);

router.patch("/:contactId/recover", recoverContact);

router.patch("/:contactId/favorites", favoriteContact);

router.get("/", getContacts)

router.post("/:userId", createUserContact);

router.get("/:userId",getUserContacts);

router.get("/:userId/favorites", getUserFavorites)

router.get("/:userId/deleted", getUserDeletedContacts)

export default router;
