import React from "react";

const NotificationPage = ({ notifications }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0 }}>{notification.title}</h3>
              <p style={{ margin: "5px 0 0" }}>{notification.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications at the moment.</p>
      )}
    </div>
  );
};

export default NotificationPage;
