import React, { useState } from 'react';
import {
  Container,
  Button,
  Navbar,
  Nav,
  Offcanvas,
  Form,
  Modal,
  Alert,
  Spinner,
} from 'react-bootstrap';
import sha256 from 'js-sha256';

export default function HomePage({ login }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showRegisterSuccessAlert, setShowRegisterSuccessAlert] = useState(false);

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('');
    setShowRegisterSuccessAlert(false);

    if (!regUsername.trim() || !regEmail.trim() || !regContact.trim() || !regPassword) {
      setRegisterError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(regEmail)) {
      setRegisterError('Invalid email address');
      return;
    }
    if (!passwordRegex.test(regPassword)) {
      setRegisterError('Password must be at least 8 characters with uppercase, lowercase, number, and symbol');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(
      (user) => user.username === regUsername || user.email === regEmail
    );

    if (userExists) {
      setRegisterError('Username or email already registered');
      return;
    }

    users.push({
      username: regUsername,
      email: regEmail,
      contact: regContact,
      password: sha256(regPassword), // hash password here
    });
    localStorage.setItem('users', JSON.stringify(users));

    setShowRegisterSuccessAlert(true);
  };

  const onRegisterSuccessClose = () => {
    setShowRegisterSuccessAlert(false);
    setShowRegisterModal(false);
    setShowLoginModal(true);
    setLoginMessage('Registration successful! Please login.');
    setRegUsername('');
    setRegEmail('');
    setRegContact('');
    setRegPassword('');
    setRegConfirmPassword('');
    setRegisterError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginMessage('');
    setIsLoginLoading(true);

    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const userFound = users.find(
        (user) =>
          user.username === loginUsername.trim() &&
          user.password === sha256(loginPassword) // hash login password for comparison
      );

      if (userFound) {
        login(loginUsername.trim(), loginPassword);
        setShowLoginModal(false);
        setLoginUsername('');
        setLoginPassword('');
        setLoginError('');
        setLoginMessage('');
      } else {
        setLoginError('Invalid username or password');
      }

      setIsLoginLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="px-3">
        <Navbar.Brand>
          <span
            className="blink-text"
            style={{
              fontFamily: "'Brush Script MT', cursive",
              fontSize: '1.5rem',
            }}
          >
            EatMuch
          </span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setShowOffcanvas(true)}
        />
        <Navbar.Collapse className="justify-content-end d-none d-lg-flex">
          <Nav>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
            <Button
              variant="outline-info"
              onClick={() => setShowRegisterModal(true)}
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            <Button
              variant="outline-info"
              onClick={() => {
                setShowLoginModal(true);
                setShowOffcanvas(false);
              }}
            >
              Login
            </Button>
            <Button
              variant="outline-info"
              onClick={() => {
                setShowRegisterModal(true);
                setShowOffcanvas(false);
              }}
            >
              Register
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          filter: 'brightness(0.5)',
        }}
      ></div>

      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center text-center text-white px-3"
        style={{ height: '100vh', position: 'relative', zIndex: 1 }}
      >
        <h1
          style={{
            fontFamily: "'Brush Script MT', cursive",
            fontSize: '4rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          }}
        >
          EatMuch
        </h1>
        <p className="fs-4 my-3">Discover and order your favorite party dishes with ease.</p>
        <Button
          size="lg"
          variant="outline-light"
          onClick={() => setShowRegisterModal(true)}
        >
          Order Now
        </Button>
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginMessage && <Alert variant="info">{loginMessage}</Alert>}
          {loginError && <Alert variant="danger">{loginError}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registerError && <Alert variant="danger">{registerError}</Alert>}
          {showRegisterSuccessAlert && (
            <Alert variant="success" onClose={onRegisterSuccessClose} dismissible>
              Registered successfully! Click OK to login now.
              <div className="mt-3 text-center">
                <Button onClick={onRegisterSuccessClose}>OK</Button>
              </div>
            </Alert>
          )}
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="regUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="tel"
                value={regContact}
                onChange={(e) => setRegContact(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                placeholder="Min 8 chars, uppercase, lowercase, number & symbol"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="regConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="info"
              type="submit"
              className="w-100"
              disabled={showRegisterSuccessAlert}
            >
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CSS for blinking EatMuch text */}
      <style type="text/css">{`
        .blink-text {
          animation: blink 1.5s linear infinite;
        }
        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
