const assert = require('assert')
const User = require('../src/user')

describe('subdocuments',()=>{
    it('can create a subdoc',(done)=>{
        const post = new User({
            name:"bob",
            posts:[{
                    title:"post title"
                }]
            })
            post.save()
            .then(()=>{
                return User.findOne({name:"bob"})
            })
            .then(res =>{
                assert(res.posts[0].title === 'post title')
                done()
            })
        })
    it('can add subdocuments to an existing record',(done)=>{
        const bob = new User({
            name:"bob",
            posts:[]
            })
            bob.save()
            .then(()=>{
                return User.findOne({name:"bob"})
            })
            .then(user =>{
                user.posts.push({title:"new post"})
                return user.save()
            })
            .then(() =>{
                return User.findOne({name:"bob"})
            })
            .then(user =>{
                assert(user.posts[0].title == "new post")
                done()
            })
        })
    it('can remove an existing subdocument',(done)=>{
        const bob = new User({
            name:"bob",
            posts:[{title:"my post"}]
        })
        bob.save()
        .then(user =>{
            const post = user.posts[0];
            post.remove();
            return user.save()
        })
        .then( () => User.findOne({name:"bob"}))
        .then(user =>{
            assert(user.posts.length === 0)
            done()
            })
        })
    })