import React, { useState } from 'react';
import './FormPage.css'; // Add this line for external CSS styling

const FormPage = () => {
    const machineNames = [
        'BC-1A', 'BC-1B', 'BC-2A', 'BC-2B', 'BC-3A', 'BC-3B',
        'BC-4A', 'BC-4B', 'BC-5A', 'BC-5B', 'BC-6A', 'BC-6B',
        'BC-7A', 'BC-7B', 'BC-8A', 'BC-8B', 'BC-9A', 'BC-9B',
        'BC-10A', 'BC-10B', 'BC-11A', 'BC-11B', 'BC-12A', 'BC-12B',
    ];

    const [formData, setFormData] = useState({
        machineName: '',
        jointName: '',
        jointDate: '',
        inspectionDate: '',
        nextInspectionDate: '',
        observation: '',
        workerName: '',
        underGuidance: '',
        complianceDate: '',
        complianceStatus: 'pending',
        ptwNo: '',
        gap1: '',
        termsAccepted: false,
    });

    const uniqueId = Math.random().toString(36).substr(2, 9); // Auto-generate unique ID
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const calculateGap = () => {
        if (formData.nextInspectionDate) {
            const nextDate = new Date(formData.nextInspectionDate);
            const today = new Date(currentDate);
            const diffTime = Math.abs(nextDate - today);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted:', { ...formData, uniqueId, currentDate });

        try {
            const response = await fetch('https://bummy-backend.onrender.com/Addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, uniqueId, currentDate }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
alert('Form submitted successfully')
            console.log('Form data successfully sent to API');
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // Reset form fields
        setFormData({
            machineName: '',
            jointName: '',
            jointDate: '',
            inspectionDate: '',
            nextInspectionDate: '',
            observation: '',
            workerName: '',
            underGuidance: '',
            complianceDate: '',
            complianceStatus: 'pending',
            ptwNo: '',
            gap1: '',
            termsAccepted: false,
        });
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Inspection Form</h1>
            <form onSubmit={handleSubmit} className="styled-form">
                <div className="form-group">
                    <label className="form-label">Unique ID:</label>
                    <span className="form-value">{uniqueId}</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Current Date:</label>
                    <span className="form-value">{currentDate}</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Machine Name:</label>
                    <select name="machineName" value={formData.machineName} onChange={handleChange} required className="form-select">
                        <option value="">Select Machine</option>
                        {machineNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Joint Name:</label>
                    <input
                        type="text"
                        name="jointName"
                        value={formData.jointName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Joint Date:</label>
                    <input
                        type="date"
                        name="jointDate"
                        value={formData.jointDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Inspection Date:</label>
                    <input
                        type="date"
                        name="inspectionDate"
                        value={formData.inspectionDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Next Inspection Date:</label>
                    <input
                        type="date"
                        name="nextInspectionDate"
                        value={formData.nextInspectionDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Gap (days):</label>
                    <span className="form-value" >{calculateGap()}</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Observation:</label>
                    <textarea
                        name="observation"
                        value={formData.observation}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Worker Name:</label>
                    <input
                        type="text"
                        name="workerName"
                        value={formData.workerName}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Under the Guidance of:</label>
                    <input
                        type="text"
                        name="underGuidance"
                        value={formData.underGuidance}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Compliance Date:</label>
                    <input
                        type="date"
                        name="complianceDate"
                        value={formData.complianceDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Compliance Status:</label>
                    <select
                        name="complianceStatus"
                        value={formData.complianceStatus}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">PTW No:</label>
                    <input
                        type="text"
                        name="ptwNo"
                        value={formData.ptwNo}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                            className="form-checkbox"
                        />  I accept the terms and conditions
                    </label>
                </div>

                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
