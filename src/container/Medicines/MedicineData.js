import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function MedicineDataTable(props) {
  const [tableData, setTableData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [data, setData] = useState(null);

  const handleClickOpenAlert = (data) => {
    setOpenAlert(true);
    setData(data);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const deleteHandler = () => {
    const storagedata = JSON.parse(localStorage.getItem("medicine"));
    const filteredData = storagedata.filter((item) => item.id !== data.id);
    setTableData(filteredData);
    localStorage.setItem("medicine", JSON.stringify(filteredData));
    handleCloseAlert();
  };

  const editHandler = (editRowData) => {
    props.onEdit(editRowData.id);
    props.formik.setValues(editRowData.row);
    props.setIsEditing(true);
    setData(editRowData);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 400 },
    { field: "quantity", headerName: "Qty", width: 100 },
    { field: "expiry", headerName: "Exp. Date", width: 130 },
    { field: "price", headerName: "Price", width: 90 },
    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={editHandler.bind(null, params)}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleClickOpenAlert.bind(null, params)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const onAddMedicine = () => {
    const storageData = JSON.parse(localStorage.getItem("medicine"));
    if (!storageData) {
      return;
    }
    setTableData(storageData);
  };

  useEffect(() => {
    onAddMedicine();
  }, []);

  props.onAdd(onAddMedicine);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This data will be deleted permenantly...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button onClick={deleteHandler} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
