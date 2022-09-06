import {users, quotes} from './fakedb.js'
import {randomBytes} from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from './config.js'

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

const resolvers = {
    Query:{
        users:async () => await User.find({}),
        user:async (_,{_id}) =>await User.findOne({_id}),
        quotes:async () => await Quote.find({}).populate("by","_id, firstName"),
        quote:async (_,{by}) => await Quote.find({by}),
        myprofile:async (_,args,{userId})=> {
            if(!userId) throw new Error("you have to logedin")
            return await User.findOne({_id:userId})
        }
    },
    User: {
        quotes:async(ur) => await Quote.find({by:ur._id})
    },
    Mutation:{
        // signUpUser:async(_,{userNew})=> {
        //     console.log('hello',userNew);
        //     const _id = randomBytes(5).toString("hex")
        //     users.push({
        //         _id,
        //         ...userNew
        //     })
        //     return users.find(user=>user._id == _id)
        //     const user = await User.findOne({email:userNew.email})
        //     if(user) {
        //         throw new Error("User already exists with that email")
        //     }
        //     const hassedPass = await bcrypt.hash(userNew.password,12)
        //     console.log('hassedPass',hassedPass);
        //     const newUser = new User({
        //         ...userNew,
        //         password:hassedPass
        //     })
        //     console.log('newUser',newUser);
        //     return await newUser.save()
        // }
        signUpUser:async (_,{userNew})=>{
            console.log('userNew',userNew?.email)
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists with that email")
            }
           const hashedPassword =  await bcrypt.hash(userNew.password,12)
  
          const newUser =  new User({
               ...userNew,
               password:hashedPassword
           })
          return await newUser.save()
          },
          signinUser:async (_,{UserSignin})=>{
            const user = await User.findOne({email:UserSignin.email})
            if(!user) {
                throw new Error("User doesnt exists with that email")
            }
            const doMatch = await bcrypt.compare(UserSignin.password,user.password)
            if(!doMatch) {
                throw new Error("email or password is not valid")
            }
              const token = jwt.sign({userId:user._id},JWT_SECRET)
              return {token}
          },
          createQuote:async(_,{name},{userId})=>{
            console.log(name,userId)
            if(!userId) throw new Error("You must be logged in")
            const newQuote = new Quote({
                name,
                by:userId
            })
            console.log('newQuote',newQuote);
           await newQuote.save()
           return "Quote saved successfully"
          }
    }
}

export default resolvers;