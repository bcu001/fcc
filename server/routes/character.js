import express from 'express'
import { postNewCharacter, getAllCharacters, getCharacter, deleteCharacter, getRandomChar } from '../controllers/character.js';

const router = express.Router();

router.get("/", getAllCharacters);
router.get("/random", getRandomChar);
router.post("/", postNewCharacter);
router.delete("/:id", deleteCharacter);
router.get("/:id", getCharacter);

export default router;