import express from "express";
import { createUser, deleteUserById, getAllUsers, getCurrentUserProfile, getUserById, loginUser, logoutCurrentUser, updateCurrentUserProfile, updateUserById } from "../controllers/userController.js";
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(createUser).get(authenticate, authorizeAdmin,getAllUsers);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);


//Admin
router.route("/:id")
.delete(authenticate, authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserById);
export default router;