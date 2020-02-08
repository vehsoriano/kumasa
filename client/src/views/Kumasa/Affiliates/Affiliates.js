import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomTable from "../../../containers/Table";
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
  InputGroupText,
  Table
} from "reactstrap";

function Affiliates() {
  const [modalEditState, setModalEditSate] = useState(false);
  const [modalDeleteState, setModalDeleteSate] = useState(false);
  const [modalAddState, setModalAddSate] = useState(false);
  const [modalViewState, setModalViewSate] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [branchID, setBranchID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: ""
  });
  const [itemFormData, setItemFormData] = useState({
    item_name: "",
    price: "",
    status: ""
  });

  const { name, contact, address } = formData;
  const { item_name, price, status } = itemFormData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onItemChange = e =>
    setItemFormData({ ...itemFormData, [e.target.name]: e.target.value });

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
  function getItems(branch_id) {
    // console.log("yes");
    axios
      .get(`api/item/branch/${branch_id}`)
      .then(res => {
        console.log(res.data);
        setItemData(res.data);
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

  const handleShowView = () => {
    setModalViewSate(true);
  };

  const hideModalViewState = () => {
    setModalViewSate(false);
    clearFormData();
    // getData();
    // setCurrentOrder("");
  };

  const onDeleteItem = (item_id) => {
    axios
      .delete(`api/item/delete/${item_id}`)
      .then(res => {
        console.log(res.data);
        getData();
        getItems(branchID);
        // setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  }

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
        clearFormData();
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
        clearFormData();
        // setTableData(res.data);
        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onAddItem = e => {
    e.preventDefault();

    // console.log("Yey");
    const req = {
      item_branch_id: branchID,
      item_name,
      price,
      status
    };
    // return console.log(req);
    axios
      .post(`api/item`, req)
      .then(res => {
        console.log(res.data);
        getData();
        getItems(branchID);
        clearFormData();
        // setModalViewSate(false);
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
    setItemFormData({
      item_name: "",
      price: "",
      status: ""
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
                handleShowView();
                let datas = [...tableData];
                const { id, branch_name, contact, address } = datas[row.index];

                setBranchID(id);
                getItems(id);
                setFormData({
                  name: branch_name,
                  contact,
                  address
                });
              }}
            >
              <span className="icon-holder">
                <span className="fa fa-eye" data-tip data-for="view" />
              </span>
            </button>
            <ReactTooltip id="view" type="warning" effect="solid">
              <span>View</span>
            </ReactTooltip>
          </div>
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

  var totalAmount = 0;
  var count = 0;
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
      <CustomTable data={tableData} columns={columns} />
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
      {/* for view modal */}
      <Modal
        isOpen={modalViewState}
        toggle={hideModalViewState}
        size="lg"
        className="modals modal-primary"
      >
        <ModalHeader>Branch Details</ModalHeader>
        <ModalBody>
          <Form>
            <h1>View Branch Items</h1>
            <p className="text-muted">Please fill out the field</p>
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <Input
                type="text"
                placeholder="Item Name"
                autoComplete="item_name"
                name="item_name"
                value={item_name}
                onChange={e => onItemChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Price"
                autoComplete="price"
                name="price"
                value={price}
                onChange={e => onItemChange(e)}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Input
                type="text"
                placeholder="Status"
                autoComplete="status"
                name="status"
                value={status}
                onChange={e => onItemChange(e)}
                required
              />
            </InputGroup>
          </Form>
          <Button color="primary" onClick={e => onAddItem(e)}>
            Add
          </Button>
          <br />
          <br />
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemData.map(x => {
                // console.log(x);

                count++;
                return (
                  <tr key={x._id}>
                    <th scope="row">{count}</th>
                    <td>{x.item_name}</td>
                    <td>{x.price}</td>
                    <td>{x.status}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => {
                          onDeleteItem(x._id);
                          console.log(x._id);
                        }}
                      >
                        <span
                          className="fa fa-trash"
                          data-tip
                          data-for="view"
                        />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="success" onClick={e => onUpdate(e)}>
            Save
          </Button> */}
          <Button color="secondary" onClick={hideModalViewState}>
            Close
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
