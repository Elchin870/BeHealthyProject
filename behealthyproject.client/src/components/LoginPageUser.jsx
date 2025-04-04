import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

function LoginPageUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const goToUserSignUp = () => {
        navigate('/signup/user');
    }
    const goToDietitianSignIn = () => {
        navigate('/signin/dietitian')
    }
    const goToResetPassword = () => {
        navigate('/resetpassword');
    }
    const setModal = () => {
        setShowModal(true);
    };
    const handleLoginUser = async (ev) => {
        ev.preventDefault();
        const response = await fetch("https://localhost:7148/api/Auth/signin-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

    const handleSubmitPasswordReset = async (e) => {
        e.preventDefault();

        const response = await fetch("https://localhost:7148/api/Auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark homepage">
            <div className="row w-50 bg-body-secondary d-flex align-items-center justify-content-center " style={{
                height: "30rem",
                borderRadius: 55
            }}>
                <div className="col-md-6 text-center p-0 ">
                    <h2 className="mb-4 display-6 fw-bold">User</h2>
                    <form>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-1">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </form>
                    <div className="row mt-2">
                        <button className="btn btn-success w-100  col " onClick={handleLoginUser}>Sign In</button>
                        <p className="mt-0 mb-0 text-end col ">
                            <button onClick={setModal} className="btn btn-link text-dark">Forgot password</button>
                        </p>
                    </div>
                    <hr className="border border-dark border-2 opacity-100 mt-3 mb-2"></hr>

                    <p className="text-dark text-start m-0">
                        Don't have an account? <button onClick={goToUserSignUp} className="text-success fw-bold btn btn-link:focus ">Sign Up</button>
                    </p>
                    <p className="text-dark text-start m-0">
                        Login as<button onClick={goToDietitianSignIn} className="text-success fw-bold btn btn-link:focus">Dietitian</button>
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

            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default LoginPageUser;