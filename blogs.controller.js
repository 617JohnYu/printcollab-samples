
const responses = require('../models/responses')
const path = require('path')
const apiPrefix = '/api/blogs'
const blogModel = require('../models/blog')
const blogService = require('../services/blogs.service')({
    modelService: blogModel
})

module.exports = blogsController

function blogsController() {
    return {
        ping,
        getAll,
        getOneById,
        insert,
        updateById,
        removeById,
        getBlogByTagId
    }
    
    function getAll(req, res) { 
        blogService.getAll()
            .then((blogs) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = blogs
                res.json(responseModel)
            }).catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    // get one by id
    function getOneById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }

        blogService.getOne(queryCondition)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

   // get BLOG by tag id
    function getBlogByTagId(req, res) {
        let queryCondition = {
            tags: {
                $all: [
                    [req.params.tagid]
                ]
            }
        }

        blogService.getAll(queryCondition)
            .then((tags) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = tags
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    // post/insert
    function insert(req, res) {
        blogService.insert(req.body)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.status(201)
                    .location(path.join(apiPrefix, blog._id.toString()))
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }
    // put/update
    function updateById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        blogService.updateOne(queryCondition, req.body)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                res.status(204)
                    .json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err.stack))
            })
    }

    // remove by id
    function removeById(req, res) {
        let queryCondition = {
            _id: req.params.id
        }
        blogService.removeOne(queryCondition)
            .then((blog) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = blog
                res.json(responseModel)
            })
            .catch((err) => {
                return res.status(500).send(new responses.ErrorResponse(err))
            })
    }

    function ping(req, res) {
        blogService.ping()
            .then((data) => {
                const responseModel = new responses.ItemResponse()
                responseModel.item = data
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
