import React, { useEffect, useState } from 'react'
import {Input, InputGroup,Box,MenuItem,Menu,MenuList,MenuButton, Flex, InputLeftElement,Heading, Link,Button,Avatar } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import { Link as ReachLink, useHistory, useLocation  } from "react-router-dom"
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import {CgProfile} from "react-icons/cg"
import {FiLogOut, FiSettings} from "react-icons/fi"
import {useDispatch} from "react-redux"
import * as actionType from '../constants/actionTypes';
import decode from "jwt-decode"

function Navbar() {
 
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
     const location = useLocation();
     const history = useHistory();
     const dispatch = useDispatch()
      
     const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      history.push('/');
  
      setUser(null);
    };
  

     useEffect(() => {
      const token = user?.token;

        if(token) {
          const decodedToken = decode(token)
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

      setUser(JSON.parse(localStorage.getItem('profile')))
     }, [location])

    return (
     
        <Flex p="4" borderBottom="1px" borderBottomColor="rgba(218,218,218,.7)" justify={{base:"space-between",lg:"space-evenly",}} >
        <Box p="2">
          <Heading size="md" as={ReachLink} to="/">Instagram</Heading>
          
        </Box>
                <InputGroup display={["none","none","block"]} size="md" w="20%"  >
            <InputLeftElement 
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
            />
            <Input  focusBorderColor="teal.400" type="search" placeholder="Search" />
        </InputGroup>
        <Box>
                {user?.result ? (<Flex><Menu>
        <MenuButton  cursor='pointer' as={Box} >
        <Avatar src={user?.result.imageUrl} /> 
        </MenuButton>
        <MenuList>
          <MenuItem as={ReachLink} to={`/profile/${user?.result?.username}`}><CgProfile/>&emsp;Profile</MenuItem>
          <MenuItem ><FiSettings/>&emsp;Settings</MenuItem>
          <MenuItem onClick={logout}><FiLogOut/>&emsp;Logout</MenuItem>       
        </MenuList>
</Menu> </Flex>)
           : (<Flex><Login/> <SignUp/></Flex>)}
         
        </Box>
      </Flex>

    )
}

export default Navbar
