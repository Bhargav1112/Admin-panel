import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function MedicineDataTable(props) {
    const [tableData, setTableData] = useState([]);
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
                const deleteHandler = (event) => {
                    const storagedata = JSON.parse(
                        localStorage.getItem("medicine")
                    );
                    const filteredData = storagedata.filter(
                        (item) => item.id !== params.id
                    );
                    setTableData(filteredData);
                    localStorage.setItem(
                        "medicine",
                        JSON.stringify(filteredData)
                    );
                };
                return (
                    <>
                        <Button
                            variant="contained"
                            style={{ marginRight: "5px" }}
                        >
                            Edit
                        </Button>
                        <Button variant="contained" onClick={deleteHandler}>
                            Delete
                        </Button>
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
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}
