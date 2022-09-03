import React, { Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import DocDataTable from './DocDataTable';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addDoctors, deleteDoctors, fetchDoctors, updateDoctors } from '../../redux/action/doctorAction';
import Loader from '../../component/UI/Loader';



function Doctors(props) {
    const [createDataOpen, setCreateDataOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [enteredName, setEnteredName] = useState('')
    const [enteredDegree, setEnteredDegree] = useState('')
    const [editData, setEditData] = useState(null)
    const dispatch = useDispatch()
    const docData = useSelector(state => state.doctor)

    const { doctors, isLoading, error } = docData



    useEffect(() => {
        dispatch(fetchDoctors())
    }, [dispatch])

    const columns = [
        {
          field: 'name',
          headerName: 'Name',
          width: 300,
        },
        {
          field: 'degree',
          headerName: 'Degree',
          width: 200,
        },
        {
          field: 'action',
          headerName: 'Actions',
          width: 110,
          renderCell: params => {
            return (
                <Fragment>
                    <IconButton onClick={handleEdit.bind(null, params)} >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete.bind(null, params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Fragment>
            )
          }
        }
      ];

    const handleOpen = () => {
        setCreateDataOpen(true)
    }

    const handleClose = () => {
        setCreateDataOpen(false)
        setIsEditing(false)
        setEnteredName('')
        setEnteredDegree('')
        setEditData('')
    }

    const handleEdit = data => {
        // console.log(data)
        setIsEditing(true)
        setEnteredName(data.row.name)
        setEnteredDegree(data.row.degree)
        handleOpen()
        setEditData(data.row)
    }

    const handleChange = event => {
        const { name, value } = event.target
        if(name === 'name') setEnteredName(value)
        if(name === 'degree') setEnteredDegree(value)
    }

    const handleDelete = id => {
        dispatch(deleteDoctors(id))
    }

    const handleSave = () => {

        if(!isEditing){
            const id = Math.floor(Math.random() * 1000 + 1)
            const data = {
                id,
                name: enteredName,
                degree: enteredDegree
            }
            dispatch(addDoctors(data))
        }else{
            const newData = {
                ...editData,
                name: enteredName,
                degree: enteredDegree
            }
            dispatch(updateDoctors(newData))
        }

        if(error) return;

        handleClose();
        setEnteredDegree('');
        setEnteredName('');
        setIsEditing(false)
        setEditData('')
        console.log(doctors);
    }

    return (
        <Fragment>
            {isLoading ? 
                <Loader />
            :
                error ? 
                    <p style={{color: 'red'}}>{error}</p>
                : 
                <Fragment>
                    <h1>Doctors' Details</h1>
                    <Button variant="contained" onClick={handleOpen}>+ Add</Button>
        
                    <Dialog open={createDataOpen} onClose={handleClose}>
                        <DialogTitle>Add Doctor info</DialogTitle>
                        {error && <p style={{color: 'red'}}>{error}</p>}
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
                                value={enteredName}
                            />
                            <TextField
                                margin="dense"
                                id="degree"
                                name="degree"
                                label="Degree"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                value={enteredDegree}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave}>{isEditing ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </Dialog>
        
                    <DocDataTable columns={columns} rows={doctors} /> 
                </Fragment>
                }
        </Fragment>
    );
}

export default Doctors;