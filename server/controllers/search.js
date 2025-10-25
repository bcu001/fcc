import character from "../models/character.js";

export const getSearch = async (req, res) => {
    try {
        const { query, limit } = req.query;
        if (!query) return res.status(404).json({ message: "Search bar is empty" });

        const searchResults = await character.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { class: { $regex: query, $options: "i" } },
                { race: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ],
        }).limit(limit);

        if (searchResults.length === 0) return res.status(404).json({ message: "No character found" })
        else res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: "Internal server error fetching data from db" });
        console.error("Error in getSearch:", error.message);
    }
}