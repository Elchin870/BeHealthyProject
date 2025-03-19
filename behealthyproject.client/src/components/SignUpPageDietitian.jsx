import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPageDietitian() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [education, setEducation] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row w-100 shadow-lg rounded p-5 bg-white">
                <div className="col-md-12 text-center">
                    <h2 className="mb-4 display-4 fw-bold">Dietitian Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPageDietitian;
