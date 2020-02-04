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

function Affiliates() {
  const [modalEditState, setModalEditSate] = useState(false);
  const [modalDeleteState, setModalDeleteSate] = useState(false);
  const [modalAddState, setModalAddSate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [branchID, setBranchID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: ""
  });

  const { name, contact, address } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  function getData() {
    // console.log("yes");
    axios
      .get("api/branch/affiliates")
      .then(res => {
        console.log(res.data);
        setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
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
      name,
      contact,
      address
    };
    // return console.log(req);
    axios
      .post("api/branch", req)
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
      name,
      contact,
      address
    };
    // return console.log(req);
    axios
      .put(`api/branch/update/${branchID}`, req)
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
      .delete(`api/branch/delete/${branchID}`)
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
      name: "",
      contact: "",
      address: ""
    });
  }

  const columns = [
    {
      Header: "Branch Name",
      accessor: "branch_name" // String-based value accessors!
    },
    {
      Header: "Address",
      accessor: "address" // String-based value accessors!
    },
    {
      Header: "Contact",
      accessor: "contact"
    },
    {
      Header: "Total Item",
      accessor: "total_items"
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
                let datas = [...tableData];
                const { id, branch_name, contact, address } = datas[row.index];

                setBranchID(id);
                setFormData({
                  name: branch_name,
                  contact,
                  address
                });
                // console.log(datas[row.index]);
                //   // getData()
                //   /*
                //    * Get data from user datas
                //    */
                //   let datas = [...userData];
                //   console.log({ USERS: datas[row.index] });
                //   let status = datas[row.index].user_status.toString();
                //   let number = datas[row.index].user_phone.toString();
                //   /*
                //    * Initialize CurrentID
                //    */
                //   setCurrentEdit_ID(datas[row.index]._id);
                //   /*
                //    * Add shorthand notation value
                //    */
                //   const {
                //     user_role,
                //     user_name,
                //     user_address,
                //     // user_phone,
                //     user_email,
                //     // user_password
                //     // user_status
                //   } = datas[row.index];
                //   /*
                //    * Set User Data value to Current Input Fields
                //    */
                //   values.role = user_role;
                //   values.name = user_name;
                //   values.address = user_address;
                //   values.phone_number = number;
                //   values.email = user_email;
                //   values.password = '';
                //   values.status = status;
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

                setBranchID(id);
                // let datas = [...userData];
                // console.log(datas[row.index]._id);
                // const deleteID = datas[row.index]._id;
                // Swal.fire({
                //   title: 'Are you sure?',
                //   text: "You won't be able to revert this!",
                //   icon: 'warning',
                //   showCancelButton: true,
                //   confirmButtonColor: '#3085d6',
                //   cancelButtonColor: '#d33',
                //   confirmButtonText: 'Yes, delete it!'
                // }).then(result => {
                //   if (result.value) {
                //     axios.delete(`api/users/${deleteID}`).then(response => {
                //       console.log(response);
                //       getData();
                //     });
                //     let title = 'Deleted!';
                //     let message = 'User has been deleted successfully!';
                //     successNotif(title, message);
                //     // Swal.fire(
                //     //   'Deleted!',
                //     //   'User has been deleted successfully!',
                //     //   'success'
                //     // )
                //   }
                // });
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
        onClick={() => {
          handleShowAdd();
        }}
      >
        Add Branch
      </Button>
      <Table data={tableData} columns={columns} />
      {/* for modal Add */}
      <Modal
        isOpen={modalAddState}
        toggle={hideModalAddState}
        className="modals modal-success"
      >
        <ModalHeader>Add Affiliates</ModalHeader>
        <ModalBody>
          <Form>
            <h1>Create Affiliates</h1>
            <p className="text-muted">Please fill out all the fields</p>
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <Input
                type="text"
                placeholder="Branch Name"
                autoComplete="name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Contact"
                autoComplete="contact"
                name="contact"
                value={contact}
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
        <ModalHeader>Update Branch</ModalHeader>
        <ModalBody>
          <Form>
            <h1>Update Branch Info</h1>
            <p className="text-muted">Please fill out all the fields</p>
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <Input
                type="text"
                placeholder="Branch Name"
                autoComplete="name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Contact"
                autoComplete="contact"
                name="contact"
                value={contact}
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
        <ModalHeader>Delete Affiliates</ModalHeader>
        <ModalBody>Are you sure you wan't to delete this affiliates!</ModalBody>
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

export default Affiliates;
