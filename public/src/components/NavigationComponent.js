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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import AuthService from "../services/auth.service";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        // this.toggleAuth = this.toggleAuth.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            isCollapseOpen: false,
            isModalOpen: false,
            user: AuthService.getCurrentUser(),
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

    // toggleAuth() {
    //     window.sessionStorage.setItem(
    //         "userLoggedIn",
    //         JSON.stringify(!this.state.isLoggedIn)
    //     );
    //     this.setState({
    //         isLoggedIn: !this.state.isLoggedIn,
    //     });
    // }

    handleLogin(event) {
        AuthService.login(this.username.value, this.password.value)
            .then((result) => {
                if (result.success) {
                    this.toggleModal();
                    // this.toggleAuth();
                    window.location.href = "/dashboard";
                } else if (result.error) {
                    throw new Error(result.error.message);
                }
            })
            .catch((error) => {
                this.setState({
                    loginError: error.message,
                });
                console.log(error);
            });

        event.preventDefault();
    }

    componentDidMount() {
        // sessionStorage.setItem("isUserLogged", false);
    }

    handleLogout() {
        AuthService.logout();
        // this.toggleAuth();
        window.location.href = "/home";
    }

    render() {
        return (
            <Fragment>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Starwisp Assignment</NavbarBrand>
                    <NavbarToggler onClick={this.toggleCollapse} />
                    <Collapse isOpen={this.state.isCollapseOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {!!this.state.user === true && (
                                <NavItem>
                                    <NavLink href="/dashboard">
                                        Dashboard
                                    </NavLink>
                                </NavItem>
                            )}
                            {!!this.state.user === true && (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {this.state.user}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem
                                            onClick={this.handleLogout}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            )}
                            {!!this.state.user === false && (
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
