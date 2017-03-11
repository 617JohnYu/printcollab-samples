const router = require('express').Router()
const blogsController = require('../controllers/blogs.controller')()

const BlogExpressValidation = require('../middleware/BlogExpressValidation')
const {cache} = require('../../config/apicache')

module.exports = router

router.get('/ping', blogsController.ping)
router.get('/', cache.middleware(), blogsController.getAll)
router.get('/:id', blogsController.getOneById)
router.get('/tags/:tagid', blogsController.getBlogByTagId)
router.post('/', BlogExpressValidation.validateBlogParams, blogsController.insert)
router.put('/:id', BlogExpressValidation.validateBlogParams, blogsController.updateById)
router.delete('/:id', blogsController.removeById)
