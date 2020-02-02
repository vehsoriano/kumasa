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
  const [modalEditState, setModalEditSate] = useState(false);
  const [modalDeleteState, setModalDeleteSate] = useState(false);
  const [modalAddState, setModalAddSate] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  function getData() {
    // console.log("yes");
    axios
      .get("api/users/riders")
      .then(res => {
        // console.log(res.data)
        setTransactionData(res.data);
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
    setModalAddSate(false);
    // getData();
    // setCurrentOrder("");
  };

  const handleShowEdit = () => {
    setModalEditSate(true);
  };
  const hideModalEditState = () => {
    setModalEditSate(false);
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

  console.log(transactionData);

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
          {status.original.status == "online" ? (
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
                //   handleShowEdit();
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
                //     user_first_name,
                //     user_last_name,
                //     // user_phone,
                //     user_email,
                //     // user_password
                //     // user_status
                //   } = datas[row.index];
                //   /*
                //    * Set User Data value to Current Input Fields
                //    */
                //   values.role = user_role;
                //   values.first_name = user_first_name;
                //   values.last_name = user_last_name;
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
        Add Rider
      </Button>
      <Table data={transactionData} columns={columns} />
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
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Middlename"
                autoComplete="middle_name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Lastname"
                autoComplete="last_name"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Phone Number"
                autoComplete="phone_number"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input type="email" placeholder="Email" autoComplete="email" />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="Address" autoComplete="address" />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input type="text" placeholder="City" autoComplete="city" />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Province"
                autoComplete="province"
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={hideModalAddState}>
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
          {/* <h4>Customer Details</h4>
          <hr />
          <div className="holder-details">
            <div className="holder-key">Full Name:</div>
            <div className="holder-value">{first_name + " " + last_name}</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Phone Number:</div>
            <div className="holder-value">{phone_number}</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Email:</div>
            <div className="holder-value">{email}</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Address:</div>
            <div className="holder-value">
              {address + " " + city + " " + province}
            </div>
          </div>

          <br />
          <h4>Branch Details</h4>
          <hr />
          {branchData
            .filter(x => x.name === order_branch)
            .map(x => {
              return (
                <div key={x.name}>
                  <div className="holder-details">
                    <div className="holder-key">Name:</div>
                    <div className="holder-value">{x.name}</div>
                  </div>
                  <div className="holder-details">
                    <div className="holder-key">Contact:</div>
                    <div className="holder-value">{x.contact}</div>
                  </div>
                  <div className="holder-details">
                    <div className="holder-key">Address:</div>
                    <div className="holder-value">{x.address}</div>
                  </div>
                </div>
              );
            })}

          <br />
          <h4>Order Details</h4>
          <hr />
          <div className="holder-details">
            <div className="holder-key">Order ID:</div>
            <div className="holder-value">{order_number}</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Order Date:</div>
            <div className="holder-value">{order_date}</div>
          </div>

          <br />
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(x => {
                totalAmount = parseInt(totalAmount) + parseInt(x.total);

                return (
                  <tr key={x.id}>
                    <th scope="row">{x.id}</th>
                    <td>{x.item_name}</td>
                    <td>{x.qty}</td>
                    <td>{x.price}</td>
                    <td>{x.total}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th id="total" colSpan="4">
                  Total :
                </th>
                <td>{totalAmount}</td>
              </tr>
            </tfoot>
          </Table> */}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={hideModalEditState}>
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
          <Button color="danger" onClick={hideModalDeleteState}>
            Yes
          </Button>
          <Button color="secondary" onClick={hideModalDeleteState}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
  return (
    <>
      <button
        className="btn btn-primary "
        onClick={() => {
          console.log("ok");
        }}
      >
        Add Rider
      </button>
    </>
  );
}

export default Riders;
