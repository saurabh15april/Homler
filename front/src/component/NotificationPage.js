import React from "react";
import InspectionTable from "./InspectionTable";

const NotificationPage = ({ notifications }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Notifications</h1>
      <InspectionTable/>
    </div>
  );
};

export default NotificationPage;
