import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import character from './routes/character.js';
import _character from "./models/character.js"
import fs from 'fs/promises'
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

// routes
app.use("/api/v1/characters", character) 


// endpoint used to quickly added dummyData to mongodb
app.get("/test", async (req, res) => {
    try {
        // const data = await fs.readFile("./dummyData/character.json");
        // const charList = await JSON.parse(data);

        // for(let i=0; i<charList.length; i++){
        //     const temp = charList[i];
        //     const newc = new _character(temp);
        //     newc.save();
        // }
        res.send("Test endpoint")
    } catch (error) {
        res.json({ message: error.message });
    }

})

app.get('/', (req, res) => {
    res.json({ message: "Fantasy-character-creater api" })
})

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
})