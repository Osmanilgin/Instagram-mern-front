import React, { useState } from 'react'
import { Box, Image,Textarea,Spacer, Flex,Divider,MenuItem,Menu,MenuList,MenuButton, Badge,Center ,Avatar, Input, Button, Modal,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader} from "@chakra-ui/react"
import {useSelector,useDispatch} from "react-redux"
import {HiOutlineDotsHorizontal} from "react-icons/hi"
import {updatePost, deletePost, likePost} from "../actions/posts"
import {BsHeart,BsHeartFill} from "react-icons/bs"
import {GoComment} from "react-icons/go"
import {IoPaperPlaneOutline} from "react-icons/io5"
function LoginHome({post,caption}) {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const [currentId, setCurrentId] = useState(0)
    const [postData, setPostData] = useState ({caption:caption})

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
  
      const Submit = async (e) => {
  
        if(currentId) {
          dispatch(updatePost({currentId, ...postData, username: user?.result?.username}))
        }
           setCurrentId('');
      };
    return (
        <>
    <Flex direction="row">
        <Flex justify="flex-end" w='60%'> <Box   border='1px' borderRadius='4px' borderColor="gray.300" my='5'  w='70%'> 
        <Flex><Avatar size='sm' m='5'src={user?.result.imageUrl} /> 
        <Text fontSize='15px' fontWeight='medium' my="6">{post.username}</Text>
        <Spacer />
        <Menu>
        <MenuButton m='6' cursor='pointer' as={Box} >
        <HiOutlineDotsHorizontal style={{fontSize:'20px'}}/>
        </MenuButton>
        <MenuList>
            {(user?.result?._id === post?.creator) && 
            (<MenuItem onClick={() => setCurrentId(post._id)} >Edit</MenuItem>)}
            {(user?.result?._id === post?.creator) && 
            ( <MenuItem onClick={() => dispatch(deletePost(post._id))}> Delete</MenuItem>)}
            <MenuItem >Copy Link</MenuItem>
            <MenuItem >Go to post</MenuItem>
            <MenuItem  >Cancel</MenuItem>
        </MenuList>
        </Menu></Flex>
        <Divider/>     
        <Image objectFit="cover"  src={post.selectedFile}/> 
        <Flex>  <Text m='3' fontWeight='medium'><Likes/></Text> </Flex>
        <Flex  m='2'>{post.caption ? (<><Text fontWeight='medium' mx="3">{post.username}</Text>
        <Text  fontWeight='light'>{post.caption}</Text> </>) : null}</Flex>
        {currentId ? (<><Box><Textarea type="textarea" resize='none' 
        value={postData.caption}
         onChange={(e) => setPostData({...postData, caption: e.target.value})}
         /> <Button  colorScheme="teal" mr={3} onClick={Submit} > Share </Button></Box></>) 
          :  null}
        <Flex justify='flex-start' align='center'><Button variant="ghost" _focus={{boxShadow: "none"}} _hover={{color:'gray'}} 
        disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
          {post.likes.find((like) => like === user?.result?._id) ? <BsHeartFill color='#E23030' fontSize='25px'/> : <BsHeart  fontSize='25px'/>} </Button>
         <Box ><GoComment fontSize='25px'/></Box> 
         <Box mx='4' ><IoPaperPlaneOutline fontSize='25px'/></Box>  </Flex>
         </Box> 
        </Flex>
       
       
     <Flex></Flex> 
    </Flex>
        </>
    )
}

export default LoginHome
/*

          
          
          
          
       */