import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data); // Store the profile data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await logout(); // Log the user out after deletion
      navigate("/register"); // Redirect to signup or any other appropriate page
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col md={32} >
          <Card >
            <Card.Body className="text-center">
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {profile.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {profile.email}
              </Card.Text>
              <Button variant="danger" onClick={handleDeleteProfile}>
                Delete Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
