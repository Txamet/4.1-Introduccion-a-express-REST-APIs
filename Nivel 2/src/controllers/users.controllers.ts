import { prisma } from "../models/db.models";

export const createUser = (async(req: any, res: any)=>{
    try {
        const {name}= req.body;
        const searchUser = await prisma.user.findFirst({
            where: {name}
        });

        if (searchUser) return res.status(400).end("User already exists")

        const newUser = await prisma.user.create({
            data:{
             name
            }
        });

        res.json(newUser)  

    } catch (error) {
        res.status(500);
        res.end("Error: Invalid format of data")
    }
});

export const uptadeUser = (async(req: any, res: any)=>{
    try {
        const userId: number = req.params.userId;
        const searchUser = await prisma.user.findFirst({
            where: {id: Number(userId)}
        });

        if (!searchUser) return res.status(404).end("User not found")

        const {name} = req.body;
        const patchUser = await prisma.user.update({
            where: {id : Number(userId)},
            data:{name}
        });

        res.status(200).json(patchUser)
    
    } catch (error) {
        res.status(500);
        res.end("Error: Invalid format of data")
    }
});