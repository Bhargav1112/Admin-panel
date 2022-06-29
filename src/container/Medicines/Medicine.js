import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import MedicineDataTable from "./MedicineData";

function Medicine() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleClickOpen = (id) => {
    setOpen(true);
    setEditId(id);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const insertToLocalStorage = (values, action) => {
    const localData = JSON.parse(localStorage.getItem("medicine"));
    let id = Math.floor(Math.random() * 1000 + 1);
    let data = {
      id,
      ...values,
    };
    if (!localData) {
      localStorage.setItem("medicine", JSON.stringify([data]));
    } else {
      localData.push(data);
      localStorage.setItem("medicine", JSON.stringify(localData));
    }
    dataMethod();
    handleClose();
    action.resetForm();
  };

  const updateHandler = (values, action) => {
    const localData = JSON.parse(localStorage.getItem("medicine"));
    const existingItem = localData.find((item) => item.id === editId);
    const updatedItem = { ...existingItem, ...values };
    const existingItemIndex = localData.findIndex((item) => item.id === editId);
    localData[existingItemIndex] = updatedItem;
    localStorage.setItem("medicine", JSON.stringify(localData));
    dataMethod();
    handleClose();
    action.resetForm();
    setIsEditing(false);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    price: yup.number().positive().required("Required"),
    expiry: yup.string().required("Please enter expiry date"),
    quantity: yup.number().positive().integer().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      expiry: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: isEditing ? updateHandler : insertToLocalStorage,
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    formik;

  let dataMethod;
  const onDisplayData = (method) => {
    dataMethod = method;
  };

  return (
    <div>
      <h1>MEDICINES.</h1>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add +
        </Button>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Add new Medicine</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Medicine name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
              />
              {errors.name && touched.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
              )}
              <TextField
                name="price"
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              {errors.price && touched.price && (
                <p style={{ color: "red" }}>{errors.price}</p>
              )}
              <TextField
                name="quantity"
                margin="dense"
                id="quantity"
                label="Quantity"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
              />
              {errors.quantity && touched.quantity && (
                <p style={{ color: "red" }}>{errors.quantity}</p>
              )}
              <TextField
                name="expiry"
                margin="dense"
                id="expiry"
                label="Expiry date"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.expiry}
              />
              {errors.expiry && touched.expiry && (
                <p style={{ color: "red" }}>{errors.expiry}</p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{!isEditing ? "Add" : "Update"}</Button>
            </DialogActions>
          </form>
        </Dialog>
        <MedicineDataTable
          onAdd={onDisplayData}
          onEdit={handleClickOpen}
          formik={formik}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
}

export default Medicine;
