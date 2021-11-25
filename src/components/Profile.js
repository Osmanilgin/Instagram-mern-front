import React, { useEffect, useState } from 'react'
import { Box,Grid, Image,Textarea, Flex,Divider,MenuItem,Menu,MenuList,MenuButton, Badge,Center ,Avatar, Input, Button, Modal,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader} from "@chakra-ui/react"
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import {getPosts} from "../actions/posts"
import { useLocation } from 'react-router'
import Cards from './Cards'
import ProfilePicUpload from './ProfilePicUpload'

function Profile() {
   const user = JSON.parse(localStorage.getItem('profile'))
   const dispatch = useDispatch()
   const location = useLocation();
   const posts = useSelector((state) => state.posts)
   
   useEffect(() => {
    
    dispatch(getPosts())
   }, [dispatch,location])

  const uploadPP = () => {
    
  }
  
     

    return (
        <>
           <Flex direction="column">
               <Flex h='20%' w='100%' justify='center'> <Flex w='40%' justify='flex-end' align='center' >
                 <ProfilePicUpload onClick={uploadPP} m='4' size='2xl'  src={user?.result.imageUrl}></ProfilePicUpload> </Flex> <Flex w='60%' direction='column'>
                  <Flex m='3'>{user?.result?.username}</Flex> <Flex m='3'>2 posts </Flex><Flex m='3'>{user?.result?.name}</Flex> </Flex> 
                </Flex> <CreatePost/> <Divider/>
            
             <Flex> <Grid mx={[,,"0","20%"]} mt="3" templateColumns="repeat(3, 1fr)" gap={[.5,1,1,6]}>
              {posts.map((post) => {  
                return (post.creator === user?.result?._id ?
                  <Cards key={post._id}
                         post={post} 
                        
                  /> : null
                )
              })}
           </Grid> </Flex>    
           </Flex> 
        </>
    )
}

export default Profile;
