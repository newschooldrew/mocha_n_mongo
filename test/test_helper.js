const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

before((done) =>{
    
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
    .once('open',()=> {done()})
    .once('error',(err)=>{
        console.warn('warning: ', err)
    })

})

    // runs before each test
beforeEach((done) =>{
    const {users, comments, blogposts} = mongoose.connection.collections
    users.drop(()=>{
        comments.drop(()=>{
            blogPosts.drop(()=>{
                done()
            })
        })
    })
})