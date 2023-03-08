import { Router } from "express";
import { loginUser, signupUser } from "../controllers/usersController";

const router: Router = Router();

// login route
router.post("/login", loginUser);

// sign up route
router.post("/signup", signupUser);

module.exports = router;
