import { useNavigate, } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const goToUserSignUp = () => {
        navigate('/signup/user');
    };

    const goToDietitianSignUp = () => {
        navigate('/signup/dietitian');
    };
    const goToForgotPassword = () => {
        navigate('/passwordreset');
    };

    const handleLogin = async (ev) => {
        ev.preventDefault();
        const response = await fetch("https://localhost:7148/api/Auth/signin-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem("token", result.token);
            alert("Login successful!");
            navigate("/dashboard");
        } else {
            alert("Invalid credentials.");
        }
    };
    const navigate = useNavigate();



    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 h-100 shadow-lg rounded p-5 bg-white d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center border-end p-5">
                    <h2 className="mb-4 display-4 fw-bold">User</h2>
                    <form>
                        <div className="mb-4">
                            <input type="email" className="form-control form-control-lg" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-primary btn-lg w-100" onClick={handleLogin}>Sign In</button>
                    </form>
                    <p className="mt-4">
                        <button onClick={goToForgotPassword} className="text-muted fw-bold">Forgot password</button>
                    </p>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToUserSignUp} className="text-primary fw-bold">Sign Up</button>
                    </p>
                </div>
                <div className="col-md-6 text-center p-5">
                    <h2 className="mb-4 display-4 fw-bold">Dietitian</h2>
                    <form>
                        <div className="mb-4">
                            <input type="email" className="form-control form-control-lg" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-success btn-lg w-100" onClick={handleLogin}>Sign In</button>
                    </form>
                    <p className="mt-4">
                         <button onClick={goToForgotPassword} className="text-muted fw-bold">Forgot password</button>
                    </p>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToDietitianSignUp} className="text-success fw-bold">Sign Up</button>
                    </p>
                </div>
            </div>
        </div>
    );
}   

export default LoginPage;
