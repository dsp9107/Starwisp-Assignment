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
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

        this.state = {
            universities: [],
            userLoggedIn: JSON.parse(
                window.sessionStorage.getItem("userLoggedIn")
            ),
            isAddModalOpen: false,
            isUpdateModalOpen: false,
            registerError: "",
            fetchError: "",
            errors: {},
            newUni: {},
            updateUni: {
                university: {
                    uniname: "",
                    registration_date: "",
                    expiry_date: "",
                    imgurl: "",
                    no_of_students: 0,
                    email: "",
                    weburl: "",
                    contact_no: "",
                },
            },
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
        };
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

    toggleAddModal() {
        this.setState({
            errors: {},
            isAddModalOpen: !this.state.isAddModalOpen,
        });
    }

    toggleUpdateModal() {
        this.setState({
            errors: {},
            isUpdateModalOpen: !this.state.isUpdateModalOpen,
        });
    }

    handleAddChange = (event) => {
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

    handleUpdateChange = (event) => {
        let key = event.target.id;
        let val = event.target.value;

        if (val.length < 1) val = null;

        this.setState({
            updateUni: {
                ...this.state.updateUni,
                university: { ...this.state.updateUni.university, [key]: val },
            },
        });

        if (key === "contact_no" && val !== null) {
            this.setState({
                errors: { ...this.state.errors, [key]: val.length > 10 },
            });
        } else if (key === "uniname" && val !== null) {
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
                    this.toggleAddModal();
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

    handleUpdateSubmit(event) {
        event.preventDefault();

        UserService.updateUniversity(this.state.updateUni)
            .then((response) => {
                if (response.success) {
                    this.notifySuccess(response.success.message);
                    this.fetchUnis();
                    this.toggleUpdateModal();
                } else {
                    this.notifyFailure(response.error.message);
                    this.setState({
                        updateError: response.error.message,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    updateError: error.status,
                });
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.fetchUnis();
            }
        );
    };

    fetchUnis() {
        UserService.getUniversities()
            .then((response) => {
                if (response.data.success) {
                    let data = response.data.success.payload;
                    {
                        this.setState({
                            universities: response.data.success.payload,
                        });
                        const slice = data.slice(
                            this.state.offset,
                            this.state.offset + this.state.perPage
                        );
                        const postData = slice.map((pd) =>
                            this.renderUniversity(pd)
                        );
                        this.setState({
                            pageCount: Math.ceil(
                                data.length / this.state.perPage
                            ),
                            postData,
                        });
                    }
                } else {
                    this.setState({
                        fetchError: response.data.error.message,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getUniByUID = (uid) => {
        var index = -1;
        var uni = this.state.universities.find(function (item, i) {
            if (item.uid === uid) {
                index = i;
                return i;
            }
            return null;
        });
        return { index, uni };
    };

    renderUniversity = (university) => {
        return (
            <tr key={university.uid}>
                <td align="center">{university.uid}</td>
                <td>{university.uniname}</td>
                <td>{university.registration_date.slice(0, 10)}</td>
                <td>{university.expiry_date ? university.expiry_date : "-"}</td>
                <td align="center">
                    {university.imgurl ? (
                        <a
                            href={university.imgurl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                    ) : (
                        "-"
                    )}
                </td>
                <td align="center">
                    {university.students ? university.students : "-"}
                </td>
                <td>{university.email}</td>
                <td align="center">
                    {university.weburl ? (
                        <a
                            href={university.weburl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                    ) : (
                        "-"
                    )}
                </td>
                <td align="center">{university.contact_no}</td>
                <td align="center">
                    <span
                        onClick={() => {
                            this.setState({
                                updateUni: {
                                    ...this.state.updateUni,
                                    uid: university.uid,
                                    university: this.state.universities[
                                        this.getUniByUID(university.uid).index
                                    ],
                                },
                            });
                            this.toggleUpdateModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </span>
                </td>
                <td align="center">
                    <span
                        onClick={() => {
                            UserService.deleteUniversity(university.uid)
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
                            <th>img</th>
                            <th>students</th>
                            <th>mail</th>
                            <th>web</th>
                            <th>contact</th>
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
        if (AuthService.getCurrentUser()) this.fetchUnis();
    }

    render() {
        if (AuthService.getCurrentUser()) {
            return (
                <Fragment>
                    <div className="container">
                        <h4>Universities</h4>
                        {/* {this.UniTable({
                            universities: this.state.universities,
                        })} */}
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>uid</th>
                                    <th>name</th>
                                    <th>reg.</th>
                                    <th>exp.</th>
                                    <th>img</th>
                                    <th>students</th>
                                    <th>mail</th>
                                    <th>web</th>
                                    <th>contact</th>
                                    <th>edit</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.postData}</tbody>
                        </Table>
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                        <Button
                            className="addButton"
                            color="primary"
                            onClick={this.toggleAddModal}
                        >
                            Add
                        </Button>
                    </div>

                    <Modal
                        isOpen={this.state.isAddModalOpen}
                        toggle={this.toggleAddModal}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggleAddModal}>
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
                                        innerRef={(input) =>
                                            (this.uniname = input)
                                        }
                                        onChange={this.handleAddChange}
                                        invalid={!!this.state.errors.uniname}
                                        required
                                    />
                                    <FormText>Required</FormText>
                                    <FormFeedback>
                                        Max. 64 characters
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="registration_date">
                                        Reg. Date
                                    </Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        id="registration_date"
                                        onChange={this.handleAddChange}
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
                                        onChange={this.handleAddChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="imgurl">Image URL</Label>
                                    <Input
                                        type="url"
                                        name="url"
                                        id="imgurl"
                                        onChange={this.handleAddChange}
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
                                        onChange={this.handleAddChange}
                                        invalid={
                                            !!this.state.errors.no_of_students
                                        }
                                    />
                                    <FormFeedback>
                                        Max. value 65535
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={this.handleAddChange}
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
                                        onChange={this.handleAddChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="contact_no">Contact No.</Label>
                                    <Input
                                        type="number"
                                        name="number"
                                        id="contact_no"
                                        onChange={this.handleAddChange}
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

                    <Modal
                        isOpen={this.state.isUpdateModalOpen}
                        toggle={this.toggleUpdateModal}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggleUpdateModal}>
                            Update University
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleUpdateSubmit}>
                                <FormGroup>
                                    <Label for="uniname">Name</Label>
                                    <Input
                                        type="text"
                                        id="uniname"
                                        name="uniname"
                                        value={
                                            this.state.updateUni.university
                                                .uniname
                                        }
                                        onChange={this.handleUpdateChange}
                                        invalid={!!this.state.errors.uniname}
                                        required
                                    />
                                    <FormText>Required</FormText>
                                    <FormFeedback>
                                        Max. 64 characters
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="registration_date">
                                        Reg. Date
                                    </Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        value={this.state.updateUni.university.registration_date.slice(
                                            0,
                                            10
                                        )}
                                        id="registration_date"
                                        onChange={this.handleUpdateChange}
                                        required
                                    />
                                    <FormText>Required</FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="expiry_date">Exp. Date</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        value={
                                            this.state.updateUni.university
                                                .expiry_date
                                                ? this.state.updateUni.university.expiry_date.slice(
                                                      0,
                                                      10
                                                  )
                                                : ""
                                        }
                                        id="expiry_date"
                                        onChange={this.handleUpdateChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="imgurl">Image URL</Label>
                                    <Input
                                        type="url"
                                        name="url"
                                        value={
                                            this.state.updateUni.university
                                                .imgurl !== null
                                                ? this.state.updateUni
                                                      .university.imgurl
                                                : ""
                                        }
                                        id="imgurl"
                                        onChange={this.handleUpdateChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="no_of_students">
                                        No. of Students
                                    </Label>
                                    <Input
                                        type="number"
                                        name="number"
                                        value={
                                            this.state.updateUni.university
                                                .no_of_students !== null
                                                ? this.state.updateUni
                                                      .university.no_of_students
                                                : ""
                                        }
                                        id="no_of_students"
                                        onChange={this.handleUpdateChange}
                                        invalid={
                                            !!this.state.errors.no_of_students
                                        }
                                    />
                                    <FormFeedback>
                                        Max. value 65535
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={
                                            this.state.updateUni.university
                                                .email
                                        }
                                        id="email"
                                        onChange={this.handleUpdateChange}
                                        required
                                    />
                                    <FormText>Required</FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="weburl">Web URL</Label>
                                    <Input
                                        type="url"
                                        name="url"
                                        value={
                                            this.state.updateUni.university
                                                .weburl !== null
                                                ? this.state.updateUni
                                                      .university.weburl
                                                : ""
                                        }
                                        id="weburl"
                                        onChange={this.handleUpdateChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="contact_no">Contact No.</Label>
                                    <Input
                                        type="number"
                                        name="number"
                                        value={
                                            this.state.updateUni.university
                                                .contact_no
                                        }
                                        id="contact_no"
                                        onChange={this.handleUpdateChange}
                                        invalid={!!this.state.errors.contact_no}
                                        required
                                    />
                                    <FormText>Required</FormText>
                                    <FormFeedback>Max. 10 digits</FormFeedback>
                                </FormGroup>

                                <span color="danger">
                                    {this.state.updateError}
                                </span>
                                <FormGroup>
                                    <Button type="submit" color="primary">
                                        Update
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>

                    <ToastContainer />
                </Fragment>
            );
        } else
            return (
                <div className="container">
                    <h4>You need to log in first</h4>
                </div>
            );
    }
}
