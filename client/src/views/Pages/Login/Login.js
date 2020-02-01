import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


function Login({...props}) {


  // const { history } = props
  console.log(props)

  const [value, setValue] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('submit')

    if (value.username == 'admin' && value.password == 'admin') {
      localStorage.setItem('token', 'token123')
      props.history.push('/')
    }
  }

  const handleOnchange = (e) => {
    e.persist()
    console.log(e.target.value)
    console.log(e.target.name)

    setValue(prevState =>({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  console.log(value)

  return (
    <>
      {
        localStorage.getItem('token') ? (
          <Redirect to="/" />
        ) : (
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="4">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form onSubmit={handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" 
                              name="username"
                              onChange={handleOnchange}

                            placeholder="Username" autoComplete="username" />
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" 
                              name="password"
                              onChange={handleOnchange}
                            
                            placeholder="Password" autoComplete="current-password" />
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <Button color="primary" className="px-4" type="submit">Login</Button>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                      <CardBody className="text-center">
                        <div>
                          <h2>Sign up</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                          <Link to="/register">
                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                          </Link>
                        </div>
                      </CardBody>
                    </Card> */}
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    </>
  )
}

export default Login

