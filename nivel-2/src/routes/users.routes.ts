import express from "express";
import { createUser, updateUser } from "../controllers/users.controllers";

const router = express.Router();

router.post("/", createUser);

router.patch("/:userId", updateUser);

export default router;