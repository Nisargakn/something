import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';


const pages = ['Home','About', 'Features', 'Pricing', 'Channels'];

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="https://www.quantumparadigm.in/wp-content/uploads/2024/02/Quantum_Logo_With_Text.png" alt="Logo" style={{ height: 50, width: 'auto'}} />

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color:'grey' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <List>
                {pages.map((page) => (
                  <ListItem button key={page} component={Link} to={`/${page}`} onClick={handleCloseNavMenu}>
                    <ListItemText primary={page} />
                  </ListItem>
                ))}
              </List>
            </Menu>
          </Box>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <img src="https://www.quantumparadigm.in/wp-content/uploads/2024/02/Quantum_Logo_With_Text.png" alt="Logo" style={{ height: 50, width: 'auto'}} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'center' }}>
             {pages.map((page) => (
  <Button
      key={page}
      component={Link}
      to={`/${page}`}
      onClick={handleCloseNavMenu}
      sx={{ my: 2, color: 'grey', display: 'block', textDecoration: 'none' }}
    >
      {page}
    </Button>
             ))}
          </Box>

          <Box>
          <Button sx={{
                        mr: 1, color: '#ba343b', fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                        fontSize: '16px', fontWeight: '800', border: '1px solid #ba343b'
                    }}
                        variant="outlined" href='/logIn'>
                        Login
                    </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button sx={{
                        mr: 1, bgcolor: '#ba343b',
                        '&:hover': { bgcolor: '#9e2b31' }, borderRadius: '25px', fontSize: '16px',
                        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
                    }}
                        variant="contained" href='/signUp'>
                        Try Free Trail
          </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
