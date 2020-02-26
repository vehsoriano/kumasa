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
    address: "",
    logo: ""
  });
  const [itemFormData, setItemFormData] = useState({
    item_name: "",
    price: "",
    status: "Available",
    recommended: "Yes"
  });

  const [addingItem, setAddingItem] = useState(false)

  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState(false)
  const [currentEditItem, setCurrentEditItem] = useState('')
  const [isImageTouched, setIsImageTouched] = useState(false)

  const [file, setFile] = useState('')
  const [imagePreviewURL, setImagePreviewURL] = useState('')

  const handleImageChange = (e) => {
    e.preventDefault()
    console.log(e)
    
    let reader = new FileReader()
    let file = e.target.files[0]
    
    reader.onloadend = () => {
      setFile(file)
      setImagePreviewURL(reader.result)
      setIsImageTouched(true)
    }

    reader.readAsDataURL(file)
  }

  let imagePrev = null
  let imagePrevSmall = null
  if(imagePreviewURL) {
    imagePrev = (
      <img style={{maxWidth: 150, maxHeight: 150, margin: 15}} src={imagePreviewURL} />
    )
    imagePrevSmall = (
      <img style={{maxWidth: 50, maxHeight: 50, margin: 15}} src={imagePreviewURL} />
    )
  } else {
    imagePrev = (
      ''
    )
  }



  const { name, contact, address, logo } = formData;
  const { item_name, price, status, recommended } = itemFormData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onItemChange = (e) =>  {
    console.log(e.target.name)
    console.log(e.target.value)
      setItemFormData({ ...itemFormData, [e.target.name]: e.target.value });
  }

  function getData() {
    // console.log("yes");
    axios
      .get("api/branch/affiliates")
      .then(res => {
        console.log(res.data);
        setTableData(res.data);
        // setLoader(true)
        setLoading(true)
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
    clearFormData()
  };
  const hideModalAddState = () => {
    // addData();
    setModalAddSate(false);
    clearFormData()
    // getData();
    // setCurrentOrder("");
  };

  const handleShowEdit = () => {
    setModalEditSate(true);
  };
  const hideModalEditState = () => {
    setModalEditSate(false);
    clearFormData();
    setFile('')
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
    setCurrentEditItem('')
    // getData();
    // setCurrentOrder("");
  };

  const onDeleteItem = (item_id) => {
    console.log(item_id)

    var password = prompt('Please Enter your password before deleting, you cannot undo this once done')

    if (password === 'admin') {
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
    } else {
      alert('wrong credentials!')
    }
  }


  // console.log(tableData);
  const onSubmit = e => {
    e.preventDefault();

    const token = 'ea30b65f2cb1bced241c333046e4137941cd0c9f'

    // console.log("Yey");
    console.log(file)
    console.log(imagePreviewURL)

        
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios.post( 
        'https://api.imgur.com/3/image',
        file,
        config
      ).then(res => {
        const req = {
          name,
          contact,
          address,
          logo: res.data.data.link
        };
  
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
      })
      .catch(function(err) {
        console.log(err)
      })

    // if(false) {
    // } else {
    //   console.log('cannot post')
    // }
    
  };
  // console.log(tableData);
  const onUpdate = e => {
    e.preventDefault();

    const token = 'ea30b65f2cb1bced241c333046e4137941cd0c9f'
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };   
    const req = {
      logo: imagePreviewURL ? imagePreviewURL : logo
    };

    console.log(req)

    if(isImageTouched) {
      axios.post( 
        'https://api.imgur.com/3/image',
        file,
        config
      ).then(res => {
        console.log(res)
        const reqParam = {
          name,
          contact,
          address,
          logo: res.data.data.link
        }
        axios
          .put(`api/branch/update/${branchID}`, reqParam)
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
      })
      .catch(function(err) {
        console.log(err)
      })
    } else {
      const reqParam = {
        name,
        contact,
        address,
        logo: req.logo
      }
      axios
        .put(`api/branch/update/${branchID}`, reqParam)
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
    }
    // console.log(req)
    
    //
  };

  const handleAddItemSubmit = e => {
    e.preventDefault();

    setAddingItem(true)

    const token = 'ea30b65f2cb1bced241c333046e4137941cd0c9f'
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };   
    // const req = {
    //   logo: imagePreviewURL ? imagePreviewURL : logo
    // };

    console.log(itemFormData)

    axios.post( 
      'https://api.imgur.com/3/image',
      file,
      config
    ).then(res => {
      console.log(res)
      const req = {
        item_branch_id: branchID,
        item_name,
        price,
        status,
        initialQuantity: 1,
        isAdded: false,
        recommended,
        // isDeleted: false,
        logo: res.data.data.link
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
          setFile('')
          setAddingItem(false)
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err)
    })
    // console.log("Yey");
    
  };

  // console.log(tableData);
  const onDelete = e => {
    e.preventDefault();
    setModalDeleteSate(false)
    const pass = prompt('Please Enter your password')

    if (pass === 'admin') {
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
    } else {
      alert('Wrong Credentials')
    }
  };

  function clearFormData() {
    setFormData({
      name: "",
      contact: "",
      address: "",
      logo: ''
    });
    setItemFormData({
      item_name: "",
      price: "",
      status: "Available",
      recommended: "No",
      logo: ''
    });
    setImagePreviewURL('')
    setFile(null)
    setCurrentEditItem('')
    setEditItem(false)
    setIsImageTouched(false)
  }

  const onEditItem = (id) => {
    setEditItem(true)
    setCurrentEditItem(id)

    console.log(id)

    let data = [...itemData]
    const filteredData = data.filter(x => x._id === id)

    const { item_name, price, status, logo, recommended } = filteredData[0]

    // console.log(a)

    setImagePreviewURL(logo)
    setItemFormData({
      item_name: item_name,
      price: price,
      status: status,
      recommended: recommended,
    })
  }

  const onItemUpdate = e => {
    e.preventDefault();

    const token = 'ea30b65f2cb1bced241c333046e4137941cd0c9f'
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };   
    
    console.log(logo)
    console.log(imagePreviewURL)
    // console.log(itemFormData)
    console.log(isImageTouched)

    if (isImageTouched) {
        axios.post( 
        'https://api.imgur.com/3/image',
        file,
        config
      ).then(res => {
        console.log(res)
        const reqParam = {
          name: item_name,
          price,
          status,
          recommended,
          logo: res.data.data.link
        }
        axios
          .put(`api/item/update/${currentEditItem}`, reqParam)
          .then(res => {
            console.log(res.data);
            getItems(branchID);
            setModalEditSate(false);
            clearFormData();
          })
          .catch(err => {
            console.log(err);
            alert('An error occured')
          });
      })
      .catch(function(err) {
        console.log(err)
        alert('An error occured')
      })
    } else {

      const reqParam = {
        name: item_name,
        price,
        status,
        logo: imagePreviewURL
      }

      axios
        .put(`api/item/update/${currentEditItem}`, reqParam)
        .then(res => {
          console.log(res.data);
          getItems(branchID);
          setModalEditSate(false);
          clearFormData();
        })
        .catch(err => {
          console.log(err);
        });
    }

  };
  
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
                const { id, branch_name, contact, address, logo } = datas[row.index];

                setBranchID(id);
                getItems(id);
                setFormData({
                  name: branch_name,
                  contact,
                  address,
                  logo
                });
              }}
            >
              <span className="icon-holder">
                <span className="fa fa-eye" data-tip data-for="view" />
              </span>
            </button>
            <ReactTooltip id="view" type="warning" effect="solid">
              <span>View Items</span>
            </ReactTooltip>
          </div>
          <div className="button-holder">
            <button
              className="btn-icon"
              onClick={() => {
                handleShowEdit();
                let datas = [...tableData];
                const { id, branch_name, contact, address, logo } = datas[row.index];

                setBranchID(id);
                setFormData({
                  name: branch_name,
                  contact,
                  address,
                  logo
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
        className="mb-3"
        onClick={() => {
          handleShowAdd();
        }}
      >
        Add Branch
      </Button>
        {console.log(loading)}

        {
          loading ? 
          <CustomTable data={tableData} columns={columns} />
          : 
          <div className="holder-loader">
            <h2 className="text=center">Populating affiliates data....</h2>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
        }

      {/* for modal Add */}
      <Modal
        isOpen={modalAddState}
        toggle={hideModalAddState}
        className="modals modal-success"
      >
        <ModalHeader>Add Affiliates</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <h1>Create Affiliates</h1>
            <p className="text-muted">Please fill out all the fields</p>
            {imagePrev}
            <Input 
            type="file" 
            name="file" 
            id="exampleFile" 
            accept="image/*"
            required
            onChange={ (e) => handleImageChange(e)} />
            <br></br>
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
                type="number"
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
            


          <hr></hr>
          <Button className="mr-2" color="primary" type="submit">
            Save
          </Button>
          <Button color="secondary" onClick={hideModalAddState}>
            Cancel
          </Button>

          </Form>
        </ModalBody>
        {/* <ModalFooter>
          
        </ModalFooter> */}
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
            {logo ?
            <>
              {
                console.log(imagePrev)
              }
              <div className="holder-logo">
                <img style={{maxHeight:120, maxWidth:120}} src={imagePrev ? imagePrev.props.src : logo}/>
                
                <Input 
                type="file" 
                name="uploadFileLogo" 
                id="uploadFileLogo" 
                accept="image/*"
                required
                onChange={ (e) => handleImageChange(e)} />
                <label htmlFor="uploadFileLogo" className="label-upload">
                  <span className="fa fa-camera"></span>
                </label>
              </div>
            </>
              : ''
            }
            <InputGroup className="mb-3">
              {/* <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon> */}
              <div style={{flex: '1 1 auto', width: '100%'}}>Name:</div>
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
            <div style={{flex: '1 1 auto', width: '100%'}}>Contact Details:</div>
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
            <div style={{flex: '1 1 auto', width: '100%'}}>Address:</div>
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
          <Form onSubmit={handleAddItemSubmit}>
            {
              editItem ? 
              <h1>Edit Item</h1>
              :
              <h1>View/Add Branch Items</h1>
            }
            <p className="text-muted">Please fill out the field</p>

            {imagePrevSmall}
              <Input 
              type="file" 
              name="file" 
              id="exampleFile" 
              accept="image/*"
              required
              onChange={ (e) => handleImageChange(e)} />
             <br />

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
                type="number"
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
              type="select" 
              name="status" 
              id="status" 
              value={status}
              onChange={e => onItemChange(e)}>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </Input>
            <Input 
              type="select" 
              name="recommended" 
              id="recommended" 
              value={recommended}
              onChange={e => onItemChange(e)}>
              <option value="Yes">Recommended</option>
              <option value="No">Not Recommended</option>
            </Input>
              {/* <Input
                type="text"
                placeholder="Status"
                autoComplete="status"
                name="status"
                value={status}
                onChange={e => onItemChange(e)}
                required
              /> */}
            </InputGroup>
            {
              editItem ? (
                <div>
                  <Button className="mr-2" color="success" onClick={e => onItemUpdate(e)}>
                    Update
                  </Button>
                  <Button color="danger" onClick={hideModalEditState}>
                    Cancel
                  </Button>
                </div>
              )              
              : 
              <div>
                {
                    !addingItem ? (
                      <Button 
                        color="primary"  
                        type="submit">
                        Add
                      </Button>
                  ) : (
                    <div className="holder-loader">
                      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                  )
                }
              </div>
            }
          </Form>
          {/* <Button color="primary" onClick={e => onAddItem(e)}>
            Add
          </Button> */}
          <br />
          <br />
          {
            editItem ? null :
            <div className="holder-table">
              <Table bordered id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Logo</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Recommended</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map(x => {
                    // console.log(x);

                    count++;
                    return (
                      <tr id={x._id} key={x._id}>
                        <th scope="row">{count}</th>
                        <td><img style={{maxWidth: 30, maxHeight: 30}} src={x.logo}/></td>
                        <td>{x.item_name}</td>
                        {/* <td>
                          <input 
                          className={readOnlyInput ? 'readOnly' : ''}
                          type="text" 
                          value={x.item_name} 
                          readOnly={readOnlyInput}
                        />
                        </td> */}
                        <td>{x.price}</td>
                        <td>{x.status}</td>
                        <td>{x.recommended}</td>
                        <td>         
                          <ReactTooltip id="edit" type="warning" effect="solid">
                            <span>edit</span>
                          </ReactTooltip>          
                          <Button
                            color="success"
                            onClick={() => {
                              onEditItem(x._id);                              
                            }}
                          >
                            <span
                              className="fa fa-edit"
                              data-tip
                              data-for="edit"
                            />
                          </Button>
                          
                          <ReactTooltip id="delete" type="warning" effect="solid">
                            <span>delete</span>
                          </ReactTooltip>
                          <Button
                            color="danger"
                            className="ml-1"
                            onClick={() => {
                              onDeleteItem(x._id);
                              console.log(x._id);
                            }}
                          >
                            <span
                              className="fa fa-trash"
                              data-tip
                              data-for="delete"
                            />
                          </Button>
                          
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          }
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
