 // Blogs Service that will have functions to Insert, get, etc the Blog document into db
 module.exports = blogsService

 function blogsService(options) {
     let Blog

     if (!options.modelService) {
         throw new Error('Options.modelService is required')
     }

     Blog = options.modelService

     return {
         ping,
         getAll,
         getOne,
         insert,
         updateOne,
         removeOne,
         getBlogByTagId
     }

     function ping() {
         return new Promise(function(resolve, reject) { // is a method returns a promise.
             resolve('pong from blogs.services')
         })
     }
     // this sets up a default query conditon alloqing me to pass in querycondition or if not, find all blogs
     function getAll(queryCondition = {}) { // is a method returns a promise. same as calling db.blogs.find() in mongo shell
         return Blog.find(queryCondition)
     }

     function getOne(queryCondition) { // is a method returns a promise.
         return Blog.findOne(queryCondition)
     }

     function getBlogByTagId(queryCondition) { // is a method returns a promise.
         console.log(queryCondition)
         return Blog.find(queryCondition)
     }

     function insert(document) { // is a method returns a promise.
         let blog = new Blog(document)
         return blog.save()
     }

     function updateOne(queryCondition, doc) { // is a method returns a promise.
         return Blog.findOneAndUpdate(queryCondition, doc, {
             new: true
         })
     }

     function removeOne(queryCondition) { // is a method returns a promise.
         return Blog.findOneAndRemove(queryCondition)
     }
 }

 // notes:
 // Define any required fiellds in the scehma.
 // create functions in the service to perform crud operations to connect with db
 // controller acts as the enterypoint for the request, it calls the service and handles the promise that is returned
 // blogs route will create an instance of the router and direct requests to api to correct controller fucntions
 // Pipeline for request should be routes file -> controller -> service -> db
