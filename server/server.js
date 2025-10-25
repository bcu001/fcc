import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import character from './routes/character.js';
import search from "./routes/search.js"
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
        origin: [
            "https://fcc-beige.vercel.app",
            "https://fcc-bcu001.vercel.app",
            "https://fcc-git-main-bcu001.vercel.app",
            "https://fcc-1i838v8bn-bcu001.vercel.app",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],

    })
);

// routes
app.use("/api/v1/characters", character)
app.use("/api/v1/search", search)


// endpoint used to quickly added dummyData to mongodb
app.get("/test", async (req, res) => {
    try {
        // const data = await fs.readFile("./dummyData/character5.json");
        // const charList = await JSON.parse(data);

        // for(let i=0; i<charList.length; i++){
        //     const temp = charList[i];
        //     const newc = new _character(temp); 
        //     newc.save();
        // }
        const allCharacters = await _character.find({}).select("name");
        res.json(allCharacters)
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