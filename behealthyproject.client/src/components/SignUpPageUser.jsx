import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpPage() {
    const navigate = useNavigate();  
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignUp = (e) => {
        e.preventDefault();

        console.log('User signed up:', { name, surname, nickname, email, password });

        navigate('/');
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 h-100 shadow-lg rounded p-5 bg-white d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center p-5">
                    <h2 className="mb-4 display-4 fw-bold">Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4">
                        Already have an account? <button className="btn btn-link" onClick={() => navigate('/')}>Login</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
