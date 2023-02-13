import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import supabase from "../supabase";
import { data } from "autoprefixer";

const Logins = () => {
    // const supabaseClient = useSupabaseClient()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMsg, setLoginMsg] = useState("");
    const [colorMsg, setColorMsg] = useState('text-red-500');
    const [user, setUser] = useState("");
    const [session, setSession] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        
        if (error) {
            setLoginMsg(error.message)
            setColorMsg('text-red-500 text-lg mb-2')
        } else {
            setLoginMsg("Login Successful!")
            setColorMsg('text-green-500 text-lg mb-2')
            setUser(data.user)
            setSession(data.session)
            Router.push('/insert')
            console.log(data)

            if (data !== null  ) {
                localStorage.setItem(
                  "user",
                  JSON.stringify({ userid: data.user.id })
                ); 
                localStorage.setItem("name", data.user.user_metadata.fullname); 
            }
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signOut()
        if (error) {
            setLoginMsg(error.message)
            setColorMsg('text-red-500 text-lg mb-2')
        } else {
            setLoginMsg("Logout Successful!")
            setColorMsg('text-green-500 text-lg mb-2')
        }
    }

    
    return(
        <div>
            <form className="w-full max-w-lg mx-auto mt-5">
            <h1 className="font-bold text-black-500">Logins</h1>
            <div>
                <label className="block uppercase tracking-wide text-gray-700 text-m font-medium mb-3">Email:</label>
                <input className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label className="block uppercase tracking-wide text-gray-700 text-m font-medium mb-3">Password:</label>
                <input className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={colorMsg}>
                {loginMsg}
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                    Login Now
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded" type="submit" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            </form>
        </div>
    )
}

export default Logins