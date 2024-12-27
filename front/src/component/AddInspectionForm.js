import React, { useState } from 'react';
import { TextField, MenuItem, Select, Button, FormControl, FormControlLabel, Checkbox, InputLabel, Box } from '@mui/material';

 export const AddInspectionForm = () => {
  const [formData, setFormData] = useState({
    machineName: '',
    jointName: '',
    inspectionDate: '',
    expireDate: '',
    nextInspectionDate: '',
    remark: '',
    inspectionWorker: '',
    inspectionIncharge: '',
    observation: '',
    termsAccepted: false,
  });

  const machineNames = [
    'BC-1A', 'BC-1B', 'BC-2A', 'BC-2B', 'BC-3A', 'BC-3B', 'BC-4A', 'BC-4B',
    'BC-5A', 'BC-5B', 'BC-6A', 'BC-6B', 'BC-7A', 'BC-7B', 'BC-8A', 'BC-8B',
    'BC-9A', 'BC-9B', 'BC-10A', 'BC-10B', 'BC-11A', 'BC-11B', 'BC-12A', 'BC-12B'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle date validation for Expire Date and Next Inspection Date
    if (name === 'inspectionDate') {
      const inspectionDate = new Date(value);
      setFormData({
        ...formData,
        [name]: value,
        expireDate: inspectionDate > new Date() ? value : '', // Expire Date must be in the future
        nextInspectionDate: inspectionDate > new Date() ? value : '', // Next Inspection Date must be in the future
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('You must accept the terms and conditions!');
      return;
    }
    
    alert('Form Submitted Successfully!');

      console.log('New Product:', formData);
      // Add logic here to save the new product to the database
      try{
          const res = await fetch('https://bummy-backend.onrender.com/Addproduct',{
              method: 'POST',
              headers:{
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify(formData),
          });
          const result = await res.json();
          setFormData(result);

      }catch(error){
          console.log(error)
      }

    setFormData({
      machineName: '',
      jointName: '',
      inspectionDate: '',
      expireDate: '',
      nextInspectionDate: '',
      remark: '',
      inspectionWorker: '',
      inspectionIncharge: '',
      observation: '',
      termsAccepted: false,
    });
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add Inspection Report</h2>
      <form onSubmit={handleSubmit}>
        {/* Machine Name */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Machine Name</InputLabel>
          <Select
            name="machineName"
            value={formData.machineName}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Machine</MenuItem>
            {machineNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Joint Name */}
        <TextField
          label="Joint Name"
          name="jointName"
          value={formData.jointName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Inspection Date */}
        <TextField
          label="Inspection Date"
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />

        {/* Expire Date */}
        <TextField
          label="Expire Date"
          type="date"
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />

        {/* Next Inspection Date */}
        <TextField
          label="Next Inspection Date"
          type="date"
          name="nextInspectionDate"
          value={formData.nextInspectionDate}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />

        {/* Remark */}
        <TextField
          label="Remark"
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />

        {/* Inspection Worker */}
        <TextField
          label="Inspection Worker"
          name="inspectionWorker"
          value={formData.inspectionWorker}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Inspection Incharge */}
        <TextField
          label="Inspection Incharge"
          name="inspectionIncharge"
          value={formData.inspectionIncharge}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Observation */}
        <TextField
          label="Observation"
          name="observation"
          value={formData.observation}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
        />

        {/* Terms & Conditions */}
        <FormControlLabel
          control={
            <Checkbox
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
          }
          label="I accept the terms and conditions"
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};
 
export default AddInspectionForm;
