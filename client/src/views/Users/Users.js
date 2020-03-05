import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'
import axios from "axios";

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  console.log(user)

  const getBadge = (status) => {
    return status === 'online' ? 'success' :
      status === 'offline' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.name}</Link></td>
      <td>{user.rider_id}</td>
      {/* <td>{user.role}</td> */}
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
    </tr>
  )
}


function UsersRow(props) {
  const user = props.user
  const userLink = `/users/${user._id}`

  console.log(user)

  // const getBadge = (status) => {
  //   return status === 'online' ? 'success' :
  //     status === 'offline' ? 'danger' :
  //           'primary'
  // }

  // <th scope="col">id</th>
  //                   <th scope="col">name</th>
  //                   <th scope="col">phone number</th>
  //                   <th scope="col">email</th>
  //                   <th scope="col">status</th>

  return (
    <tr key={user._id}>
      <th scope="row"><Link to={userLink}>{user._id}</Link></th>
      <th scope="row">{user.first_name} {user.last_name}</th>
      <th scope="row">{user.phone_number}</th>
      <th scope="row">{user.email}</th>
      {/* <td><Link to={userLink}>{user.name}</Link></td> */}
      {/* <td>{user.rider_id}</td> */}
      {/* <td>{user.role}</td> */}
      {/* <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td> */}
    </tr>
  )
}


function Users() {
  const [riders, setTableData] = useState([]);
  const [users, setUsers] = useState([])

  function getData() {
    // console.log("yes");
    axios
      .get("api/users/riders")
      .then(res => {
        console.log(res.data);
        setTableData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getUsersData() {
    axios
      .get('api/users')
      .then(res => {
        console.log(res.data)
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    getData();
    getUsersData();
  }, []);


  const userList = usersData.filter((user) => user.id)

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={10}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Kumasa <small className="text-muted">Riders</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">registered</th>
                    {/* <th scope="col">id</th> */}
                    <th scope="col">status</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((user, index) =>
                    <UserRow key={index} user={user}/>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>



      <Row>
        <Col xl={10}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Kumasa <small className="text-muted">Customers</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">phone number</th>
                    <th scope="col">email</th>
                    {/* <th scope="col">status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) =>
                    <UsersRow key={index} user={user}/>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Users;
