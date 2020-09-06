import React from "react";
import { Fragment } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
// import Cookies from "js-cookie";
// import AuthService from "../services/auth.service";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleAuth = this.toggleAuth.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            isCollapseOpen: false,
            isModalOpen: false,
            isLoggedIn:
                JSON.parse(window.sessionStorage.getItem("userLoggedIn")) ||
                false,
        };
    }

    toggleCollapse() {
        this.setState({
            isCollapseOpen: !this.state.isCollapseOpen,
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    toggleAuth() {
        window.sessionStorage.setItem(
            "userLoggedIn",
            JSON.stringify(!this.state.isLoggedIn)
        );
        this.setState({
            isLoggedIn: !this.state.isLoggedIn,
        });
    }

    handleLogin(event) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: this.username.value,
                password: this.password.value,
            }),
        };
        fetch("http://localhost:9107/api/users/login", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.toggleModal();
                    this.toggleAuth();
                    window.location.href = "/dashboard";
                } else if (data.error) {
                    throw new Error(data.error.message);
                }
            })
            .catch((error) => {
                this.setState({
                    loginError: error.message,
                });
                console.log(error);
            });

        // AuthService.login(this.username.value, this.password.value).then(
        //     (result) => {
        //         console.log(result);
        //         console.log(AuthService.getCurrentUser());
        //     },
        //     (error) => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();

        //         this.setState({
        //             loading: false,
        //             message: resMessage,
        //         });
        //     }
        // );

        event.preventDefault();
    }
    componentDidMount() {
        sessionStorage.setItem("isUserLogged", false);
    }

    handleLogout() {
        this.toggleAuth();
        window.location.href = "/home";
        // fetch("http://localhost:9107/users/logout")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data.success) {
        //             this.toggleAuth();
        //         } else if (data.error) {
        //             throw new Error(data.error.message);
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             loginError: error.message,
        //         });
        //         console.log(error);
        //     });
    }

    render() {
        return (
            <Fragment>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Starwisp Assignment</NavbarBrand>
                    <NavbarToggler onClick={this.toggleCollapse} />
                    <Collapse isOpen={this.state.isCollapseOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.state.isLoggedIn === true && (
                                <NavItem>
                                    <NavLink href="/dashboard">
                                        Dashboard
                                    </NavLink>
                                </NavItem>
                            )}
                            {this.state.isLoggedIn === true && (
                                <NavItem>
                                    <NavLink
                                        onClick={this.handleLogout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Logout
                                    </NavLink>
                                </NavItem>
                            )}
                            {this.state.isLoggedIn === false && (
                                <NavItem>
                                    <NavLink
                                        onClick={this.toggleModal}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Login
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="dsp9107"
                                    innerRef={(input) =>
                                        (this.username = input)
                                    }
                                    value="dsp9107"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="somethingVerySecure"
                                    innerRef={(input) =>
                                        (this.password = input)
                                    }
                                    value="somethingVerySecure"
                                />
                            </FormGroup>

                            <Button type="submit" color="primary">
                                Login
                            </Button>
                            <span color="danger">{this.state.loginError}</span>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}
