const assert = require('assert')
const User = require('../src/user')

describe('updating records',()=>{
    let bob;

    beforeEach((done)=>{
        bob = new User({name:"bob",likes:0})
        bob.save()
            .then(() => done())
    })

    function assertName(operation,done){
        operation
        .then(() => User.find({}))
        .then((users) =>{
            assert(users.length > 0)
            assert(users[0].name == "joe")
            done()
        })
    }

    it('instance type using set and save',done =>{
        bob.set('name','joe')
        assertName(bob.save(),done)
    })

    it('model instance can update',(done) =>{
        assertName(bob.update({name:'joe'}),done)
    })

    it('model class can update',(done)=>{
        assertName(User.update({name:"bob"},{name:"joe"}),done)
    })

    it('model class can update one record',(done)=>{
        assertName(
            User.findOneAndUpdate({name:"bob"},{name:"joe"}),done
            )
    })

    it('model class can find a record with an ID an update',(done)=>{
        assertName(
            User.findByIdAndUpdate(bob._id,{name:"joe"}),done)
    })

    it('user can have their postcount incremented by 1', () =>{
        User.update({name:"bob"},{$inc:{likes: 1}})
            .then(User.find({name:"bob"}))
            .then(user=>{
                assert(user.likes === 1)
            })
    })

})