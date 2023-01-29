import React from "react";
import Modal from '@mui/material/Modal'
import { IoMdAddCircle } from 'react-icons/io'
import { useStateContext } from '../Contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #e5e7eb',
  borderRadius:'5px',
  p: 6,
};


function AddTodo() {
  const { setShowAddMenu, currentColor, showAddMenu,postRoute } = useStateContext();
  const [assignmentData,setAssignmentData]=useState({
    assignment:'',
    subject:"",
    desc:'',
    date:''
  })

  const onAssignmentSubmit=(e)=>{
        postRoute()
        e.preventDefault()
        console.log(assignmentData)
  }
  const handleDataChange=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
      setAssignmentData({...assignmentData,[name]:value})
      console.log(assignmentData)
  }
  return (<>
    <div className='fixed right-4 bottom-20' style={{ zIndex: '1' }}>
      <TooltipComponent content='Add' position="Top">
        <button
          type="button"

          onClick={() => setShowAddMenu(true)}
          style={{ background: currentColor, borderRadius: '50%' }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <IoMdAddCircle />
        </button>
      </TooltipComponent>
    </div>
    <Modal
      open={showAddMenu}
      onClose={() => setShowAddMenu(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Assignment
        </Typography>
        <div className="mt-5">
        <Grid container spacing={4}>
          <Grid item>
            <TextField id="outlined-basic" name="assignment" label="Assignment" variant="outlined" value={assignmentData.assignment} onChange={handleDataChange}/>
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" name="subject" label="Subject" variant="outlined" value={assignmentData.subject} onChange={handleDataChange}/>
          </Grid>
          <div className="mt-5 ml-8">
          <Grid container spacing={4}>
          <Grid item>
            <TextField id="outlined-basic" name="desc" label="Description" variant="outlined" value={assignmentData.description} onChange={handleDataChange}/>
          </Grid>
          <Grid item>
            <div className="-mt-7">
            <Typography mt={2}>
          Assignment Deadline
        </Typography>
            </div>
          
          <input type="date" name="deadline" id="date" style={{height:'50px', border:'0.1px solid #e5e7eb', padding:'10px', borderRadius:'5px'}} value={assignmentData.date} onChange={handleDataChange}/>
          
         
          </Grid>
          </Grid>
          </div>
        </Grid>
        <div className="mt-10">
        <Button variant="outlined" onClick={onAssignmentSubmit} onChange={handleDataChange}>Submit</Button>
        </div>
        
        </div>
      </Box>
    </Modal>

  </>)
}

export default AddTodo;