import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/derma_forgot_password.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    navigate("/dermatologist/emailverification");
    // TODO: Add actual password reset logic
  };

  const handleLogin = () => {
    navigate("/dermatologist/derma_login");
  };

  return (
    <Container fluid className="vh-100 d-flex">
      <Row className="flex-grow-1 w-100 m-0 h-100">
        {/* Left Image */}
        <Col
          md={7}
          className="d-none d-md-block p-0"
          style={{
            backgroundImage: `url("/icons/background.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right Form */}
        <Col
          xs={12}
          md={5}
          className="d-flex flex-column justify-content-start bg-white vh-auto overflow-auto p-0"
        >
          {/* Header */}
          <div
            className="text-white text-center w-100 mb-4"
            style={{
              backgroundColor: "#2962FF",
              fontSize: "28px",
              fontWeight: "bold",
              padding: "20px 0",
              borderRadius: "0 0 20px 20px",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 className="mb-0" style={{ fontSize: "38px" }}>
              Forgot Password
            </h3>
          </div>

          {/* Logos */}
          <div className="text-center d-flex flex-column align-items-center mb-4">
            <img
              src="/icons/biggerlogodermascan.png"
              alt="DERMAScan Logo"
              style={{ width: "9rem"}}
            />
            <img
              src="/icons/DermaScan.png"
              alt="DERMAScan Text"
              style={{ width: "8rem" }}
            />
          </div>

          {/* Instruction */}
          <p className="text-center text-muted mb-4 fw-semibold" style={{ fontSize: "0.9rem" }}>
            Please enter your email to reset the password
          </p>

          {/* Form */}
          <Form className="d-flex flex-column align-items-center justify-content-center">
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 border-bottom rounded-0 ps-0 pe-3"
                style={{ boxShadow: "none", width: "20rem" }}
              />
            </Form.Group>

            <Button
              onClick={handleResetPassword}
              className="mb-3 d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#2962FF",
                border: "none",
                borderRadius: "8px",
                padding: "12px 0",
                fontWeight: "bold",
                fontSize: "16px",
                width: "20rem",
              }}
            >
              Reset Password
            </Button>
          </Form>

          {/* Back to Login */}
          <div className="text-center mt-3">
            <Button
              variant="link"
              onClick={handleLogin}
              className="back-login"
            >
              ← Back to log in
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
