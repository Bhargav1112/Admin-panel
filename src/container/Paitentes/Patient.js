import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import PatientData from "./PatientData";
import { useDispatch, useSelector } from "react-redux";
import {
    addPatient,
    fetchPatient,
    updatePatient,
} from "../../redux/action/patientAction";

function Patient(props) {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // let renderDataFun;
    const patientData = useSelector((state) => state.patient);
    const dispatch = useDispatch();

    const { patients, isLoading, error } = patientData;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        formik.resetForm();
    };

    // const onAddData = (renderData) => {
    //     renderDataFun = renderData;
    // };

    useEffect(() => {
        dispatch(fetchPatient());
    }, [dispatch]);

    const dataToLocalStorage = (values, action) => {
        // const localData = JSON.parse(localStorage.getItem("patient"));
        const id = Math.trunc(Math.random() * 10000 + 1);
        const finalData = {
            id,
            ...values,
        };
        // if (!localData) {
        //     localStorage.setItem("patient", JSON.stringify([finalData]));
        // } else {
        //     localData.push(finalData);
        //     localStorage.setItem("patient", JSON.stringify(localData));
        // }
        // renderDataFun();
        dispatch(addPatient(finalData));
        setOpen(false);
        action.resetForm();
    };

    const updateHandler = (values, action) => {
        // const localData = JSON.parse(localStorage.getItem("patient"));
        // const existingItemIndex = localData.findIndex(
        //     (data) => data.id === values.id
        // );
        // localData[existingItemIndex] = { ...values };
        // localStorage.setItem("patient", JSON.stringify(localData));

        dispatch(updatePatient(values));
        setOpen(false);
        // renderDataFun();
        action.resetForm();
    };

    const schema = yup.object().shape({
        name: yup.string().required("Required"),
        phone: yup
            .string()
            .max(10, "Max 10 digits allowed")
            .required("Required"),
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
        onSubmit: isEditing ? updateHandler : dataToLocalStorage,
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
        formik;

    return (
        <>
            {isLoading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : error ? (
                <p style={{ textAlign: "center" }}>{error}</p>
            ) : (
                <>
                    <h1 style={{ marginBottom: "3rem" }}>PATIENT DATA</h1>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add +
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add New Patient Information</DialogTitle>
                        <form onSubmit={handleSubmit}>
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
                                    <p style={{ color: "red" }}>
                                        {errors.name}
                                    </p>
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
                                    <p style={{ color: "red" }}>
                                        {errors.phone}
                                    </p>
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
                                    <p style={{ color: "red" }}>
                                        {errors.address}
                                    </p>
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
                                    <p style={{ color: "red" }}>
                                        {errors.ward}
                                    </p>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">
                                    {isEditing ? "Update" : "Add"}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                    {/* data-table */}
                    <PatientData
                        // onAdd={onAddData}
                        onEdit={handleClickOpen}
                        isEditing={setIsEditing}
                        formik={formik}
                        patientData={patients}
                    />
                </>
            )}
        </>
    );
}

export default Patient;
