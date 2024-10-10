import { searchUser, findUserById, createNewUser, updateNewUser } from "../models/users.models";

//crear usuario
export const createUser = (async (req: any, res: any) => {
    try {
        const findUser = await searchUser(req.body);
        if (findUser) return res.status(400).json({ error: "User already exists" });

        const newUser = await createNewUser(req.body);
        if (!newUser) return res.status(500).json({ error: "invalid data format" });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }

});

//Update usuario
export const updateUser = (async (req: any, res: any) => {
    try {
        const findUser = await findUserById(req.params.userId);
        if (!findUser) return res.status(404).json({ error: "User not found" })
        const putUser = await updateNewUser(req.params.userId, req.body);
        if (!putUser) return res.status(500).json({ error: "invalid format of data" });
        res.status(200).json(putUser);
    }catch (error){
        res.status(500).json({error: "Error retrieving user"})
    }
})