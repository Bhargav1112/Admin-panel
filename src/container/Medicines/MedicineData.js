import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function MedicineData(props) {
    const [tableData, setTableData] = useState([]);
    const columns = [
        { field: "id", headerName: "Sr. No.", width: 100 },
        { field: "name", headerName: "Name", width: 400 },
        { field: "quantity", headerName: "Qty", width: 100 },
        { field: "expiry", headerName: "Exp. Date", width: 130 },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 90,
        },
    ];

    const onAddMedicine = () => {
        const storageData = JSON.parse(localStorage.getItem("medicine"));
        if (!storageData) {
            return;
        }
        const data = storageData.map((item, i) => {
            return {
                id: i + 1,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                expiry: item.expiry,
            };
        });
        setTableData(data);
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
