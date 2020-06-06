const assert = require('assert')
const User = require('../src/user')

// 1. string that describes the test
// 2. function
describe('creating records',() =>{
    it('saves a user',(done)=>{
        const bob = new User({ name:"bob" })
        bob.save()
            .then(()=>{
                assert(!bob.isNew)
                done()
            })
    }) 
});
