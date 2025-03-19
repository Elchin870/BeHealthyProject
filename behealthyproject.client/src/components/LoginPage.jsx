import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
    const navigate = useNavigate();  

    const goToUserSignUp = () => {
        navigate('/signup/user'); 
    };

    const goToDietitianSignUp = () => {
        navigate('/signup/dietitian');  
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 h-100 shadow-lg rounded p-5 bg-white d-flex align-items-center justify-content-center">
                <div className="col-md-6 text-center border-end p-5">
                    <h2 className="mb-4 display-4 fw-bold">User</h2>
                    <form>
                        <div className="mb-4">
                            <input type="email" className="form-control form-control-lg" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control form-control-lg" placeholder="Password" />
                        </div>
                        <button className="btn btn-primary btn-lg w-100">Sign In</button>
                    </form>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToUserSignUp} className="text-primary fw-bold">Sign Up</button>
                    </p>
                </div>
                <div className="col-md-6 text-center p-5">
                    <h2 className="mb-4 display-4 fw-bold">Dietitian</h2>
                    <form>
                        <div className="mb-4">
                            <input type="email" className="form-control form-control-lg" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control form-control-lg" placeholder="Password" />
                        </div>
                        <button className="btn btn-success btn-lg w-100">Sign In</button>
                    </form>
                    <p className="mt-4">
                        Don't have an account? <button onClick={goToDietitianSignUp} className="text-success fw-bold">Sign Up</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
