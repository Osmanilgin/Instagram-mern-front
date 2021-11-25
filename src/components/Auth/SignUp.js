import React, { useState } from 'react'
import {Input, Box, Flex,Modal,ModalBody,ModalFooter,useDisclosure,InputGroup,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader,InputLeftElement,InputRightElement,Heading, Link,Button } from "@chakra-ui/react"
import {signup} from '../../actions/auth'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SignUp() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [formData, setFormData] = useState({name:'',email:'',password:'',username:''})
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) =>{
        e.preventDefault()
                console.log(formData)
            dispatch(signup(formData, history))    
    }
    return (
        <>
             
                 <Button  onClick={onOpen} variant="ghost"colorScheme="teal" mr="4" size="sm"> Sign Up </Button>                  
             <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Up</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Text fontWeight="medium" mt="1rem" >Email</Text>
                    <Input type="email" onChange={e => setFormData({...formData, email: e.target.value})} value={formData.email}/>
                    <Text fontWeight="medium" mt="1rem" >Full Name</Text>
                    <Input type="text" onChange={e => setFormData({...formData, name: e.target.value})} value={formData.name} />
                    <Text fontWeight="medium" mt="1rem" >Username</Text>
                    <Input type="text" onChange={e => setFormData({...formData, username: e.target.value})} value={formData.username} />
                    <Text fontWeight="medium" mt="1rem" >Password</Text>
                    <InputGroup size="md">
      <Input type={show ? "text" : "password"} onChange={e => setFormData({...formData, password: e.target.value})}
       value={formData.password} />
      <InputRightElement width="4.5rem"><Button h="1.75rem" size="sm" onClick={handleClick}>
           {show ? "Hide" : "Show"}</Button> </InputRightElement> </InputGroup>
             </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit} >
                        Sign Up
                    </Button>
                    <Button onClick={onClose} variant="ghost">Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
           
        </>
    )
}

export default SignUp
