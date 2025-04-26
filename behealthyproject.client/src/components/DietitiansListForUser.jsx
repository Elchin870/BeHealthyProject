import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DietitiansListForUser = () => {
    const [dietitians, setDietitians] = useState([]);

    const token = sessionStorage.getItem('token');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7148/api/User/get-dietitians", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDietitians(data);

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
        <div>
            <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: '#1f232b' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/userpage">BeHealthy</a>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
                        <li className="nav-item"><a className="nav-link active" href="/userpage">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/userprofile">Profile</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">Posts</a></li>
                        <li className="nav-item"><a className="nav-link" href="/dietitianslist">Dietitians</a></li>
                    </ul>
                </div>
            </nav>
            <Container className="mt-5">
                <Row>
                    {dietitians?.filter(d => d.isComplete === true).map(d => (
                        <Col key={d.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100" >
                                <Card.Body>
                                    <Card.Title>{d.username}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{d.nickname}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Experience:</strong> {d.experience} years<br />
                                        <strong>Certification:</strong> {d.certifications?.join(', ')}<br />
                                        <strong>Specialization:</strong> {d.specialization}<br />
                                        <Button className="mt-2 btn btn-succes">Subscribe for {d.price}$</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default DietitiansListForUser;
