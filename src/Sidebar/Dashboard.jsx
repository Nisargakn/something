import React from 'react';
import Box from '@mui/material/Box';
import Sidenav from '../Navbar/Sidenav';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const Dashboard = () => {
  // Sample engagement data
  const engagement = {
    likes: 100,
    comments: 50
  };

  return (
    <Box >
      <Sidenav />
      <Box sx={{  paddingTop: '10px', paddingLeft:'66px' }}>
        <Paper  sx={{ padding:'20px',  bgcolor:'#eeeeee' }}>
          <Typography id='dash'>
            Welcome,
          </Typography>

          <Divider sx={{ marginBottom: '20px' }} />

          <Typography gutterBottom id='dash1'>
            Future Additions

          </Typography>
          <Divider sx={{ width: '13rem', marginBottom: '20px' }} />

          <Typography variant="h5" gutterBottom id='dash'>
            Publish
          </Typography>

          <div style={{ display: 'flex', }}>
            <div style={{ flex: 2}}>
              <Typography gutterBottom>
                <b>Published Post:</b> This addition enables users to easily access recently published content, 
                ensuring they stay informed with the latest updates. Seamlessly integrated into our platform, 
                it offers a user-friendly interface for effortless navigation. Tailored for professionals, 
                this feature facilitates efficient tracking of recent publications, enhancing engagement and 
                promoting timely responses. Whether monitoring industry trends or staying connected with your 
                audience, the "Published Post" feature empowers users to remain ahead of the curve. 
                Stay connected, stay informed, and maximize productivity with our innovative enhancement.
              </Typography>
            </div>
              <div >
                <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg" alt="Image" style={{ width:'400px'  }} />
              </div>
          </div>

            <div>
              
            </div>
          <Divider sx={{ margin: '20px 0' }} />

          <Typography variant="h5" gutterBottom>
            User Engagement
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ThumbUpIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`Likes: ${engagement.likes}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChatBubbleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={`Comments: ${engagement.comments}`} />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;




