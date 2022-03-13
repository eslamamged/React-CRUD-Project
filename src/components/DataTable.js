import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { AddUser } from "./AddUser";
import EditUser from "./EditUser";
import Showuser from "./Showuser";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { UserContext } from "./UserModules";
import { FaTrashAlt, FaUserPlus } from "react-icons/fa";
export default function DataTable() {
  const [modalShow, setModalShow] = useState(false);
  const { users, deleteuser } = useContext(UserContext);
  return (
    <div>
      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span
          className="align-self-center"
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          Users
        </span>

        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{ margin: "10px" }}
        >
          Add New User <FaUserPlus />
        </Button>
        <AddUser show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={uuid()}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.address?.suite}
                {user.address?.street}
                {user.address?.city}
              </td>
              <td>
                <EditUser data={user} />
              </td>
              <td>
                <Button onClick={(e) => deleteuser(e, user.id)}>
                  Delete user <FaTrashAlt />
                </Button>
              </td>
              <td>
                <Showuser data={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
