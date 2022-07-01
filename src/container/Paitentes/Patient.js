import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";

function Patient(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataToLocalStorage = (values, action) => {
    console.log(values);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    phone: yup.number().max(10, "Max 10 digits allowed").required("Required"),
    address: yup.string().required("Required"),
    ward: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      ward: "",
    },
    validationSchema: schema,
    onSubmit: dataToLocalStorage,
  });

  const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
    formik;

  return (
    <>
      <h1 style={{ marginBottom: "3rem" }}>PATIENT DATA</h1>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add +
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient Information</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && (
            <p style={{ color: "red" }}>{errors.name}</p>
          )}
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="Contact Number"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
          />
          {errors.phone && touched.phone && (
            <p style={{ color: "red" }}>{errors.phone}</p>
          )}
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
          />
          {errors.address && touched.address && (
            <p style={{ color: "red" }}>{errors.address}</p>
          )}
          <TextField
            margin="dense"
            id="ward"
            name="ward"
            label="Ward"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ward}
          />
          {errors.ward && touched.ward && (
            <p style={{ color: "red" }}>{errors.ward}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Patient;
