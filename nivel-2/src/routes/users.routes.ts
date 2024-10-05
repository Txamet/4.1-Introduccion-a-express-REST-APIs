import express from "express";
import { createUser, uptadeUser } from "../controllers/users.controllers";

const router = express.Router();

router.post("/", createUser);

router.patch("/:userId", uptadeUser);

export default router;