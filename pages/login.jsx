import Link from "next/link";
import { useState } from "react";
import supabase from "../supabase";
import { useQuery } from "react-query";

const Login = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [colorMsg, setColorMsg] = useState('text-red-500');

    const getData = async () => await supabase.from("login_users").select("*");
    const { data, isFetching } = useQuery("loginFetching", getData);
    if (data) {
        console.log(data);
    }
    
      const errors = {
        em: "Invalid Email!",
        pass: "Invalid Password!"
      };
    const handleSubmit = (e) => {
        e.preventDefault();

        var email = e.target[0].value;
        var pword = e.target[1].value;
        console.log(data)
        const userData = data.data.find((user) => user.email === email);
        console.log(userData)
        if (userData) {
            if (userData.password === pword) {
                setIsSubmit(true);
            } else {
                setErrorMsg({name:"pass", message: errors.pass});   
                setColorMsg('text-red-500');
            }
        } else {
            setErrorMsg({name:"em", message: errors.em});
            setColorMsg('text-red-500');
        }
    };

    const handleError = (name) =>
    name === errorMsg.name && (
      <div className={colorMsg}>{errorMsg.message}</div>
    );

    const renderForm = (
        <div>
            <form 
            className="w-full max-w-lg mx-auto mt-5"
            onSubmit={handleSubmit}
            >
                <div>
                    <label 
                    className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-5"
                    >
                        Login
                    </label>
                </div>
                <div>
                    <label 
                    className="block uppercase tracking-wide text-gray-700 text-m font-medium mb-3"
                    >
                        Email:
                    </label>
                    <input 
                    className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Email"
                    type="email"
                    >
                    </input>
                    {handleError("em")}
                </div>
                <div>
                    <label 
                    className="block uppercase tracking-wide text-gray-700 text-m font-medium mb-3"
                    >
                        Password:
                    </label>
                    <input
                    className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Password"
                    type="password"
                    >
                    </input>
                    {handleError("pass")}
                </div>
                <div>
                    <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5"
                    type="submit"
                    >
                        Sign In
                    </button>
                    <Link
                        href={{
                        pathname: "/register"
                        }}
                        className="font-medium ml-28 text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        New User? Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
    return (
    <div className="grid h-screen place-items-center">
        {isSubmit ? 
        <Link
        href={{
            pathname: "/select"
            }}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
            Go to Select
        </Link> : renderForm}
    </div>
    )
}

export default Login