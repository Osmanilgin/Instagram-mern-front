import React, { useState } from 'react'
import { Box, Image,Textarea, Flex,Divider,MenuItem,Menu,MenuList,MenuButton, Badge,Center ,Avatar, Input, Button, Modal,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader} from "@chakra-ui/react"
import {HiOutlineDotsHorizontal} from "react-icons/hi"
import {updatePost, deletePost, likePost} from "../actions/posts"
import {useDispatch} from "react-redux"
import moment from 'moment';
import {BsHeart,BsHeartFill} from "react-icons/bs"
import {GoComment} from "react-icons/go"
import {IoPaperPlaneOutline} from "react-icons/io5"

function Cards({post,caption}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()
    const [postData, setPostData] = useState ({caption:caption})
    const user = JSON.parse(localStorage.getItem('profile'))

  const Submit = async () => {
  
    if(currentId) {
      dispatch(updatePost({currentId, ...postData, username: user?.result?.username}))
    }
       setCurrentId('');
  };
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id)
        ? (
          <>{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return null;
  };
    

    return (
        <>
        
            <Box  >
              <Image cursor='pointer' onClick={onOpen}  objectFit="cover" src={post.selectedFile} />
             </Box>  
               
        <Modal  size='4xl' isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

            <ModalContent  >
    <Flex bg='white'direction={{base:'column', md:'row'}}> 

      <Flex h='100%' w={{base:'', md:'70%'}}><Image objectFit="cover"  src={post.selectedFile} /></Flex>
                
    <Flex w='40%' direction='column'>

            <Flex my='2'> <Avatar m='2'  src={user?.result.imageUrl} /> 
        <Text m="3">   {post.username}</Text> <Text m="3" fontWeight='medium' color='blue.400'> Follow</Text>
        <Menu>
  <MenuButton m='4' cursor='pointer' as={Box} >
  <HiOutlineDotsHorizontal style={{fontSize:'20px'}}/>
  </MenuButton>
  <MenuList>
     {(user?.result?._id === post?.creator) && 
     (<MenuItem onClick={() => setCurrentId(post._id)} >Edit</MenuItem>)}
     {(user?.result?._id === post?.creator) && 
     (<MenuItem onClick={() => dispatch(deletePost(post._id))}> Delete</MenuItem>)}
      <MenuItem >Copy Link</MenuItem>
      <MenuItem >Go to post</MenuItem>
      <MenuItem  >Cancel</MenuItem>
  </MenuList>
</Menu> </Flex> 
        <Divider/>
       
      <Flex h='65%' mt='4'>{post.caption ? (<><Avatar display={{base:'none',md:'block'}} m='2'
       src={user?.result.imageUrl} /> 
        <Text display={{base:'none',md:'block'}} m="3">{post.username}</Text>
        <Text m='3' fontWeight='light'>{post.caption}</Text> </>) : null}
        {currentId ? (<><Box><Textarea type="textarea" resize='none' 
        value={postData.caption}
         onChange={(e) => setPostData({...postData, caption: e.target.value})}
         /> <Button  colorScheme="teal" mr={3} onClick={Submit} > Share </Button></Box></>) 
          :  null}
     </Flex> <Box m='3'>  {moment(post.createdAt).fromNow()}</Box>
     <Flex  direction='column' h='20%'> <Divider/> 
      <Flex>  <Text m='3' fontWeight='medium'><Likes/></Text> </Flex>  <Flex fontSize='25'>
     <Flex justify='flex-start' align='center'><Button variant="ghost" _focus={{boxShadow: "none"}} _hover={{color:'gray'}} 
        disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
          {post.likes.find((like) => like === user?.result?._id) ? <BsHeartFill color='#E23030' fontSize='25px'/> : <BsHeart  fontSize='25px'/>} </Button>
         <Box ><GoComment fontSize='25px'/></Box> 
         <Box mx='4' ><IoPaperPlaneOutline fontSize='25px'/></Box>  </Flex>
  </Flex> 
     
     </Flex>
    </Flex>  
        
                      
 </Flex>
 
   </ModalContent>           
  </Modal>
                 
             </>
  )
}

export default Cards
