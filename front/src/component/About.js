import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Container } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          About Maintenance Report Application
        </Typography>

        <Typography variant="body1" paragraph>
          The Maintenance Report Application is designed to assist organizations in managing the maintenance records of their machinery. It ensures accurate and efficient documentation of inspections, observations, and schedules.
        </Typography>

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Add and manage maintenance records with detailed fields like machine name, inspection dates, and remarks." />
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

        <Divider sx={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Technologies Used
        </Typography>
        <List>
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

        <Typography variant="h5" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">
          For any queries, suggestions, or assistance, feel free to contact us:
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> aasif.malik@adityabirla.com
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> +91 8303521857
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> 123 Maintenance Ave, Suite 456, Machine City, MC 12345
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
