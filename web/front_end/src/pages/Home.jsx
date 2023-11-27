import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from "react-bootstrap"
import Navigation from '../components/Navigation';
import { LinkContainer } from "react-router-bootstrap";
import { decodeToken, isExpired } from 'react-jwt';
import "./Home.css";
function Home() {
    const [link, setLink] = useState('/login');
    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (!isExpired(token)) {
            setLink('/dashboard');
            console.log("Inside");
        };
    }, [])
    return (
        <>
            <Navigation />
            <Row className='mx-0'>
                <Col md={5} className="home-page-img mx-4 mt-5"></Col>
                <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                    <div className='ms-5'>
                        <h2>
                            Get the executable
                        </h2>
                        <p>A fast and efficient compiler for you</p>
                        <LinkContainer to={link}>
                            <Button className="btn-home" variant='secondary'>
                                Compile-it
                            </Button>
                        </LinkContainer>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Home
