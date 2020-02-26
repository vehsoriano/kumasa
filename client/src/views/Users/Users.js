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

function Users() {
  const [riders, setTableData] = useState([]);

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
  useEffect(() => {
    getData();
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
    </div>
  )
}

export default Users;
