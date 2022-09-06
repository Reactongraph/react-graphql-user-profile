import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useMutation} from '@apollo/client' 
import {LOGIN_USER} from '../gploperations/mutations'

const Login = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({})
    const [signinUser, {data, loading, error}] = useMutation(LOGIN_USER)

    if(loading) return <h1>Loading</h1>
    if(data) {
        localStorage.setItem("token",data.user.token)
        navigate('/')
    }
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData)
        signinUser({
            variables:{
                UserSignin:formData
            }
        })
    }

  return (
    <div className="container my-container">
            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="password"
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
                 />
                 <Link to="/signup"><p>Dont have an account ?</p></Link> 
                 <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
  )
}

export default Login