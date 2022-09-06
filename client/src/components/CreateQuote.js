import React,{useState} from 'react'
import {useMutation} from '@apollo/client'
import {CREATE_QUOTE} from '../gploperations/mutations'
import {GET_ALL_QUOTES} from '../gploperations/queries'

const CreateQuote = () => {
    const [quote,setQuote] = useState("")
    const [createQuote,{loading, error, data}] = useMutation(CREATE_QUOTE,{
      refetchQueries:[
        GET_ALL_QUOTES,
        'getAllQuotes',
        'getMyProfile'
      ]
    })

    if (loading) {
      return <h1>Loading</h1>
    }
    if(error) {
      console.log(error.message)
    }
    if(data) {
      console.log(data)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        createQuote({
          variables:{
            name:quote
          }
        })
    }
  return (
    <div className="container my-container">
      {
        error &&
        <div className='red card-panel'>{error.message}</div>
      }
      {
        data &&
        <div className='green card-panel'>
          {data.quote}
        </div>
      }
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={quote}
            onChange={e=>setQuote(e.target.value)}
            placeholder="write your quote here"
            />
         <button className="btn green">create</button>
    </form>
    
</div>
  )
}

export default CreateQuote