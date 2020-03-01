import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../../containers/Table";
import ReactTooltip from "react-tooltip";
import { ReactComponent as IconDelete } from "../../../assets/img/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../../assets/img/icon-edit.svg";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

function Riders() {
  const [loading, setLoading] = useState(false);
  const [modalEditState, setModalEditSate] = useState(false);
  const [modalDeleteState, setModalDeleteSate] = useState(false);
  const [modalAddState, setModalAddSate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [userID, setUserID] = useState("");

  const [time, setTime] = useState(Date.now());

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    province: "",
    password: ""
  });

  const {
    first_name,
    middle_name,
    last_name,
    age,
    phone_number,
    email,
    address,
    city,
    province,
    password
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function getData() {
    // console.log("yes");
    axios
      .get("api/users/riders")
      .then(res => {
        console.log("riders");
        console.log(res.data);
        setTableData(res.data);
        setLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
    setInterval(getData, 5000); // runs every 5 seconds.
  }, []);

  const handleShowAdd = () => {
    setModalAddSate(true);
  };
  const hideModalAddState = () => {
    // addData();
    setModalAddSate(false);
    // getData();
    // setCurrentOrder("");
  };

  const handleShowEdit = () => {
    setModalEditSate(true);
  };
  const hideModalEditState = () => {
    setModalEditSate(false);
    clearFormData();
    // getData();
    // setCurrentOrder("");
  };

  const handleShowDelete = () => {
    setModalDeleteSate(true);
  };

  const hideModalDeleteState = () => {
    setModalDeleteSate(false);
    // getData();
    // setCurrentOrder("");
  };

  // console.log(tableData);
  const onSubmit = e => {
    e.preventDefault();

    // console.log("Yey");
    const req = {
      first_name,
      middle_name,
      last_name,
      phone_number,
      age,
      email,
      address,
      city,
      province,
      role: "rider",
      password
    };
    // return console.log(req);
    axios
      .post("api/users", req)
      .then(res => {
        console.log(res.data);
        getData();
        setModalAddSate(false);
        // setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log(tableData);
  const onUpdate = e => {
    e.preventDefault();

    // console.log("Yey");
    const req = {
      first_name,
      middle_name,
      last_name,
      phone_number,
      age,
      email,
      address,
      city,
      province,
      role: "rider",
      password
    };
    // return console.log(req);
    axios
      .put(`api/users/update/${userID}`, req)
      .then(res => {
        console.log(res.data);
        getData();
        setModalEditSate(false);
        // setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  };
  // console.log(tableData);
  const onDelete = e => {
    e.preventDefault();

    // return console.log(req);
    axios
      .delete(`api/users/delete/${userID}`)
      .then(res => {
        console.log(res.data);
        getData();
        setModalDeleteSate(false);
        // setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  };
  function clearFormData() {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      age: "",
      phone_number: "",
      email: "",
      address: "",
      city: "",
      province: "",
      password: ""
    });
  }

  const columns = [
    {
      Header: "Rider ID",
      accessor: "rider_id" // String-based value accessors!
    },
    {
      Header: "Name",
      accessor: "name" // String-based value accessors!
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone Number",
      accessor: "phone_number"
    },
    {
      Header: "Status",
      id: "status",
      accessor: d => d.status.toString(),
      Cell: status => (
        <div className="active-holder">
          {status.original.status == "Online" ? (
            <span className="table-status-active">Online</span>
          ) : (
            <span className="table-status-inactive">Offline</span>
          )}
        </div>
      )
    },
    {
      Header: "Age",
      accessor: "age",
      Cell: props => <span className="number">{props.value}</span> // Custom cell components!
    },
    {
      Header: "Actions",
      sortable: false,
      // filterable: false,
      Cell: row => (
        <div className="button-wrapper">
          <div className="button-holder">
            <button
              className="btn-icon"
              onClick={() => {
                handleShowEdit();
                // getData()
                /*
                 * Get data from user datas
                 */
                let datas = [...tableData];
                console.log(datas[row.index]);
                /*
                 * Initialize CurrentID
                 */
                // setCurrentEdit_ID(datas[row.index]._id);
                /*
                 * Add shorthand notation value
                 */
                const {
                  id,
                  first_name,
                  middle_name,
                  last_name,
                  phone_number,
                  email,
                  address,
                  city,
                  province,
                  age
                } = datas[row.index];

                setUserID(id);
                setFormData({
                  first_name,
                  middle_name,
                  last_name,
                  phone_number,
                  email,
                  address,
                  city,
                  province,
                  age
                });
              }}
            >
              <span className="icon-holder">
                <IconEdit className="icon-actions" data-tip data-for="edit" />
              </span>
            </button>
            <ReactTooltip id="edit" type="warning" effect="solid">
              <span>Edit</span>
            </ReactTooltip>
          </div>
          <div className="button-holder">
            <button
              className="btn-icon"
              onClick={() => {
                handleShowDelete();
                let datas = [...tableData];
                const { id } = datas[row.index];
                setUserID(id);
              }}
            >
              <span className="icon-holder">
                <IconDelete
                  className="icon-actions"
                  data-tip
                  data-for="delete"
                />
              </span>
            </button>
            <ReactTooltip id="delete" type="warning" effect="solid">
              <span>Delete</span>
            </ReactTooltip>
          </div>
        </div>
      )
    }
  ];

  return (
    <React.Fragment>
      <Button
        color="success"
        className="mb-3"
        onClick={() => {
          handleShowAdd();
        }}
      >
        Add Rider
      </Button>
      {loading ? (
        <Table data={tableData} columns={columns} />
      ) : (
        <div className="holder-loader">
          <h2 className="text=center">Populating riders data....</h2>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {/* for modal Add */}
      <Modal
        isOpen={modalAddState}
        toggle={hideModalAddState}
        className="modals modal-success"
      >
        <ModalHeader>Add Rider</ModalHeader>
        <ModalBody>
          <Form>
            <h1>Create Rider Info</h1>
            <p className="text-muted">Please fill out all the fields</p>
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <Input
                type="text"
                placeholder="Firstname"
                autoComplete="first_name"
                name="first_name"
                value={first_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Middlename"
                autoComplete="middle_name"
                name="middle_name"
                value={middle_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Lastname"
                autoComplete="last_name"
                name="last_name"
                value={last_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Age"
                autoComplete="age"
                name="age"
                value={age}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Phone Number"
                autoComplete="phone_number"
                name="phone_number"
                value={phone_number}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Address"
                autoComplete="address"
                name="address"
                value={address}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="City"
                autoComplete="city"
                name="city"
                value={city}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Province"
                autoComplete="province"
                name="province"
                value={province}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                autoComplete="password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => onSubmit(e)}>
            Save
          </Button>
          <Button color="secondary" onClick={hideModalAddState}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* for edit modal */}
      <Modal
        isOpen={modalEditState}
        toggle={hideModalEditState}
        className="modals modal-primary"
      >
        <ModalHeader>Update Rider</ModalHeader>
        <ModalBody>
          <Form>
            <h1>Create Rider Info</h1>
            <p className="text-muted">Please fill out all the fields</p>
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <Input
                type="text"
                placeholder="Firstname"
                autoComplete="first_name"
                name="first_name"
                value={first_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Middlename"
                autoComplete="middle_name"
                name="middle_name"
                value={middle_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Lastname"
                autoComplete="last_name"
                name="last_name"
                value={last_name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Age"
                autoComplete="age"
                name="age"
                value={age}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Phone Number"
                autoComplete="phone_number"
                name="phone_number"
                value={phone_number}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Address"
                autoComplete="address"
                name="address"
                value={address}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="City"
                autoComplete="city"
                name="city"
                value={city}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Province"
                autoComplete="province"
                name="province"
                value={province}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                autoComplete="password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={e => onUpdate(e)}>
            Save
          </Button>
          <Button color="danger" onClick={hideModalEditState}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* for modal Delete */}
      <Modal
        isOpen={modalDeleteState}
        toggle={hideModalDeleteState}
        className="modals modal-danger"
      >
        <ModalHeader>Delete Rider</ModalHeader>
        <ModalBody>Are you sure you wan't to delete this rider!</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={e => onDelete(e)}>
            Yes
          </Button>
          <Button color="secondary" onClick={hideModalDeleteState}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default Riders;
