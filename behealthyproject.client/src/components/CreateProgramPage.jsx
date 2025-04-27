import React, { useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from 'react-bootstrap/Dropdown';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

function CreateProgramPage() {
    const [price, setPrice] = useState(null);
    const [purpose, setPurpose] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [water, setWater] = useState(null);

    const token = sessionStorage.getItem('token');

    const purposesOptions = [
        "Weight Loss",
        "Muscle Gain",
        "Maintain Health"
    ];



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
                        return;
                    }


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
            {isComplete ||
                <div className="container d-flex justify-content-center align-items-center min-vh-100">
                    <div className="col-md-8 col-lg-6 p-4 shadow-lg rounded bg-light">
                        <h2 className="text-center mb-4">Create diet program</h2>
                        <Form>
                            <Dropdown className="mb-3">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {purpose || "Select purpose of program"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {purposesOptions.map((option, index) => (
                                        <Dropdown.Item key={index} onClick={() => setPurpose(option)}>
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            <FormGroup>
                                <Label for="breakfast">Breakfast</Label>
                                <Input
                                    id="breakfast"
                                    name="breakfast"
                                    placeholder="e.g: Egg, Berries,"
                                    type="text"
                                    value={breakfast}
                                    onChange={(e) => setBreakfast(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="lunch">Lunch</Label>
                                <Input
                                    id="lunch"
                                    name="lunch"
                                    placeholder="e.g: Egg, Berries,"
                                    type="text"
                                    value={lunch}
                                    onChange={(e) => setLunch(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="dinner">Dinner</Label>
                                <Input
                                    id="dinner"
                                    name="dinner"
                                    placeholder="e.g: Egg, Berries,"
                                    type="text"
                                    value={dinner}
                                    onChange={(e) => setDinner(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="water">Water</Label>
                                <Input
                                    id="water"
                                    name="water"
                                    placeholder="2"
                                    step="0.5"
                                    min="0.5"
                                    max="5.5"
                                    type="number"
                                    value={water || ''}
                                    onChange={(e) => setWater(Number(e.target.value))}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="price">Price program (USD)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.5"
                                    className="form-control"
                                    placeholder="19.99"
                                    max="100"
                                    min="1"
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    value={price || ''}
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

export default CreateProgramPage;
