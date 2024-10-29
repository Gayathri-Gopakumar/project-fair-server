const express=require('express')
const userController=require('../controllers/userController')
const router=new express.Router()
const projectController=require('../controllers/projectController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')

// register:post req to http://localhost:3000/register
router.post('/register',userController.registerController)

// login:post req to http://localhost:3000/login
router.post('/login',userController.loginController)

// add project : post req to http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.addProjectController)

// home projects : get req to http://localhost:3000/home-projects
router.get('/home-projects',projectController.getHomeProjectsController)

// all projects : get req to http://localhost:3000/all-projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

// user projects : get req to http://localhost:3000/user-projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

// remove project : delete req to http://localhost:3000/pid/remove-project
router.delete('/:pid/remove-project',jwtMiddleware,projectController.removeProjectsController)

// edit project : put req to http://localhost:3000/pid/edit-project
router.put('/:pId/edit-project',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.editProjectController)

// edit profile : put to http://localhost:3000/user/edit
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editProfileController)



// export default 
module.exports=router