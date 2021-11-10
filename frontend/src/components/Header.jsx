import React from "react";
import {useDispatch , useSelector} from 'react-redux';
import {Container , Navbar , Nav , NavDropdown} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../actions/userAction";

const Header = ()=>{
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(userLogout())
    }

    return(
        <>
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
                <Container>
                    <LinkContainer exact to="/">
                        <Navbar.Brand>ECOMMERCE</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer exact to="/cart">
                            <Nav.Link  className="mx-3"><i className="fas fa-shopping-cart"></i>&nbsp;Cart</Nav.Link>
                        </LinkContainer>
                        {
                            userInfo ? (
                                <NavDropdown title={userInfo.name}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutUser}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<LinkContainer exact to="/login">
                            <Nav.Link><i className="fas fa-user"></i>&nbsp;SIGNIN</Nav.Link>
                        </LinkContainer>)
                        }
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    ) 
}

export default Header;