import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
    const [isEmailAvailable, setIsEmailAvailable] = useState(true);

    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isNicknameAvailable || !isEmailAvailable) {
            alert("Email or nickname is already in use.");
            return;
        }

        const response = await fetch("https://localhost:7148/api/Auth/signup-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, nickname, email, password })
        });

        if (response.ok) {
            alert("Register successful!");
            navigate("/");
        } else {
            alert("Invalid credentials.");
        }
    };

    const passwordValidation = {
        minLength: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_]/.test(password),
    };

    const passwordsMatch = password === confirmPassword;

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!email && !nickname) return;

            const params = new URLSearchParams();
            if (email) params.append("email", email);
            if (nickname) params.append("nickname", nickname);

            const res = await fetch(`https://localhost:7148/api/User/check-availability?${params.toString()}`);
            const data = await res.json();

            if (data.emailAvailable !== undefined) setIsEmailAvailable(data.emailAvailable);
            if (data.nicknameAvailable !== undefined) setIsNicknameAvailable(data.nicknameAvailable);
        }, 500);

        return () => clearTimeout(delay);
    }, [email, nickname]);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 shadow-lg rounded p-5 bg-white">
                <div className="col-md-12 text-center">
                    <h2 className="mb-4 display-6 fw-bold">User Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-2">
                            <input type="text" className={`form-control ${nickname && !isNicknameAvailable ? 'is-invalid' : ''}`} placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                            {nickname && (
                                isNicknameAvailable ? (
                                    <small className="text-success"><FaCheckCircle className="me-1" /> Available</small>
                                ) : (
                                    <small className="text-danger"><FaTimesCircle className="me-1" /> Nickname already taken</small>
                                )
                            )}
                        </div>
                        <div className="mb-2">
                            <input type="email" className={`form-control ${email && !isEmailAvailable ? 'is-invalid' : ''}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {email && (
                                isEmailAvailable ? (
                                    <small className="text-success"><FaCheckCircle className="me-1" /> Available</small>
                                ) : (
                                    <small className="text-danger"><FaTimesCircle className="me-1" /> Email already registered</small>
                                )
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <ul className="list-unstyled mt-2 ps-3 text-start">
                                <li className={passwordValidation.minLength ? 'text-success' : 'text-danger'}>
                                    {passwordValidation.minLength ? <FaCheckCircle /> : <FaTimesCircle />} At least 8 characters
                                </li>
                                <li className={passwordValidation.hasNumber ? 'text-success' : 'text-danger'}>
                                    {passwordValidation.hasNumber ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 number
                                </li>
                                <li className={passwordValidation.hasUpperCase ? 'text-success' : 'text-danger'}>
                                    {passwordValidation.hasUpperCase ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 capital letter
                                </li>
                                <li className={passwordValidation.hasLowerCase ? 'text-success' : 'text-danger'}>
                                    {passwordValidation.hasLowerCase ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 lowercase letter
                                </li>
                                <li className={passwordValidation.hasSpecialChar ? 'text-success' : 'text-danger'}>
                                    {passwordValidation.hasSpecialChar ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 special character
                                </li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className={`form-control ${confirmPasswordTouched && confirmPassword && !passwordsMatch ? 'is-invalid' : ''}`}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (!confirmPasswordTouched) setConfirmPasswordTouched(true);
                                }}
                                required
                            />
                            {confirmPasswordTouched && confirmPassword && !passwordsMatch && (
                                <div className="invalid-feedback">Passwords do not match</div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-success btn-lg w-100">Sign Up</button>
                    </form>
                    <button className="text-end btn btn-primary mt-3 mb-0" onClick={goToLoginPage}>If you have account</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
