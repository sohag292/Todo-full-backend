const express = require('express');
const UserProfileController = require("../controllers/UserProfileController")
const TodoListController = require("../controllers/TodoListController")
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware")

const router = express.Router();

//Login Registration
router.post("/CreateProfile", UserProfileController.CreateProfile)
router.post("/UserLogin", UserProfileController.UserLogin)

//User Profile
router.get("/SelectProfile",AuthVerifyMiddleware, UserProfileController.SelectProfile)
router.post("/UpdateProfile",AuthVerifyMiddleware, UserProfileController.UpdateProfile)

// Todo List
router.post("/CreateTodo",AuthVerifyMiddleware, TodoListController.CreateTodo)
router.get("/SeleteTodo",AuthVerifyMiddleware, TodoListController.SeleteTodo)
router.post("/UpdateTodo",AuthVerifyMiddleware, TodoListController.UpdateTodo)
router.post("/UpdateStatusTodo",AuthVerifyMiddleware, TodoListController.UpdateStatusTodo)
router.post("/RemoveTodo",AuthVerifyMiddleware, TodoListController.RemoveTodo)
router.post("/SeleteTodoByStatus",AuthVerifyMiddleware, TodoListController.SeleteTodoByStatus)
router.post("/SeleteTodoDate",AuthVerifyMiddleware, TodoListController.SeleteTodoDate)
router.post("/Hello",AuthVerifyMiddleware, (req,res)=>{
    res.send("hello")
})

module.exports= router;
