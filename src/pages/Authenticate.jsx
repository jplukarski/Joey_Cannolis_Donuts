import React, {useState, useCallback} from 'react'
import {withRouter} from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import app from '../base'
import Alert from 'react-bootstrap/Alert'

const Authenticate = ({history}) => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailTaken, setEmailTaken] = useState(false)
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(false)

  const handleSignUp = useCallback(async event => {
      event.preventDefault();
      try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // console.log(result.user.uid, result.user.email)
                createBraintreeUser(result.user.uid, result.user.email)
            })
        // history.push("/");
      } catch (error) {
          console.log(error)
          if(error.code === "auth/email-already-in-use"){ 
              setEmailTaken(true)
            }
      }
  }, [history, email, password]);

  const createBraintreeUser = (id, email) => {
    fetch('https://payments.sandbox.braintree-api.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': 'aDJrcmdqeDNxajd0c3A2dzplMmU3MzUyMGRhMDQzNTQ3ZDM4NWM4Y2ZhNjkxNmJkOQ==',
            'Braintree-Version': '2020-06-24',
            'Content-Type': 'application/json',
        },
        body: `{"query":"mutation CreateCustomer($input: CreateCustomerInput!){createCustomer(input: $input){customer {id email legacyId}}}","variables":{"input":{"customer":{"email":"${email}"}}}}`
    })
        .then(res => res.json())
        .then(result => {
            // setClientToken(result.data.createClientToken.clientToken)
            console.log(result)
            app
            .firestore()
            .collection('braintree_ids')
            // .add(id)
            .doc(id)
            .set({bt_id:result.data.createCustomer.customer.id})
        })
        .then(() => history.push("/"))
  }

  const handleLogin = useCallback(
      async event => {
          event.preventDefault();
          try {
              await app
                .auth()
                .signInWithEmailAndPassword(email, password);
            history.push("/");
          } catch (error) {
              console.log(error)
              if(error.code === 'auth/wrong-password' || 'auth/user-not-found') {
                  setWrongEmailOrPassword(true)
              }
          }
      }, [history, email, password]
  );

  function toggleHasAccount() {
    setHasAccount(!hasAccount);
  }

function handleEmailChange(e){
    setEmail(e.target.value)
}

function handlePasswordChange(e) {
    setPassword(e.target.value)
}

  return (
      <>
      <Container>
        <Row className="justify-content-md-center">
            <Form>
                <Jumbotron>
                    {!hasAccount ? <h1>Sign Up!</h1> : <h1>Welcome Back!</h1>}
                </Jumbotron>
                {emailTaken ? <Alert variant={"danger"}>Email address is taken.</Alert> : ''}
                {wrongEmailOrPassword ? <Alert variant={"danger"}>Email address or Password not correct.</Alert> : ''}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
                </Form.Group>

                <Button
                variant={!hasAccount ? "info" : "light"}
                block
                onClick={!hasAccount ? toggleHasAccount : handleLogin}
                >
                    {!hasAccount ? <span>I have an account</span> : <span>Log In</span>}
                </Button>

                <Button
                variant={!hasAccount ? "light" : "info"}
                block
                onClick={!hasAccount ? handleSignUp : toggleHasAccount}
                >
                    {!hasAccount ? <span>Sign Up</span> : <span>I don't have an account</span>}
                </Button>
            </Form>
        </Row>
      </Container>
      </>
  );
}

export default withRouter(Authenticate)