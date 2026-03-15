import express from "express";
import {
  getCharacters,
  getChatList,
} from "../controllers/charactersController.js";

const router = express.Router();

router.get("/", getCharacters);
router.get("/:characterId", getChatList);

export default router;
