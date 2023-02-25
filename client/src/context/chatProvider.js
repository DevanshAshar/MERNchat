/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext,useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
const chatContext=createContext()
const chatProvider=({children})=>{
    const [user,setUser]=useState()
    const history=useHistory()
    useEffect(()=>{
      const userInfo=JSON.parse(localStorage.getItem("userInfo"))
      setUser(userInfo)
      if(!userInfo){
        history.push('/')
      }
    },[history])
    return (
        <chatContext.Provider value={{user,setUser}}>
            {children}
        </chatContext.Provider>
    )
}
export const chatState=()=>{
    return useContext(chatContext)
}
export default chatProvider