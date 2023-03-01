import { UserContext } from '@/src/components/hooks/userContext';
import UserProfile from '@/src/components/User/UserProfile';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const profile = () => {
var router = useRouter();
    
    
const { user } = useContext(UserContext);

if(user){
    return (
        <>
       
            
      <UserProfile user={user}></UserProfile>
        
        </>
    )}

   else {
    return <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-lg font-medium">Message</h2>
    <p className="text-gray-600">You are Not  Logged in ,Please Login with your Username and Password</p>
  </div>
   } 
};

export default profile;