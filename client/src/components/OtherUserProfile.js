import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_USER_BY_ID} from '../gploperations/queries'
import {useParams} from 'react-router-dom'

const OtherUserProfile = () => {
    const {userid} = useParams
    console.log('userid',userid);
    const {loading,error,data} = useQuery(GET_USER_BY_ID,{
        variables:{userid}
    })
    console.log('data',data);
    if(loading) return <h2>Profile is loading</h2>
    if(error) console.log(error)
  return (
    <div className="container my-container">
            <div className="center-align">
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data?.myprofile?.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data.myprofile.firstName} {data.myprofile.lastName}</h5>
                <h6>{data.myprofile.email}</h6>
            </div>
             <h3>Your quotes</h3>
            {
                data.myprofile.quotes.map((item) => {
                    return (
                        <blockquote>
                            <h6>{item.name}</h6>
                        </blockquote>
                    )
                })
            }
        </div>
  )
}

export default OtherUserProfile