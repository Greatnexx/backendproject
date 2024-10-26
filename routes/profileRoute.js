import express from "express"
import { protect, user } from "../middlewares/auth.js"
import { updateProfile, viewProfile,deleteProfile } from "../controllers/profileController.js"

const router = express.Router();

router.get("/", protect, user, viewProfile)
router.put("/", protect, user, updateProfile)
router.delete("/", protect, user, deleteProfile)

export default router