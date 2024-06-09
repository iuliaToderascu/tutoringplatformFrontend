import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AllStudyMaterials from "../pages/AllStudyMaterials";
import UploadStudyMaterial from '../pages/UploadStudyMaterial';
import Logout from "./Logout";
import "../assets/NavigationBar.css"; // Import CSS file

export const NavigationBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect (() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", onScroll)

        return () => window.removeEventListener("scroll", onScroll);
    } , [])

    const onUpdateActivateLink = (value) => {
        setActiveLink(value)
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <BrowserRouter>
            <Navbar expand="lg" className={scrolled ? "navbar scrolled" : "navbar"}>
                <Container>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('home')}>Home</NavLink>
                            <NavLink to="/login" className={activeLink === 'login' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('login')}>Login</NavLink>
                            <NavLink to="/signup" className={activeLink === 'signup' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('signup')}>Sign Up</NavLink>
                            <NavLink to="/logout" className={activeLink === 'logout' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('logout')}>Logout</NavLink>
                            <NavLink to="/studyMaterialForm" className={activeLink === 'studyMaterialForm' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('studyMaterialForm')}>Upload Material</NavLink>
                            <NavLink to="/studymaterials" className={activeLink === 'studymaterials' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('studymaterials')}>Study Materials</NavLink>
                            <NavLink to="/all" className={activeLink === 'all' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActivateLink('all')}>All Objects</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                           <Button variant="outline-success" onClick={() => setSearchQuery(searchQuery)}>Search</Button>
                        </Form>
            </Navbar>

            <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/signup"} element={<SignUpPage />} />
                <Route path={"/logout"} element={<Logout />} />
                <Route path={"/studymaterials"} element={<AllStudyMaterials />} />
                <Route path={"/studyMaterialForm"} element={<UploadStudyMaterial />} />
            </Routes>
        </BrowserRouter>
    )
}