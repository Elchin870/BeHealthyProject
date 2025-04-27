import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DietitiansListForUser = () => {
    const [dietitians, setDietitians] = useState([]);
    const [subscribedDietitians, setSubscribedDietitians] = useState([]);
    const token = sessionStorage.getItem('token');
    var subscribed = [...subscribedDietitians];
    useEffect(() => {
        const fetchSubscribedDietitians = async () => {
            try {
                const response = await fetch("https://localhost:7148/api/User/get-subscribed-dietitians", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSubscribedDietitians(data); 
                } else {
                    alert("Failed to get subscribed dietitians.");
                }
            } catch (error) {
                console.error("Error fetching subscribed dietitians:", error);
            }
        };

        const fetchDietitians = async () => {
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
                    setDietitians(data);
                    fetchSubscribedDietitians(); 
                } else {
                    alert("Failed to get dietitians.");
                }
            } catch (error) {
                console.error("Error fetching dietitians:", error);
            }
        };

        fetchDietitians();
    }, [token]);

    const handleSubscribe = async (dietitianId) => {
        try {
            const response = await fetch("https://localhost:7148/api/User/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(dietitianId),
            });

            if (response.ok) {
                alert("Subscribed successfully!");
                setSubscribedDietitians(prev => [...prev, dietitianId]);
                subscribed.push(...subscribedDietitians, dietitianId);
            } else {
                alert("Failed to subscribe.");
            }
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };


    return (
        <Container className="mt-5">
            <Row>
                {dietitians.map(d => (
                    <Col key={d.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{d.username}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{d.nickname}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Experience:</strong> {d.experience} years<br />
                                    <strong>Certification:</strong> {d.certifications?.join(', ')}<br />
                                    <strong>Specialization:</strong> {d.specialization}<br />
                                    {subscribedDietitians.includes(d.id) ? (
                                        <Button className="mt-2">Unsubscribe</Button>
                                    ) : (
                                        <Button className="mt-2" onClick={() => handleSubscribe(d.id)}>Subscribe</Button>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DietitiansListForUser;
