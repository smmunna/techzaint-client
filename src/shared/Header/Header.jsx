import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import BrandIcon from "../../assets/brand/brand.png";
import useUserInfoHooks from "../../hooks/user/useUserInfoHooks";
import useSaveItem from '../../hooks/saveitems/useSaveItem';

const pages = ['Product', 'Pricing', 'Blog'];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [savedItems] = useSaveItem()

    const navigate = useNavigate();
    const email = localStorage.getItem('email');

    const { userInfo } = useUserInfoHooks(email);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('access-token')
        navigate('/')
    }



    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={BrandIcon} className="hidden lg:block" style={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: '50px' }} />
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
                            Techzaint
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link key={page} to={`/${page.toLowerCase()}s`} style={{ textDecoration: 'none' }}>
                                            {page}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <img src={BrandIcon} className="block lg:hidden" style={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: '50px' }} />

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
                            TechZaint
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Link to={`/`} style={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }} onClick={handleCloseNavMenu}>
                                    Home
                                </Button>
                            </Link>
                            <Link to={`/`} style={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }} onClick={handleCloseNavMenu}>
                                    Pricing
                                </Button>
                            </Link>
                            <Link to={`/`} style={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }} onClick={handleCloseNavMenu}>
                                    Shop Now
                                </Button>
                            </Link>
                            <Link to={`/blogs`} style={{ textDecoration: 'none' }}>
                                <Button sx={{ my: 2, color: 'black', display: 'block' }} onClick={handleCloseNavMenu}>
                                    Blogs
                                </Button>
                            </Link>

                        </Box>

                        {
                            email ?
                                <>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt="Remy Sharp" src={userInfo?.avatar} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                            {
                                                email ?
                                                    <>
                                                        <MenuItem onClick={handleCloseUserMenu}>
                                                            <Typography textAlign="center"><Link to={'/dashboard'}>Dashboard</Link></Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseUserMenu}>
                                                            <Typography textAlign="center"><Link to={'/saved-items'}>Saved Blogs [{savedItems?.length}]</Link></Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseUserMenu}>
                                                            <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                                                        </MenuItem>
                                                    </>
                                                    :
                                                    <>
                                                        <MenuItem onClick={handleCloseUserMenu}>
                                                            <Typography textAlign="center"><Link to={'/login'}>Login</Link></Typography>
                                                        </MenuItem>
                                                    </>
                                            }

                                        </Menu>
                                    </Box>
                                </>
                                :
                                <>
                                    <Typography textAlign="center"><Link to={'/login'}>Login</Link></Typography>
                                </>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
