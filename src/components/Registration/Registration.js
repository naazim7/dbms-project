import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Registration = () => {
    const [regUsername, setUsername] = useState('')
    const [ regPassword, setPassword ] = useState('')
    const [ regEmail, setEmail ] = useState('')
    const [regBio,setBio]=useState('');
    const router=useRouter();





//Handle Submit 

const register = () => {
    //console.log(username)
    axios({
      method: 'post',
      data: {
        username: regUsername,
        password: regPassword,
        email: regEmail,
        bio: regBio
      },
      withCredentials: true,
      url: 'http://localhost:3001/register'
    }).then(res => {

        if(res.data=="User Created"){
            router.push('/login');
        }

    }).catch(err => {console.log(err)})
  }


    
    
    return (
         <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                           Registration Here
                        </h3>
                    </a>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                UserName
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                  type="text"
                                  name="username"
                                 
                                 onChange={e => setUsername(e.target.value )}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                   type="email"
                                  name="email"
                                  onChange={e => setEmail(e.target.value )}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                 type="password"
                                  name="password"
                                  onChange={e => setPassword(e.target.value )}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                       
                         <div className="mt-4">
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
    Bio                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                 type="text"
                                  name="bio"
                                  onChange={e => setBio(e.target.value )}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            <button onClick={register} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                   
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link className="text-purple-600 hover:underline" href="/login">
                                Log in
                            </Link>
                        </span>
                    </div>
                    
                    
                        </div>
                        </div>
                        </div>
    );
};

export default Registration;