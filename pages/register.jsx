import Link from "next/link"
const Register = () => {
    return (
        <div>
            <form className="w-full max-w-lg mx-auto mt-5">
                <div>
                    <label 
                    className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-5"
                    >
                        Sign Up
                    </label>
                </div>
                <div>
                    <label 
                    className="block uppercase tracking-wide text-gray-700 text-m font-medium mb-3"
                    >
                        Full Name:
                    </label>
                    <input 
                    className="appearance-none block w-2/3 bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Full Name"
                    type="text"
                    >
                    </input>
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
                </div>
                <div>
                    <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5"
                    >
                        Sign In
                    </button>
                    <Link
                        href={{
                        pathname: "/login"
                        }}
                        className="font-medium ml-16 text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        User already exists? Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register