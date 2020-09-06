import React from "react";
import { Fragment } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Table,
    FormGroup,
    Input,
    FormFeedback,
    FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserService from "../services/user.service";
import userService from "../services/user.service";

// const renderUniversity = (university) => {
//     return (
//         <tr key={university.uid}>
//             <td>{university.uid}</td>
//             <td>{university.uniname}</td>
//             <td>{university.registration_date}</td>
//             <td>{university.expiry_date}</td>
//             <td>{university.imgurl}</td>
//             <td>{university.students}</td>
//             <td>{university.email}</td>
//             <td>{university.weburl}</td>
//             <td>{university.contact_no}</td>
//             <td></td>
//             <td align="center">
//                 <span>
//                     <FontAwesomeIcon icon={faPen} />
//                 </span>
//             </td>
//             <td align="center">
//                 <span
//                     onClick={() => {
//                         console.log(university.uid);
//                         userService
//                             .deleteUniversity(university.uid)
//                             .then((response) => {
//                                 if (response.success) {
//                                     this.notifySuccess(
//                                         response.success.message
//                                     );
//                                     this.fetchUnis();
//                                     this.toggleModal();
//                                 } else {
//                                     this.notifyFailure(response.error.message);
//                                     this.setState({
//                                         registerError: response.error.message,
//                                     });
//                                 }
//                             })
//                             .catch((error) => {
//                                 console.log(error);
//                             });
//                     }}
//                 >
//                     <FontAwesomeIcon icon={faTrash} />
//                 </span>
//             </td>
//         </tr>
//     );
// };

// const UniTable = (props) => {
//     if (props.universities && props.universities.length !== 0) {
//         return (
//             <Table hover responsive>
//                 <thead>
//                     <tr>
//                         <th>uid</th>
//                         <th>name</th>
//                         <th>reg.</th>
//                         <th>exp.</th>
//                         <th>imgurl</th>
//                         <th>students</th>
//                         <th>mail</th>
//                         <th>web</th>
//                         <th>contact</th>
//                         <th></th>
//                         <th>edit</th>
//                         <th>delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>{props.universities.map(renderUniversity)}</tbody>
//             </Table>
//         );
//     } else {
//         return <span>No Data Found</span>;
//     }
// };

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);

        this.state = {
            universities: [],
            userLoggedIn: JSON.parse(
                window.sessionStorage.getItem("userLoggedIn")
            ),
            isModalOpen: false,
            registerError: "",
            fetchError: "",
            errors: {},
            newUni: {},
            updateUni: {},
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    notifySuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    notifyFailure = (msg) =>
        toast.error(msg, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    notifyDanger = (msg) =>
        toast.warning(msg, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    handleChange = (event) => {
        let key = event.target.id;
        let val = event.target.value;

        if (val.length < 1) val = null;

        this.setState({ newUni: { ...this.state.newUni, [key]: val } });

        if (key === "contact_no") {
            this.setState({
                errors: { ...this.state.errors, [key]: val.length > 10 },
            });
        } else if (key === "uniname") {
            this.setState({
                errors: { ...this.state.errors, [key]: val.length > 64 },
            });
        } else if (key === "no_of_students") {
            this.setState({
                errors: { ...this.state.errors, [key]: val > 65535 },
            });
        }
    };

    handleAddSubmit(event) {
        event.preventDefault();

        UserService.registerUniversity(this.state.newUni)
            .then((response) => {
                if (response.success) {
                    this.notifySuccess(response.success.message);
                    this.fetchUnis();
                    this.toggleModal();
                } else {
                    this.notifyFailure(response.error.message);
                    this.setState({
                        registerError: response.error.message,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchUnis() {
        UserService.getUniversities()
            .then((response) => {
                if (response.data.success)
                    this.setState({
                        universities: response.data.success.payload,
                    });
                else {
                    this.setState({
                        fetchError: response.data.error.message,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderUniversity = (university) => {
        return (
            <tr key={university.uid}>
                <td>{university.uid}</td>
                <td>{university.uniname}</td>
                <td>{university.registration_date}</td>
                <td>{university.expiry_date}</td>
                <td>{university.imgurl}</td>
                <td>{university.students}</td>
                <td>{university.email}</td>
                <td>{university.weburl}</td>
                <td>{university.contact_no}</td>
                <td></td>
                <td align="center">
                    <span>
                        <FontAwesomeIcon icon={faPen} />
                    </span>
                </td>
                <td align="center">
                    <span
                        onClick={() => {
                            userService
                                .deleteUniversity(university.uid)
                                .then((response) => {
                                    if (response.success) {
                                        this.notifyDanger(
                                            response.success.message
                                        );
                                        this.fetchUnis();
                                    } else {
                                        this.notifyFailure(
                                            response.error.message
                                        );
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </td>
            </tr>
        );
    };

    UniTable = (props) => {
        if (props.universities && props.universities.length !== 0) {
            return (
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>uid</th>
                            <th>name</th>
                            <th>reg.</th>
                            <th>exp.</th>
                            <th>imgurl</th>
                            <th>students</th>
                            <th>mail</th>
                            <th>web</th>
                            <th>contact</th>
                            <th></th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.universities.map(this.renderUniversity)}
                    </tbody>
                </Table>
            );
        } else {
            return <span>No Data Found</span>;
        }
    };

    componentDidMount() {
        this.fetchUnis();
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <h4>Universities</h4>
                    {/* <UniTable universities={this.state.universities} /> */}
                    {this.UniTable({ universities: this.state.universities })}
                    <Button color="primary" onClick={this.toggleModal}>
                        Add
                    </Button>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Register University
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddSubmit}>
                            <FormGroup>
                                <Label for="uniname">Name</Label>
                                <Input
                                    type="text"
                                    id="uniname"
                                    name="uniname"
                                    innerRef={(input) => (this.uniname = input)}
                                    onBlur={this.handleChange}
                                    invalid={!!this.state.errors.uniname}
                                    required
                                />
                                <FormText>Required</FormText>
                                <FormFeedback>Max. 64 characters</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="registration_date">Reg. Date</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="registration_date"
                                    onBlur={this.handleChange}
                                    required
                                />
                                <FormText>Required</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="expiry_date">Exp. Date</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="expiry_date"
                                    onBlur={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="imgurl">Image URL</Label>
                                <Input
                                    type="url"
                                    name="url"
                                    id="imgurl"
                                    onBlur={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="no_of_students">
                                    No. of Students
                                </Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="no_of_students"
                                    onBlur={this.handleChange}
                                    invalid={!!this.state.errors.no_of_students}
                                />
                                <FormFeedback>Max. value 65535</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onBlur={this.handleChange}
                                    required
                                />
                                <FormText>Required</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="weburl">Web URL</Label>
                                <Input
                                    type="url"
                                    name="url"
                                    id="weburl"
                                    onBlur={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="contact_no">Contact No.</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="contact_no"
                                    onBlur={this.handleChange}
                                    invalid={!!this.state.errors.contact_no}
                                    required
                                />
                                <FormText>Required</FormText>
                                <FormFeedback>Max. 10 digits</FormFeedback>
                            </FormGroup>

                            <span color="danger">
                                {this.state.registerError}
                            </span>
                            <FormGroup>
                                <Button type="submit" color="primary">
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </Fragment>
        );
    }
}
