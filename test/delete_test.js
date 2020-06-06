const assert = require('assert')
const User = require('../src/user')

describe('delete a user',()=>{
    let bob;

    beforeEach((done)=>{
        bob = new User({name:'bob'})
        bob.save()
            .then(()=>done())
    })

    it('model instance remove',(done) =>{
        bob.remove()
            .then(()=>{
                User.findOne({name:"bob"})
            })
            .then(res =>{
                assert(!res)
                done()
            })
    })

    it('class method remove',(done)=>{
        User.remove({name:"bob"})
            .then(() =>{
                User.findOne({name:"bob"})
            })
            .then((user) =>{
                assert(!user)
                done()
            })
    })

    it('class method find and remove',(done)=>{
        User.findOneAndRemove({name:"bob"})
            .then(() =>{
                User.findOne({name:"bob"})                
            })
            .then(user =>{
                assert(!user)
                done()
            })
    })

    it('class method find by ID and remove',(done)=>{
        User.findByIdAndRemove(bob._id)
            .then(() =>{
                User.findOne({_id:bob._id})
            })
            .then(user =>{
                assert(!user)
                done()
            })
    })
})