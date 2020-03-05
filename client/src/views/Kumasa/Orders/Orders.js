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
  Table
} from "reactstrap";

// const userData = [
//   {
//     id: 1,
//     order_number: "KUMASAX0001",
//     order_total: 250,
//     order_branch: "Kumasa001",
//     status: "Delivered"
//     order_date: "Jan 20, 2020",

//     first_name: "John",
//     last_name: "Doe",
//     phone_number: "09200000000",
//     email: "johndoe@gmail.com",
//     address: "15-8 San francisco st. Fiesta communities Tabun",
//     city: "Angeles City",
//     province: "Pampanga",
//
//   },
//   {
//     id: 2,
//     order_number: "KUMASAX0002",
//     order_total: 250,
//     order_branch: "Kumasa002",
//     status: "Delivered"
//     order_date: "Jan 21, 2020",
//
//     first_name: "Jane",
//     last_name: "Doe",
//     phone_number: "09211111111",
//     email: "janedoe@gmail.com",
//     address: "15-8 San francisco st. Fiesta communities Tabun",
//     city: "Angeles City",
//     province: "Pampanga",
//
//
//   }
// ];

function Orders() {
  const [modalState, setModalState] = useState(false);
  const [modalTrack, setModalTrack] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([]); // ID for current view
  const [currentOrderRider, setCurrentOrderRider] = useState('') // ID for current Rider
  const [orderData, setOrderData] = useState([]); // All User Order Data
  const [branchData, setBranchData] = useState([]); // All User Order Data
  const [items, setItems] = useState([]); // All User Order Data
  const [loading, setLoading] = useState(false);

  function getOrderItems(orderId) {
    // console.log("yes");
    axios
      .get(`api/order/ordersItem/${orderId}`)
      .then(res => {
        // console.log(res.data)
        setItems(res.data);

        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getData() {
    // console.log("yes");
    axios
      .get("api/order/orders")
      .then(res => {
        console.log(res.data);
        setOrderData(res.data);
        // setCurrentOrder(res.data);
        // setLoader(true)
        setLoading(true);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function getBranchData() {
    console.log("yes");
    axios
      .get("api/branch")
      .then(res => {
        console.log('------------------------------------------')
        console.log(res.data)
        setBranchData(res.data);

        // setLoader(true)
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
    getBranchData();
  }, []);

  // useEffect(() => {
  //   getOrderItems(currentOrder)
  // }, [currentOrder])

  console.log(currentOrder);

  const handleViewOrder = () => {
    setModalState(true);
  };

  const hideModal = () => {
    setModalState(false);
    getData();
    // setCurrentOrder("");
  };

  const viewTrack = () => {
    setModalTrack(true);
  };

  const hideModalTrack = () => {
    setModalTrack(false);
  };

  const columns = [
    {
      Header: "Order Number",
      accessor: "order_number"
    },
    {
      Header: "Name",
      id: "fullName",
      accessor: row => `${row.first_name} ${row.last_name}`
    },
    {
      Header: "Phone",
      accessor: "phone_number"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Order Total",
      id: "orderTotal",
      accessor: row =>
        `${parseInt(row.order_total) + parseInt(row.delivery_fee)}`
    },
    {
      Header: "Status",
      id: "status",
      accessor: d => d.status.toString()
    },
    {
      Header: "Actions",
      sortable: false,
      // filterable: false,
      Cell: row => (
        <div className="button-wrapper">
          <div className="button-holder">
            <button className="btn-icon" onClick={() => {
              viewTrack()

              let datas = [...orderData];
              console.log({ USERS: datas[row.index] });

              setCurrentOrderRider(datas[row.index]);
            }}>
              <span className="icon-holder">
                <span className="icon-location-pin" data-tip data-for="edit" />
              </span>
            </button>
            <ReactTooltip id="edit" type="warning" effect="solid">
              <span>Track</span>
            </ReactTooltip>
          </div>
          <div className="button-holder">
            <button
              className="btn-icon"
              onClick={() => {
                handleViewOrder();

                let datas = [...orderData];
                console.log({ USERS: datas[row.index] });

                setCurrentOrder(datas[row.index]);
                getOrderItems(datas[row.index].order_id);
                console.log(datas[row.index].order_id);
              }}
            >
              <span className="icon-holder">
                <span className="fa fa-eye" data-tip data-for="view"></span>
                {/* <IconDelete
                  className='icon-actions'
                  
                /> */}
              </span>
            </button>
            <ReactTooltip id="view" type="warning" effect="solid">
              <span>View</span>
            </ReactTooltip>
          </div>
        </div>
      )
    }
  ];

  // const branchDetails = [
  //   {
  //     branch_id: "Kumasa001",
  //     branch: "Mcdonalds Angeles",
  //     contact: "8001",
  //     address: "Angeles City"
  //   },
  //   {
  //     branch_id: "Kumasa002",
  //     branch: "Jollibee Angeles",
  //     contact: "87000",
  //     address: "Sto Rosario St. Angeles City"
  //   },
  //   {
  //     branch_id: "Kumasa003",
  //     branch: "KFC Angeles",
  //     contact: "1111",
  //     address: "AC"
  //   }
  // ];
  // const items = [
  //   {
  //     id: "1",
  //     item_name: "Mcdonalds Burger",
  //     qty: "5",
  //     price: "50",
  //     total: "250"
  //   },
  //   {
  //     id: "2",
  //     item_name: "Mcdonalds Chicken",
  //     qty: "2",
  //     price: "50",
  //     total: "250"
  //   },
  //   {
  //     id: "3",
  //     item_name: "Mcdonalds Fries",
  //     qty: "2",
  //     price: "50",
  //     total: "250"
  //   }
  // ];

  console.log(currentOrder);

  const {
    order_number,
    // order_total,
    order_branch,
    first_name,
    last_name,
    phone_number,
    email,
    address,
    city,
    province,
    order_date,
    order_address,
    order_reservation_time,
    order_request,
    // rider_first_name,
    // rider_last_name,
    // rider_code,
    // rider_phone_number
  } = currentOrder;
  var totalAmount = 0;

  const {
    rider_id,
    rider_code,
    rider_first_name,
    rider_last_name,
    rider_phone_number,
    rider_email,
    status,
  } = currentOrderRider

  console.log(rider_code)

  return (
    <React.Fragment>
      {loading ? (
        <CustomTable data={orderData} columns={columns} />
      ) : (
        <div className="holder-loader">
          <h2 className="text=center">Populating orders data....</h2>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalTrack}
        toggle={hideModalTrack}
        className="modals modal-success"
      >
        <ModalHeader>Track Details</ModalHeader>
        <ModalBody>
          <h4>Rider Details</h4>
            <hr />
            <div className="holder-details">
              <div className="holder-key">Delivery Status:</div>
              <div className="holder-value">
                {
                  status === 'Accepted' ? <h5 style={{color: 'yellowgreen'}}>{status}</h5> :
                  status === "Pending" ? <h5 style={{color: 'orange'}}>{status}</h5> :
                  status === "Delivered" ? <h5 style={{color: 'green'}}>{status}</h5> :
                  status === "Rejected" ? <h5 style={{color: 'red'}}>{status}</h5> : null
                }
              </div>
            </div>
          {
            rider_id ? (
              <>                
                <div className="holder-details">
                  <div className="holder-key">Rider ID:</div>
                  <div className="holder-value">{rider_id}</div>
                </div>
                <div className="holder-details">
                  <div className="holder-key">Rider Name:</div>
                  <div className="holder-value">{rider_last_name}, {rider_first_name}</div>
                </div>
                <div className="holder-details">
                  <div className="holder-key">Rider Contact #:</div>
                  <div className="holder-value">{rider_phone_number}</div>
                </div>          
                <div className="holder-details">
                  <div className="holder-key">Rider Email:</div>
                  <div className="holder-value">{rider_email}</div>
                </div>
              </>
            ) : (
              null
            )
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={hideModalTrack}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalState}
        toggle={hideModal}
        className="modals modal-primary"
      >
        <ModalHeader>Order Details</ModalHeader>
        <ModalBody>
          <h4>Customer Details</h4>
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
          {order_address ? (
            <div className="holder-details">
              <div className="holder-key">Delivery Address:</div>
              <div className="holder-value">{order_address}</div>
            </div>
          ) : null}

          {order_request ? (
            <div className="holder-details">
              <div className="holder-key">Other Request:</div>
              <div className="holder-value">{order_request}</div>
            </div>
          ) : null}

          {order_reservation_time ? (
            <div className="holder-details">
              <div className="holder-key">Delivery Time:</div>
              <div className="holder-value">{order_reservation_time}</div>
            </div>
          ) : null}

          <br />
          <h4>Branch Details</h4>
          <hr />

          {branchData
            .filter(x => x.name === order_branch)
            .map(x => {
              return (
                <div key={x.name}>
                  {x.logo ? (
                    <div style={{ marginBottom: "5px" }}>
                      <img
                        style={{ maxWidth: 75, maxHeight: 75 }}
                        src={x.logo}
                      />
                    </div>
                  ) : (
                    ""
                  )}
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
                <th>Logo</th>
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
                    <td>
                      <img
                        style={{ maxWidth: 30, maxHeight: 30 }}
                        src={x.logo}
                      />
                    </td>
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
                <th id="total" colSpan="5">
                  Subtotal :
                </th>
                <td>{totalAmount}</td>
              </tr>
              <tr>
                <th id="total" colSpan="5">
                  Delivery Fee :
                </th>
                <td>{59}</td>
              </tr>
              <tr>
                <th id="total" colSpan="5">
                  Total :
                </th>
                <td>{totalAmount + 59}.00</td>
              </tr>
            </tfoot>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={hideModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default Orders;
