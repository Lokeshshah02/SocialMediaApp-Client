import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // New user data should be fetched from a form
  const dummyUser = {
    first_name: "raj",
    last_name: "davan",
    email: "dav@123.com",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  };

  //moved the axios from useEffect to here
  const fetchUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.log(error));
  };

  const createNewUser =() => {
    axios
      .post("http://localhost:4000/users", dummyUser) //we have to pass dummyUser to get the data as its a second parameter
      // .then((response) => console.log(response.data.message))
      .then((response) => fetchUsers())
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <NavbarComponent />
      <Container>
        <Row>
          {users.map((user, index) => (
            <Col md={4} key={index}>
              <Card style={{ width: "18rem", margin: "10px auto" }}>
                <Card.Img variant="top" src={user.avatar} />
                {/*  //fetching it from the api */}
                <Card.Body>
                  <Card.Title>{user.first_name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Button variant="dark">connect</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button variant="dark" onClick={createNewUser}>
          Add User
        </Button>
      </Container>
    </div>
  );
}

export default App;
