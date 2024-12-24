import React from 'react';

const NotificationPage = () => {
  const notifications = [
    { id: 1, title: 'Inspection Reminder', message: 'Next inspection for BC-1A is scheduled for 2024-12-30.' },
    { id: 2, title: 'Maintenance Update', message: 'Inspection for BC-2B completed successfully.' },
    { id: 3, title: 'Alert', message: 'BC-3A requires immediate attention.' },
    { id: 4, title: 'Schedule Confirmation', message: 'BC-5B inspection scheduled for 2025-01-15.' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Notifications</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notifications.map((notification) => (
          <li key={notification.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>{notification.title}</h3>
            <p style={{ margin: '5px 0 0' }}>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
