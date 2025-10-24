import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    stats: {
        strength: Number,
        agility: Number,
        intelligence: Number,
        luck: Number
    },
    level: { type: Number, default: 1, min: 1 },
    status: { type: String, default: "alive", enum: ["alive", "dead"] },
    "special ability": { type: String, default: "none" },
    description: { type: String, default: "none" },
    imageURL: { type: String , default: "/defaultAvatar.jpg"},
}, {
    timestamps: true,
});

const character = mongoose.model("Character", characterSchema);
export default character;