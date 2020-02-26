import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import usersData from './UsersData'
import axios from "axios";

// import usersData from './UsersData'

function User({...props})  {

  console.log(props)

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

  const user = riders.find( user => user.id.toString() === props.match.params.id)

  const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>Rider id: {props.match.params.id}</strong>
            </CardHeader>
            <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      userDetails.map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )

}

export default User;
