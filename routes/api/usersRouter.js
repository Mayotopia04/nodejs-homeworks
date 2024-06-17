import express from "express";
import { controlWrapper } from "../../helpers/controlWrapper.js";
import { signupUser, loginUser, logoutUser, getCurrentUsers, updateUserSubscription, updateAvatar, verifyEmail, resendVerifyEmail } from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", controlWrapper(signupUser));
/* POST: http://localhost:3006/api/users/signup
{
    "email": "mayonaise414@gmail.com",
    "password": "mayopassword"
}
*/

router.post("/login", controlWrapper(loginUser));
/* POST:  http://localhost:3006/api/users/login
{
    "email": "mayonaise414@gmail.com",
    "password": "mayopassword"
}
*/

router.get("/logout", authenticateToken, controlWrapper(logoutUser));
/* GET:  http://localhost:3006/api/users/logout 
{
    "email": "scarlett@example.com",
    "password": "scarlett777pass"
}
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTVkM2U2NjJlM2YxYmE5MDc4ODY4NyIsImlhdCI6MTcxNzQxNzgxNCwiZXhwIjoxNzE3NTAwNjE0fQ.KIQ5-XgC8zo-tDccY1NTFrVUwjCK3z7xGl0YutAYbps

*/

router.get("/current", authenticateToken, controlWrapper(getCurrentUsers));
/* GET:  http://localhost:3006/api/users/current

headers/authorization/Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg3MzhlNjA5ZWZiYmEwNjlkYTkwNiIsImlhdCI6MTcxNzQyMzM1NywiZXhwIjoxNzE3NTA2MTU3fQ.RL8wCyGrzyFpl_4NnAaZrxtimLyJfQj7S7wyjtRYUdI

*/

router.patch("/", authenticateToken, controlWrapper(updateUserSubscription));
/* PATCH:  http://localhost:3006/api/users 
    body
    {
        "subscription": "business"
    }

    headers/authorization/Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTVkM2U2NjJlM2YxYmE5MDc4ODY4NyIsImlhdCI6MTcxNzQyMDkwMSwiZXhwIjoxNzE3NTAzNzAxfQ.1T0Tn5244rQG03Xn0lELnvovqvQZpo5fOCXjD4rJwjk
*/

router.patch("/avatars", authenticateToken, upload.single("avatar"), controlWrapper(updateAvatar));
/*
PATCH: http://localhost:3006/api/users/avatars
form-data
avatar, file: image
*/

router.get("/verify/:verificationToken", controlWrapper(verifyEmail));
/*
GET:  http://localhost:3006/api/users/verify/:verificationToken
*/

router.post("/verify", authenticateToken, controlWrapper(resendVerifyEmail));
/*
POST:  http://localhost:3006/api/users/verify
{
    "email": "iluxetravelandtours@gmail.com",
}
*/

export { router };

