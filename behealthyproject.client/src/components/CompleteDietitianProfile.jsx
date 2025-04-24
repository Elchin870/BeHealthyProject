import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

function CompleteDietitianProfile() {
    const [specialization, setSpecialization] = useState(null);
    const [certifications, setCertifications] = useState([]);
    const [certificationInput, setCertificationInput] = useState('');
    const [experience, setExperience] = useState(null);
    const [isComplete, setIsComplete] = useState();

    const specializationOptions = [
        "Clinical Nutrition",
        "Pediatric Nutrition",
        "Sports Nutrition",
        "Weight Management",
        "Public Health Nutrition",
        "Geriatric Nutrition",
        "Oncology Nutrition",
        "Diabetes Education",
        "Eating Disorders",
        "Food Service Management"
    ];

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleCertificationChange = (e) => {
        const input = e.target.value;
        if (input.includes(',')) {
            const newCerts = input
                .split(',')
                .map(c => c.trim())
                .filter(c => c.length > 0 && !certifications.includes(c));
            setCertifications([...certifications, ...newCerts]);
            setCertificationInput('');
        } else {
            setCertificationInput(input);
        }
    };

    const handleRemoveCertification = (certToRemove) => {
        setCertifications(certifications.filter(cert => cert !== certToRemove));
    };

    const handleSubmitProfile = async (ev) => {
        ev.preventDefault();

        const response = await fetch("https://localhost:7148/api/Dietitian/update-profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                specialization,
                certifications,
                experience
            })
        });

        if (response.ok) {
            alert("Updated Profile!");
            navigate("/dietitianpage");
        } else {
            alert("Invalid credentials.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7148/api/Dietitian/get-profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.isComplete) {
                        navigate("/dietitianpage");
                        return;
                    }

                    setSpecialization(data.specialization);
                    setExperience(data.experience);
                    setCertifications(Array.isArray(data.certifications)
                        ? data.certifications
                        : typeof data.certifications === 'string'
                            ? data.certifications.split(',').map(c => c.trim())
                            : []);
                    setIsComplete(data.isComplete);
                } else {
                    alert("Invalid credentials.");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="signuppageimg"> 
            {!isComplete && 

                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="col-md-8 col-lg-6 p-4 shadow-lg rounded bg-light">
                        <h2 className="text-center mb-4">Complete Profile</h2>
                        <Form onSubmit={handleSubmitProfile}>
                            <FormGroup>
                                <Label for="certification">Certification(s)</Label>
                                <Input
                                    id="certification"
                                    name="certification"
                                    placeholder="e.g: Precision Nutrition, Dietitians of Canada"
                                    type="text"
                                    value={certificationInput}
                                    onChange={handleCertificationChange}
                                />
                                <div className="mt-2 d-flex flex-wrap gap-2">
                                    {certifications.map((certificate, id) => (
                                        <span key={id} className="badge bg-secondary text-black">
                                            {certificate} <span className="text-danger" style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => handleRemoveCertification(certificate)}>X</span>
                                        </span>
                                    ))}
                                </div>
                            </FormGroup>

                            <Dropdown className="mb-3">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {specialization || "Select Specialization"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {specializationOptions.map((option, index) => (
                                        <Dropdown.Item key={index} onClick={() => setSpecialization(option)}>
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            <FormGroup>
                                <Label htmlFor="experience">Experience (Years)</Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    placeholder="3"
                                    max="75"
                                    min="1"
                                    onChange={(v) => {
                                        setExperience(Number(v.target.value));
                                    }}
                                    value={experience || ''}
                                    required
                                />
                            </FormGroup>

                            <Button className="btn btn-success w-100 py-2" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            }
        </div>
    );
}

export default CompleteDietitianProfile;
