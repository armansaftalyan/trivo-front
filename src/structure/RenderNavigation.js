import {Link, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../auth/AuthWrapper";
import {nav} from "./navigation.js";
import {Navbar, Nav} from 'react-bootstrap';
import './scss/render.scss'
import {useContext} from "react";

export const RenderRoutes = () => {
    const {user} = useContext(AuthContext)
    return (
        <Routes>
            { nav.map((r, i) => {

                if (r.isPrivate) {
                    return <Route key={i} path={r.path} element={user.isAuthenticated?r.element: <Navigate to={'/login'}/> }/>
                } else if (!r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element}/>
                } else return false
            })}

        </Routes>
    )
}

export const RenderMenu = () => {

    const {user, logout} = useContext(AuthContext)

    return (
        <Navbar bg="light" expand="lg" className="navbar">
            <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">


                    {user.isAuthenticated ?
                        <>
                            {nav.map((r, i) => {
                                if (r.isPrivate && !r.isMenu) {
                                    return (
                                        <Nav.Link as={Link} to={r.path} key={i} r={r}>{r.name}</Nav.Link>
                                    )
                                }
                            })}
                            <Nav.Link as={Link} to={'#'} onClick={logout}>Log out</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to={'login'}>Log in</Nav.Link>
                            <Nav.Link as={Link} to={'register'}>Register</Nav.Link>
                        </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}