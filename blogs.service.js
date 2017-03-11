
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
         return new Promise(function(resolve, reject) {
             resolve('pong from blogs.services')
         })
     }
 
     function getAll(queryCondition = {}) {
         return Blog.find(queryCondition)
     }

     function getOne(queryCondition) {
         return Blog.findOne(queryCondition)
     }

     function getBlogByTagId(queryCondition) {
         console.log(queryCondition)
         return Blog.find(queryCondition)
     }

     function insert(document) {
         let blog = new Blog(document)
         return blog.save()
     }

     function updateOne(queryCondition, doc) {
         return Blog.findOneAndUpdate(queryCondition, doc, {
             new: true
         })
     }

     function removeOne(queryCondition) {
         return Blog.findOneAndRemove(queryCondition)
     }
 }
