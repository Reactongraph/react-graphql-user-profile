import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../gploperations/queries';
import {Link} from 'react-router-dom'

const Home = () => {
    const {loading,error,data} = useQuery(GET_ALL_QUOTES)
    console.log('dataquotes',data?.quotes)

    if(loading) return <h1>Loading</h1>
   if(error){
       console.log(error.message)
   }
   if(data.quotes.length == 0){
    return  <h2>No Quotes available</h2>
   }

  return (
    <div className="container">
             {
                data.quotes.map(quote=>{
                    return(
                   <blockquote>
                        <h6>{quote?.name}</h6>
                        <Link to={`/profile/${quote?.by?._id}`}><p className="right-align">~{quote?.by?.firstName}</p></Link>
                    </blockquote>
                    )
                })
            }
        </div>
    )
}

export default Home