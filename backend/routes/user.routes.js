import { Router } from "express";
import { getRandomBlogs, getUser, handleLogin, handleRegister, updateBlog } from "../controllers/controllers.js";

const router=Router();

router.route('/login')
.post(handleLogin)

router.route('/register')
.post(handleRegister)

router.route('/add')
.post(updateBlog)

router.route('/get')
.post(getUser)

router.route('/random')
.post(getRandomBlogs)

export default router;
