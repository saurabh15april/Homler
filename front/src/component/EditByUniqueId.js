import React, { useState } from 'react';

const EditByUniqueId = () => {
    const [uniqueId, setUniqueId] = useState(''); // For user input
    const [data, setData] = useState(null); // Store fetched data
    const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // List of editable fields
    const editableFields = [
        'machineName',
        'jointName',
        'jointDate',
        'inspectionDate',
       'nextInspectionDate',
        'observation',
        'workerName',
        'underGuidance',
        'complianceDate',
        'complianceStatus',
        'ptwNo',
        'termsAccepted',
       
    ];

    // Fetch data for the given unique ID
    const handleFetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://bummy-backend.onrender.com/edit/${uniqueId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data. Please check the Unique ID.');
            }
            const result = await response.json();
            setData(result);
            setIsEditing(true); // Allow editing after fetching
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form submission to update data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://bummy-backend.onrender.com/edit/${uniqueId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            console.log("Data being sent:", JSON.stringify(data)); // Log the data being sent
            
            if (!response.ok) {
                // Log response status and body for more details
                const errorText = await response.text();
                console.log("Error details:", errorText);
                throw new Error('Failed to update data. Please try again.');
            }
    
            console.log("Response after update:", await response.json()); // Log the response from the server
            alert('Data updated successfully!');
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            console.error("Update failed:", err); // Log detailed error
            alert(err.message); // Show error message to user
        }
    };
    

    // Handle input changes in the fetched data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Edit Data by Unique ID</h1>
            {!isEditing ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Unique ID"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleFetchData} disabled={!uniqueId || isLoading} style={styles.button}>
                        {isLoading ? 'Fetching...' : 'Fetch Data'}
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </>
            ) : (
                <>
                    {data && (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            {editableFields.map((field) => (
                                <div key={field} style={styles.fieldContainer}>
                                    <label style={styles.label}>
                                        {field}:
                                        <input
                                            type="text"
                                            name={field}
                                            value={data[field] || ''}
                                            onChange={handleChange}
                                            style={styles.input}
                                        />
                                    </label>
                                </div>
                            ))}
                            <button type="submit" style={styles.submitButton}>Update Data</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

// Inline CSS Styles
const styles = {
    container: {
        width: '50%',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #f3f4f6, #e0e7ff)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#4b4f54',
        fontSize: '24px',
        marginBottom: '30px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0 20px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4c7c7f',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    submitButton: {
        alignSelf: 'center',
        backgroundColor: '#5a6e72',
        padding: '12px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '14px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    fieldContainer: {
        marginBottom: '15px',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '8px',
    }
};

export default EditByUniqueId;
