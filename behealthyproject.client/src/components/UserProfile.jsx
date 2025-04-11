import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
    const token = localStorage.getItem('token');
    const [profileData, setProfileData] = useState({
        age: '',
        height: '',
        weight: '',
    });
    const [originalProfileData, setOriginalProfileData] = useState({
        age: '',
        height: '',
        weight: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7148/api/User/get-profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setProfileData({
                    age: response.data.age,
                    height: response.data.height,
                    weight: response.data.weight
                });
                setOriginalProfileData({
                    age: response.data.age,
                    height: response.data.height,
                    weight: response.data.weight
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
                setLoading(false); 
            });
    }, [token]);  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        axios.put('https://localhost:7148/api/User/update-profile', profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error updating profile:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <nav className="navbar navbar-expand navbar-dark mb-4" style={{ backgroundColor: '#1f232b' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/userpage">BeHealthy</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
                        <li className="nav-item">
                            <a className="nav-link active" href="/userpage">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/userprofile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Chat</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <h2>Profile Information</h2>
            <div className="card p-4" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Height (cm)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="height"
                        value={profileData.height}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="weight"
                        value={profileData.weight}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={() => setProfileData(originalProfileData)}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleSaveChanges}
                        disabled={
                            profileData.age === originalProfileData.age &&
                            profileData.height === originalProfileData.height &&
                            profileData.weight === originalProfileData.weight
                        }
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
