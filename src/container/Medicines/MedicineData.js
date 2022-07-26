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
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicine } from "../../redux/action/medicine-action";

export default function MedicineDataTable(props) {
  const [tableData, setTableData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [data, setData] = useState(0);
  const dispatch = useDispatch();
  const medicineData = useSelector((state) => state.medicine);
  console.log(medicineData);
  const handleClickOpenAlert = (params) => {
    setOpenAlert(true);
    setData(params);
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
    props.onEdit();
    props.formik.setValues(editRowData.row);
    props.setIsEditing(true);
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

  const { medicines, isLoading } = medicineData;

  useEffect(() => {
    dispatch(fetchMedicine());
  }, []);

  useEffect(() => {
    setTableData(medicines);
  }, [medicines]);

  props.onAdd(onAddMedicine);

  const searchHandler = (event) => {
    const enteredString = event.target.value;
    const localData = JSON.parse(localStorage.getItem("medicine"));
    const searchedData = medicines.filter(
      (med) =>
        med.name.toLowerCase().includes(enteredString.toLowerCase()) ||
        med.price.toString().includes(enteredString) ||
        med.quantity.toString().includes(enteredString) ||
        med.expiry.toString().includes(enteredString)
    );
    setTableData(searchedData);
  };

  return (
    <>
      <TextField
        margin="dense"
        id="search"
        label="Medicine search"
        type="text"
        variant="standard"
        onChange={searchHandler}
        name="search"
      />
      <div style={{ height: 400, width: "100%" }}>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        )}
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
