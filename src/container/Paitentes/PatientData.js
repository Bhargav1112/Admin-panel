import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { deletePatient } from "../../redux/action/patientAction";

export default function PatientData(props) {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const dispatch = useDispatch();

    // console.log(props.patientData);

    useEffect(() => {
        setData(props.patientData);
    }, [props.patientData]);

    const handleClickOpen = (params) => {
        setOpen(true);
        setDeleteId(params.id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const showData = () => {
    //     const localData = JSON.parse(localStorage.getItem("patient"));
    //     if (!localData) return;
    //     setData(localData);
    // };

    const deleteHandler = () => {
        // const localData = JSON.parse(localStorage.getItem("patient"));
        // const updatedData = localData.filter(
        //     (patient) => patient.id !== deleteId
        // );
        // localStorage.setItem("patient", JSON.stringify(updatedData));
        dispatch(deletePatient(deleteId));
        setOpen(false);
        // showData();
    };

    const editHandler = (params) => {
        props.onEdit();
        props.isEditing(true);
        props.formik.setValues(params.row);
    };

    // useEffect(() => {
    //     showData();
    // }, []);

    // props.onAdd(showData);

    const columns = [
        { field: "name", headerName: "Name", width: 270 },
        { field: "phone", headerName: "Contact No.", width: 150 },
        { field: "address", headerName: "Address", width: 300 },
        { field: "ward", headerName: "Ward", width: 100 },
        {
            field: "action",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            aria-label="edit"
                            onClick={editHandler.bind(null, params)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={handleClickOpen.bind(null, params)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];
    return (
        <>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteHandler} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
