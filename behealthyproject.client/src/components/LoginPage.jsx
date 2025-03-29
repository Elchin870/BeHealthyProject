import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false); 
    const [email, setEmail] = useState(""); 

    const navigate = useNavigate();

    const goToUserSignUp = () => {
        navigate('/signup/user');
    };

    const goToDietitianSignUp = () => {
        navigate('/signup/dietitian');
    };

    const setModal = () => {
        setShowModal(true); 
    };
    const goToResetPassword = () => {
        navigate('/resetpassword')
    }

    const handleLoginUser = async (ev) => {
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
            navigate("/userpage");
        } else {
            alert("Invalid credentials.");
        }
    };
    const handleLoginDietitian = async (ev) => {
        ev.preventDefault();
        const response = await fetch("https://localhost:7148/api/Auth/signin-dietitian", {
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
            navigate("/dietitianpage");
        } else {
            alert("Invalid credentials.");
        }
    };

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7148/api/Auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            alert("Sent mail");
            setShowModal(false); 
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 h-100 shadow-lg rounded p-5 bg-white d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center border-end p-5">
                    <h2 className="mb-4 display-4 fw-bold">User</h2>
                    <form>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-lg w-100" onClick={handleLoginUser}>Sign In</button>
                    </form>
                    <p className="mt-4">
                        <button onClick={setModal} className="text-muted fw-bold">Forgot password</button>
                    </p>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToUserSignUp} className="text-primary fw-bold">Sign Up</button>
                    </p>
                </div>

                <div className="col-md-6 text-center p-5">
                    <h2 className="mb-4 display-4 fw-bold">Dietitian</h2>
                    <form>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success btn-lg w-100" onClick={handleLoginDietitian}>Sign In</button>
                    </form>
                    <p className="mt-4">
                        <button onClick={setModal} className="text-muted fw-bold">Forgot password</button>
                    </p>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToDietitianSignUp} className="text-success fw-bold">Sign Up</button>
                    </p>
                </div>
            </div>

            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Forgot password</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitPasswordReset}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Enter email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100" onClick={goToResetPassword}>Send code</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal arka planý */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default LoginPage;
