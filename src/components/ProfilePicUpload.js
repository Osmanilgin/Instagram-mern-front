import  { useState } from 'react'
import { Container,Avatar, Box , Flex, Textarea ,Grid,GridItem,Input, Modal, Button,ModalBody,ModalFooter,useDisclosure,ModalOverlay,ModalCloseButton,Text, ModalContent,ModalHeader} from "@chakra-ui/react"
import FileBase64 from  'react-file-base64'


function ProfilePicUpload() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userData, setUserData] = useState ({
         profilePic:'',
    })
    return (
        <>
            <Avatar m='4' size='2xl' cursor='pointer' onClick={onOpen}>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
                <ModalContent >
                    <ModalHeader as="center" >Choose a Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    
                  <Box mt='7'><FileBase64  type="file" multiple={false}  onDone={({base64}) => setUserData({...userData, profilePic: base64})} /></Box> 
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="teal" mr={3}  > Share </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal></Avatar>
        </>
    )
}

export default ProfilePicUpload
