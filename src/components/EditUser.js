import React, { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserModules";
import { FaUserEdit } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditUser({ data }) {
  const { edituser } = useContext(UserContext);
  const [newuser, setnewuser] = useState({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: {
      suite: data.address.suite,
      street: data.address.street,
      city: data.address.city,
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    edituser(newuser);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        Edit User <FaUserEdit />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              style={{ textAlign: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Edit User
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
                    name="phone"
                    placeholder="Enter phone number"
                    value={newuser.phone}
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
                  <input type="submit" value="Save" />
                </div>
              </Form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
