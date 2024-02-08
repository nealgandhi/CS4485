import React from 'react';
import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div>
            <div
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/LoginBackground.jpg')",
                height: "100vh",
                width: "100vw",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                overflow: "hidden"
            }} 
            >
                <div className="flex w-full h-screen">
                    <div className='w-full flex items-center justify-center '>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;