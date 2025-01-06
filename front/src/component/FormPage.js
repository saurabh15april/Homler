import React, { useState, useEffect } from 'react';

const FormPage = () => {
  const [formData, setFormData] = useState({
    currentDate: new Date().toISOString().split('T')[0],
    uniqueId: '',
    machineName: '',
    jointNo: '',
    jointDate: '',
    inspectionDate: '',
    nextInspectionDate: '',
    observations: [],
    complianceDate: '',
    complianceStatus: 'Pending',
    ptwNo: '',
  });

  const [dateGap, setDateGap] = useState(null);
  const [formCount, setFormCount] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (formData.machineName) {
      const count = formCount[formData.machineName] || 0;
      setFormData((prevState) => ({
        ...prevState,
        uniqueId: `${formData.machineName}-${count + 1}`,
      }));
    }
  }, [formData.machineName, formCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'inspectionDate' || name === 'nextInspectionDate') {
      calculateDateGap(
        name === 'inspectionDate' ? value : formData.inspectionDate,
        name === 'nextInspectionDate' ? value : formData.nextInspectionDate
      );
    }
  };

  const calculateDateGap = (inspectionDate, nextInspectionDate) => {
    if (inspectionDate && nextInspectionDate) {
      const date1 = new Date(inspectionDate);
      const date2 = new Date(nextInspectionDate);
      const diffTime = date2 - date1;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      setDateGap(diffDays >= 0 ? diffDays : null);
    } else {
      setDateGap(null);
    }
  };

  const addObservation = () => {
    setFormData((prevState) => ({
      ...prevState,
      observations: [...prevState.observations, ''],
    }));
  };

  const removeObservation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      observations: prevState.observations.filter((_, i) => i !== index),
    }));
  };

  const handleObservationChange = (index, value) => {
    setFormData((prevState) => {
      const updatedObservations = [...prevState.observations];
      updatedObservations[index] = value;
      return { ...prevState, observations: updatedObservations };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.machineName || !formData.jointNo || !formData.inspectionDate) {
      alert('Please fill all mandatory fields.');
      return;
    }

    if (new Date(formData.nextInspectionDate) <= new Date(formData.inspectionDate)) {
      alert('Next Inspection Date must be after Inspection Date.');
      return;
    }

    setFormCount((prevCount) => ({
      ...prevCount,
      [formData.machineName]: (prevCount[formData.machineName] || 0) + 1,
    }));

    console.log('Form submitted:', formData);
    setShowPopup(true);

    setFormData({
      currentDate: new Date().toISOString().split('T')[0],
      uniqueId: '',
      machineName: '',
      jointNo: '',
      jointDate: '',
      inspectionDate: '',
      nextInspectionDate: '',
      observations: [],
      complianceDate: '',
      complianceStatus: 'Pending',
      ptwNo: '',
    });
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Inspection Form</h2>

      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}>
          <p style={{ margin: '0', fontSize: '18px', color: 'green' }}>Submitted Successfully!</p>
          <button
            onClick={closePopup}
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
            Close
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Unique ID:</label>
          <input type="text" name="uniqueId" value={formData.uniqueId} readOnly />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Current Date:</label>
          <input type="date" name="currentDate" value={formData.currentDate} readOnly />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Machine Name:</label>
          <input
            type="text"
            name="machineName"
            value={formData.machineName}
            onChange={handleChange}
            placeholder="Enter Machine Name"
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Joint No:</label>
          <input
            type="text"
            name="jointNo"
            value={formData.jointNo}
            onChange={handleChange}
            placeholder="Enter Joint No"
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Joint Date:</label>
          <input
            type="date"
            name="jointDate"
            value={formData.jointDate}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Inspection Date:</label>
          <input
            type="date"
            name="inspectionDate"
            value={formData.inspectionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Next Inspection Date:</label>
          <input
            type="date"
            name="nextInspectionDate"
            value={formData.nextInspectionDate}
            onChange={handleChange}
            required
          />
          {dateGap !== null && (
            <p style={{ color: dateGap < 0 ? 'red' : 'green', marginTop: '5px' }}>
              {dateGap >= 0 ? `Gap: ${dateGap} days` : 'Next Inspection Date must be after Inspection Date.'}
            </p>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Observations:</label>
          {formData.observations.map((observation, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="text"
                value={observation}
                onChange={(e) => handleObservationChange(index, e.target.value)}
                placeholder={`Observation ${index + 1}`}
                style={{ flexGrow: 1, marginRight: '10px' }}
              />
              <button type="button" onClick={() => removeObservation(index)} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addObservation} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Add Observation
          </button>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Compliance Date:</label>
          <input
            type="date"
            name="complianceDate"
            value={formData.complianceDate}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Compliance Status:</label>
          <select
            name="complianceStatus"
            value={formData.complianceStatus}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>PTW No:</label>
          <input
            type="text"
            name="ptwNo"
            value={formData.ptwNo}
            onChange={handleChange}
            placeholder="Enter PTW No"
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;