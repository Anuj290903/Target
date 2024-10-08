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

function CourseForm({
  isUpdate,
  createCourse,
  updateCourse,
  title = '',
  setTitle,
  description = '',
  setDescription,
  price = '',
  setPrice,
  image = null,
  setImage,
  published = false,
  setPublished,
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
          {isUpdate ? 'Update Course' : 'Create New Course'}
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
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: 'block', marginTop: '20px' }}
        />
        <label htmlFor="image" style={{ marginBottom: '10px' }}>Upload Course Display Picture</label>
        <FormControl>
          <InputLabel
            style={{ paddingRight: '5px' }}
            htmlFor="outlined-adornment-amount"
          >
            Amount
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
            label="Amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <InputLabel id="demo-simple-select-label">Is Published</InputLabel>
        <Select
          style={{ padding: '0px' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        >
          <MenuItem value={false}>False</MenuItem>
          <MenuItem value={true}>True</MenuItem>
        </Select>

        <br />
        <Button
          style={{ backgroundColor: '#101460' }}
          className="button"
          variant="contained"
          onClick={() => (isUpdate ? updateCourse() : createCourse())}
        >
          {isUpdate ? 'UPDATE' : 'CREATE'}
        </Button>
      </Card>
    </div>
  );
}

export default CourseForm;
