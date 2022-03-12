import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { UserContext } from "./UserModules";
export function AddUser(props) {
  const { adduser } = useContext(UserContext);
  const [newuser, setnewuser] = useState({
    name: "",
    email: "",
    number: "",
    address: {
      city: "",
      street: "",
      suite: "",
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewuser((currentuser) => {
      if (name === "suite" || name === "street" || name === "city") {
        return {
          ...currentuser,
          address: { ...currentuser.address, [name]: value },
        };
      } else {
        return { ...currentuser, [name]: value };
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    adduser(newuser);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">ADD USER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={newuser.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={newuser.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Number</label>
          </div>
          <div>
            <input
              type="text"
              name="number"
              placeholder="Enter phone number"
              value={newuser.number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City</label>
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={newuser.address.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Street</label>
          </div>
          <div>
            <input
              type="text"
              name="street"
              placeholder="Enter street"
              value={newuser.address.street}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Suite</label>
          </div>
          <div>
            <input
              type="text"
              name="suite"
              placeholder="Enter suite"
              value={newuser.address.suite}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Add User" onClick={props.onHide} />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
