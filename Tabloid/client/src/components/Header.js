import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink as RRNavLink, Redirect } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        setTimeout(
            () => {
                const checkIsAdmin = parseInt(localStorage.getItem("LoggedInUserType")) == 1

                setAdmin(checkIsAdmin)
            }, 300)
    }, [isLoggedIn])


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    Tabloid
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">
                                        Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/posts">
                                        Posts
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/tags">
                                        Tags
                                    </NavLink>
                                </NavItem>

                                {isAdmin ? <NavItem>
                                    <NavLink tag={RRNavLink} to="/categories">
                                        Manage Categories
                                    </NavLink>
                                </NavItem> : null}

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/myPosts">
                                        My Posts
                                    </NavLink>
                                </NavItem>
                            </>
                        )}

                    </Nav>
                    <Nav navbar>
                        {isLoggedIn && (
                            <>
                                {isAdmin ?
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to="/users">
                                            Users
                                        </NavLink>
                                    </NavItem> :
                                    <></>
                                }
                                <NavItem>
                                    <a
                                        aria-current="page"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </a>
                                </NavItem>

                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
