import React, { useEffect } from 'react'
import { Grid} from "@chakra-ui/react"
import Cards from './Cards'
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import {getPosts} from "../actions/posts"
import LoginHome from './LoginHome'
import { useLocation } from 'react-router-dom'

function HomePage({setCurrentId}) {
    const posts = useSelector((state) => state.posts)
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const location = useLocation();

  useEffect(() => {
    
   dispatch(getPosts())
  }, [dispatch,location])

      
        

    return (
        <>
    {!user?.result?.name ? ( <>   <Grid mx={[,,"0","20%"]} mt="3" templateColumns="repeat(3, 1fr)" gap={[.5,1,1,6]}>
              {posts.map((post) => {
                return (
                  <Cards key={post._id} setCurrentId={setCurrentId}
                         post={post}
                  />
                )
              })}
           </Grid> 
   
           </> ) : (<>{posts.map((post) => {
                return (
                  <LoginHome key={post._id} setCurrentId={setCurrentId} 
                         post={post}
                  />
                )
              })} </>)}
     
           </>
           )
           
    
}

export default HomePage
