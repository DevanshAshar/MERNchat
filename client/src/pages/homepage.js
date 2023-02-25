/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import { Container,Box,Text,Tab,TabList,TabPanel,TabPanels,Tabs } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import { createContext, useContext,useState,useEffect } from "react";
import Login from '../components/Authentication/login'
import Signup from '../components/Authentication/signup'
const homepage=()=>{
    const history=useHistory()
    useEffect(()=>{
      const userInfo=JSON.parse(localStorage.getItem("userInfo"))
      setUser(userInfo)
      if(!userInfo){
        history.push('/chats')
      }
    },[history])
    return(
        <Container maxW='cover' centerContent bgColor={'blue.800'}>
            <Box
            d='flex'
            justifyContent='center'
            p={3}
            bg={'blue.300'}
            w='50%'
            m='40px 0 15px 0'   
            borderRadius='1g'
            borderWidth='1px' >
                <Text fontSize='4xl' fontFamily='Work sans' color='black' >MERNchat</Text>
            </Box>
            <Box bg='blue.300' w='50%' p={4} borderRadius='1g' borderWidth='1px'>
            <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList mb='1em'>
    <Tab color='blue.900' width='50%'>Login</Tab>
    <Tab color='blue.900' width='50%'>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login />  
    </TabPanel>
    <TabPanel>
     <Signup />  
    </TabPanel>
  </TabPanels>
</Tabs>
            </Box>
        </Container>
    )
}

export default homepage 