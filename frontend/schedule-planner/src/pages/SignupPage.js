import SignupForm from "../components/SignupForm";

function SignupPage () {
    return(
        <div>
            <div
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/LoginBackground.jpg')",
                height: "100vh",
                width: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                overflow: "hidden"
            }} >
                <div className="flex w-screen pt-16">
                    <div className="w-full flex items-center justify-center">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;
