const assert = require('assert')
const User = require('../src/user')

describe('virutal types',()=>{
    it('postcount returns the number of posts', done =>{
        const bob = new User({
            name:"bob",
            posts:[{title:"post title"}]
        })
        bob.save()
            .then(() =>{
                return User.findOne({name:"bob"})
            })
            .then(user =>{
                assert(bob.postCount === 1)
                done()
            })
    })
})