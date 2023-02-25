/* eslint-disable no-restricted-globals */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const signup = () => {
    const toast=useToast()
    const history=useHistory()
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const submitHandler=async()=>{
    
        if(!name || !email || !password){
            toast({
                title:'Please fill all the fields',
                status:'warning',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
            return
        }
        try {
            const config={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const {data}=await axios.post("http://localhost:5000/user/newUser",{name,email,password},config)
            toast({
                title:'Registration Successful',
                status:'success',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
            history.push('/chats')
        } catch (error) {
            toast({
                title:'Error Occured',
                description:error.response.data.message,
                status:'error',
                duration:5000,
                isClosable:true,
                position:'bottom'
            })
        }
    
    }
    return <VStack spacing='5px' color='black'>
        <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name"
            onChange={(e)=>setName(e.target.value)}
            />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input type={'password'} placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)}
            />
        </FormControl>
        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}>
            Signup
        </Button>
    </VStack>
}
  

export default signup;  