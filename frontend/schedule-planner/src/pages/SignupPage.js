import SignupForm from "../components/SignupForm";

function SignupPage() {
    return (
        <div className="h-screen w-full bg-cover bg-center overflow-hidden"
             style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/LoginBackground.jpg')" }}>
            <div className="flex w-full h-full items-center justify-center">
                <SignupForm />
            </div>
        </div>
    );
}

export default SignupPage;
