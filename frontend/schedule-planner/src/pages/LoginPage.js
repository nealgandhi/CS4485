import LoginForm from "../components/LoginForm";

function LoginPage() {
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
                <div className="flex w-screen pt-36">
                    <div className='w-full flex items-center justify-center'>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;