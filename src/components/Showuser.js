import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye } from "react-icons/fa";

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
export default function Showuser({ data }) {
  const [user] = useState({
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

  return (
    <div>
      <Button onClick={handleOpen}>
        Show User <FaEye />
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span style={{ fontWeight: "bold" }}>User Info</span>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div>
                <span style={{ fontWeight: "bold" }}>Name</span> : {user.name}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Email</span> :{user.email}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Phone Number</span> :
                {user.phone}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Address</span> :
                {user.address.suite} {user.address.street}
                {user.address.city}
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
