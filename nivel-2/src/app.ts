import express, { json } from "express";
import contact_routes from "./routes/contacts.routes";
import user_routes from "./routes/users.routes"
import dotenv from "dotenv";
dotenv.config();
export const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3214;

const BASE_URL = `http://localhost:${PORT}`;
//module.exports={BASE_URL}

// const server = app.listen(PORT,()=>
 //   console.log(`Server ready at: ${BASE_URL}`)
//);

app.use("/contacts", contact_routes);
app.use("/users", user_routes);
app.use((req, res) => {
    res.status(404).json({
        error: "Not found"
    })
});
