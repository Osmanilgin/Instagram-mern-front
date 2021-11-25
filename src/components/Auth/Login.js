import React, { useState } from 'react'
import {Input, InputGroup,InputRightElement,Box, Flex,Modal,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader,InputLeftElement,Heading, Link,Button } from "@chakra-ui/react"
import {login} from '../../actions/auth'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Login() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [formData, setFormData] = useState({name:'',email:'',password:'',username:''})
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleSubmit = (e) =>{
        e.preventDefault()
                console.log(formData)
        dispatch(login(formData, history))        
    }
    return (
        <div>
               <Button  onClick={onOpen} colorScheme="teal" mr="4" size="sm"> Log in </Button>                  
             <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              
                
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Text fontWeight="medium" mt="1rem" >Email</Text>
                    <Input type="email" onChange={e => setFormData({...formData, email: e.target.value})} value={formData.email}/>
                    <Text fontWeight="medium" mt="1rem" >Password</Text>
                    <InputGroup size="md">
                    <Input type={show ? "text" : "password"} onChange={e => setFormData({...formData, password: e.target.value})}
                    value={formData.password} />
                    <InputRightElement width="4.5rem"><Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}</Button> </InputRightElement> </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Log In
                    </Button>
                    <Button onClick={onClose} variant="ghost">Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
        </div>
    )
}

export default Login
