import express, { json } from "express";
import { getContacts, getContact, createContact, deleteContact, uptadeContact, recoverContact, favoriteContact } from "../controllers/app.controllers";

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", createContact);

router.put("/:contactId", uptadeContact);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId/recover", recoverContact);

router.patch("/:contactId/favorites", favoriteContact)

module.exports = router;
