import React, { useState, useEffect } from 'react'

import CustomTable from '../../../containers/Table'
import ReactTooltip from 'react-tooltip';
import { ReactComponent as IconDelete } from '../../../assets/img/icon-delete.svg';
import { ReactComponent as IconEdit } from '../../../assets/img/icon-edit.svg';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';


const userData = [
  {
    id: 1,
    order_number: 'KUMASAX0001',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '09200000000',
    email: 'johndoe@gmail.com',
    address: '15-8 San francisco st. Fiesta communities Tabun',
    city: 'Angeles City',
    province: 'Pampanga',
    order_date: 'Jan 20, 2020',
    status: false,
  },
  {
    id: 2,
    order_number: 'KUMASAX0002',
    first_name: 'Jane',
    last_name: 'Doe',
    phone_number: '09211111111',
    email: 'janedoe@gmail.com',
    address: '15-8 San francisco st. Fiesta communities Tabun',
    city: 'Angeles City',
    province: 'Pampanga',
    order_date: 'Jan 21, 2020',
    status: true,
  },
]

function Orders() {
  const [modalState, setModalState] = useState(false);  
  const [data, setData] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  

  useEffect(() => {
    setData(userData)
  }, [])

  console.log(currentOrder)

  const handleViewOrder = () => {
    setModalState(true)
  }

  const hideModal = () => {
    setModalState(false);
    setCurrentOrder('')
  };

  

  const columns = [
    {
      Header: 'Order Number',
      accessor: 'order_number'
    }, {
      Header: 'Name',
      id: 'fullName',
      accessor: row => `${row.first_name} ${row.last_name}`
    }, {
      Header: 'Phone',
      accessor: 'phone_number'
    }, {
      Header: 'Email',
      accessor: 'email'
    }, {
      Header: 'Phone Number',
      accessor: 'phone_number'
    }, {
      Header: 'Status',
      id: 'status',
      accessor: d => d.status.toString(),
    }, {
      Header: 'Actions',
      sortable: false,
      // filterable: false,
      Cell: row => (
        <div className='button-wrapper'>
          {/* <div className='button-holder'>
            <button
              className='btn-icon'
              onClick={() => {
            
              }}
            >
              <span className='icon-holder'>
                <IconEdit className='icon-actions' data-tip data-for='edit' />
              </span>
            </button>
            <ReactTooltip id='edit' type='warning' effect='solid'>
              <span>Edit</span>
            </ReactTooltip>
          </div> */}
          <div className='button-holder'>
            <button
              className='btn-icon'
              onClick={() => {
                handleViewOrder();

                let datas = [...userData];
                console.log({ USERS: datas[row.index]});
                
                setCurrentOrder(datas[row.index]);
              }}
            >
              <span className='icon-holder'>
                <IconDelete
                  className='icon-actions'
                  data-tip
                  data-for='view'
                />
              </span>
            </button>
            <ReactTooltip id='view' type='warning' effect='solid'>
              <span>View</span>
            </ReactTooltip>
          </div>
        </div>
      )
    }
  ]

  const {
    order_number,
    first_name,
    last_name,
    phone_number,
    email,
    address,
    city,
    province,
    order_date
  } = currentOrder

  return (
    <React.Fragment>
      <CustomTable
        data={data}
        columns={columns}
      />
      <Modal 
        isOpen={modalState} 
        toggle={hideModal}
        className='modals modal-primary'
      >
        <ModalHeader>Order Details</ModalHeader>
        <ModalBody>
          <h4>Customer Details</h4><hr/>
          <div className="holder-details">
            <div className="holder-key">Full Name:</div>
            <div className="holder-value">{first_name + ' ' + last_name}</div>
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
            <div className="holder-value">{address + ' ' + city + ' ' + province}</div>
          </div>

          <br/><h4>Branch Details</h4><hr/>
          <div className="holder-details">
            <div className="holder-key">Name:</div>
            <div className="holder-value">Mcdonalds Angeles</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Contact:</div>
            <div className="holder-value">87000</div>
          </div>
          <div className="holder-details">
            <div className="holder-key">Address:</div>
            <div className="holder-value">Sto Rosario St. Angeles City</div>
          </div>

          <br/><h4>Order Details</h4><hr/>
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
              <tr>
                <th scope="row">1</th>
                <td>Burger Mcdo</td>
                <td>1</td>
                <td>75</td>
                <td>75</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>Burger Fries</td>
                <td>1</td>
                <td>50</td>
                <td>50</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th id="total" colSpan="4">Total :</th>
                <td>125</td>
              </tr>
            </tfoot>
          </Table>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={hideModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default Orders
