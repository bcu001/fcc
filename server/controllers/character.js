import character from "../models/character.js";

export const getRandomChar = async (req, res) => {
    // Get random character from db
    try {
        const randomChar = await character.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(randomChar[0]);
    } catch (error) {
        console.error("Error in getRandomChar:", error.message);
        res.status(500).json({ message: `Internal server error reading or parsing data` });
    }
}

export const getAllCharacters = async (req, res) => {
    // get info all the character from db

    try {
        let query = character.find({});

        if (req.query.limit) {
            const limit = parseInt(req.query.limit, 10);
            if (isNaN(limit) || limit <= 0) {
                return res.status(400).json({ message: "Invalid 'limit' parameter" });
            }
            query = query.limit(limit)
        }
        const allCharacters = await query.exec();
        res.status(200).send(allCharacters);
    } catch (error) {
        res.status(500).json({ message: "Internal server error fetching data from db" });
        console.error("Error in getAllCharacters:", error.message);
    }
}

export const getCharacter = async (req, res) => {
    // get info of one character using id from db
    const targetId = req.params.id;
    try {
        const foundChar = await character.findById(targetId);
        if (foundChar) res.status(200).json(foundChar);
        else res.status(404).json({ message: `Character with ID ${targetId} not found` });
    } catch (err) {
        console.error("Error in getCharacter:", err.message);
        res.status(500).json({ message: `Character with ID ${targetId} not found`  });
    }
}

export const postNewCharacter = async (req, res) => {
    // create a new model of character save it into db
    const _char = req.body;
    if (!_char) return res.status(400).json({ message: "Request body is empty..." });
    try {
        const newChar = new character(_char);
        await newChar.save();
        res.status(200).send("Data saved in db succesusfully!");
    } catch (error) {
        console.error("Error in postNewCharacter:", error.message);
        res.status(500).json({ message: "Internal server error handling" });
    }
}

export const deleteCharacter = async (req, res) => {
    // delete one character using id from db
    const targetId = req.params.id;
    try {
        const result = await character.deleteOne({ "_id": targetId });
        if (result.deletedCount === 1) res.status(200).json({
            message: `Character with ID ${targetId} successfully deleted`,
            deletedCount: 1
        });
        else res.status(404).json({ message: `Character with ID ${targetId} not found` });
    } catch (error) {
        console.error("Error in deleteCharacter:", error.message);
        res.status(500).json({ message: "Internal server error handling data" });
    }
}