import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import './CourseFormStyles.css';

function UploadForm({
  isUpdate,
  createUpload,
  updateUpload,
  title = '',
  setTitle,
  description = '',
  setDescription,
  course = '',
  setCourse,
  probSet=null,
  setProbSet,
  vidFile=null,
  setVidFile,
  courseId,
}) {
  const [message, setMessage] = useState('');

  return (
    <div className="page">
      <div className="title">
        <Typography
          variant="h4"
          component="div"
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: '#101460',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {isUpdate ? 'Update Upload' : 'Create New Upload'}
        </Typography>
        {message && (
          <div>
            <p className="message">{message}</p>
            <br />
          </div>
        )}
      </div>
      <Card className="form">
        <TextField
          className="input"
          label="Title"
          variant="outlined"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="description"
          className="input"
          label="Description"
          variant="outlined"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input 
          type="file" 
          id="vidFile" 
          label="Video File"
          accept="video/*"
          onChange={(e) => setVidFile(e.target.files[0])} 
        /> Upload Video
        <input 
          type="file" 
          id="probSet" 
          label="PDF File"
          accept="application/pdf"
          onChange={(e) => setProbSet(e.target.files[0])} 
        />
        Upload Pdf
        <br />
        <Button
          style={{ backgroundColor: '#101460' }}
          className="button"
          variant="contained"
          onClick={() => (isUpdate ? updateUpload(courseId) : createUpload(courseId))}
        >
          {isUpdate ? 'UPDATE' : 'UPLOAD'}
        </Button>
      </Card>
    </div>
  );
}

export default UploadForm;