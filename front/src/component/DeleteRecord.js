import React, { useState } from 'react';

const DeleteRecord = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleDelete = async () => {
        if (!uniqueId.trim()) {
            setResponseMessage('Please enter a valid unique ID.');
            return;
        }

        try {
            const response = await fetch(`https://bummy-backend.onrender.com/delete/${uniqueId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message);
            } else {
                setResponseMessage(data.message || 'Error occurred while deleting the record.');
            }
        } catch (err) {
            setResponseMessage('Failed to connect to the server.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>Delete Maintenance Record</h2>
            <input
                type="text"
                placeholder="Enter Unique ID"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleDelete}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Delete Record
            </button>
            {responseMessage && (
                <p
                    style={{
                        marginTop: '15px',
                        color: responseMessage.includes('successfully') ? 'green' : 'red',
                    }}
                >
                    {responseMessage}
                </p>
            )}
        </div>
    );
};

export default DeleteRecord;
