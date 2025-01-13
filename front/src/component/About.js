import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Container } from '@mui/material';

const About = () => {
  return (
    <div style={{ animation: 'fadeIn 1s ease-in-out' }}>
      <Container maxWidth="md" sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: 3 }}>
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: '#1976d2', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', animation: 'slideIn 1s ease-in-out' }}
          >
            About Maintenance Report Application
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{ color: '#555', lineHeight: 1.8, fontSize: '1.1rem' }}
          >
            The Maintenance Report Application is designed to assist organizations in managing the maintenance records of their machinery. It ensures accurate and efficient documentation of inspections, observations, and schedules.
          </Typography>

          <Divider sx={{ margin: '20px 0' }} />

          <div style={{ animation: 'slideIn 1s ease-in-out' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Key Features
            </Typography>
            <List sx={{ color: '#444' }}>
              <ListItem>
                <ListItemText
                  primary="Add and manage maintenance records with detailed fields like machine name, inspection dates, and remarks."
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dropdown selection for machine names to reduce input errors." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date validation ensures logical entry of future dates for expiration and next inspection." />
              </ListItem>
              <ListItem>
                <ListItemText primary="User-friendly and secure form design with terms and conditions acknowledgment." />
              </ListItem>
            </List>
          </div>

          <Divider sx={{ margin: '20px 0' }} />

          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Technologies Used
          </Typography>
          <List sx={{ color: '#444' }}>
            <ListItem>
              <ListItemText primary="React.js: A robust library for building dynamic user interfaces." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Material-UI (MUI): A component library for responsive and accessible design." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Node.js and Express: For backend integration and API development." />
            </ListItem>
            <ListItem>
              <ListItemText primary="MongoDB: A NoSQL database to store maintenance records securely." />
            </ListItem>
          </List>

          <Divider sx={{ margin: '20px 0' }} />

          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Contact Information
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px', color: '#555' }}>
            For any queries, suggestions, or assistance, feel free to contact us.
          </Typography>
         
        </Box>
      </Container>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default About;
