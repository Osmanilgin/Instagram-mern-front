import React, { useEffect, useState } from 'react'
import { Container, Box , Flex, Textarea ,Grid,GridItem,Input, Modal, Button,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader} from "@chakra-ui/react"
import FileBase64 from  'react-file-base64'
import {useDispatch} from "react-redux"
import {createPost} from "../actions/posts"
import {useSelector} from "react-redux"

function CreatePost({currentId}) {
    const [postData, setPostData] = useState ({
        caption:'', selectedFile:'',
    })
    const user = JSON.parse(localStorage.getItem('profile'))
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)
   
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        dispatch(createPost({...postData, username: user?.result?.username}))
            onClose()
      };

      useEffect(() => {
        if(post) setPostData(post)
               }, [post])
               

    return (
        <>
        {user?.result?.username ?  (<>
         <Flex justify='center'> <Button mb='3' color='teal.500' w='10%' onClick={onOpen}>Create a Post</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
                <ModalContent >
                    <ModalHeader as="center" >Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Text fontWeight='medium' >Write a caption </Text>
                     <Textarea  type="textarea" resize='none' value={postData.caption} onChange={(e) => setPostData({...postData, caption: e.target.value})}/>
                  <Box mt='7'><FileBase64  type="file" multiple={false}  onDone={({base64}) => setPostData({...postData, selectedFile: base64})} /></Box> 
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSubmit} > Share </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal></Flex></>) : null}
              
        </>
    )
}

export default CreatePost
