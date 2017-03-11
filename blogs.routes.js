// Blogs route file creates an instance of the router and direct requests to /api/blogs to the correct blogs controller functions
const router = require('express').Router()
const blogsController = require('../controllers/blogs.controller')() // we require blogs.controller (blogsController) and invoke it.we get the object that gives us access to all of the function inside of our closure

const BlogExpressValidation = require('../middleware/BlogExpressValidation')
const {cache} = require('../../config/apicache')

module.exports = router

// we have hooked in middleware function in both the post and put api routes. These middleware functions sit as the parameters before the controller functions.  By doing this, we are telling express that the request needs to pass through these functions before continuing on to the controllers.
// api routes ===========================================================
router.get('/ping', blogsController.ping)
router.get('/', cache.middleware(), blogsController.getAll)
router.get('/:id', blogsController.getOneById)
router.get('/tags/:tagid', blogsController.getBlogByTagId)
router.post('/', BlogExpressValidation.validateBlogParams, blogsController.insert)
router.put('/:id', BlogExpressValidation.validateBlogParams, blogsController.updateById)
router.delete('/:id', blogsController.removeById)

// notes:
// Define any required fiellds in the scehma.
// create functions in the service to perform crud operations to connect with db
// controller acts as the enterypoint for the request, it calls the service and handles the promise that is returned
// blogs route will create an instance of the router and direct requests to api to correct controller fucntions
// Pipeline for request should be routes file -> controller -> service -> db
// insert is POST & update is PUT
