const assert = require('assert')
const User = require('../src/user')

describe('reading users out of the DB',()=>{
    let bob;
    beforeEach((done)=>{
        bob = new User({name:"bob"})
        bob.save()
            .then(()=>done())
    })
    it('find all users with name of bob',done =>{
        User.find({name:"bob"})
            .then((users)=>{
                assert(users[0]._id.toString() == bob._id.toString());
                done();
            })
    })

    it('find a user with a specific id',(done) =>{
        User.findOne({_id:bob._id})
            .then(user =>{
                assert(user.name === 'bob')
                done();
            })        
    })
})