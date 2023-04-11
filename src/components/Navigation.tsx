import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../lib/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Toolbar, Typography } from '@mui/material';
import useAuth from '../context/AuthContext';

const StyledLink = styled(Link)({
    color: '#f5f5f5',
    textDecoration: 'none',
    ':hover': {
        color: '#cfcfcf',
    },
    width: '100%',
});

const menuItems = [
    { link: '/projects', label: 'Projects' },
    { link: '/projects/new', label: 'Add project' },
];

const authItems = [
    { link: '/register', label: 'Register' },
    { link: '/login', label: 'Login' },
    { link: '/logout', label: 'Logout' },
];

const Navigation: React.FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElAuthNav, setAnchorElAuthNav] = useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>): void => {
        setAnchorElNav(e.currentTarget);
    };

    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    const handleOpenAuthMenu = (e: React.MouseEvent<HTMLElement>): void => {
        setAnchorElAuthNav(e.currentTarget);
    };

    const handleCloseAuthMenu = (): void => {
        setAnchorElAuthNav(null);
    };

    const auth = useAuth();

    return (
        <AppBar position='static'>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{
                            overflow: 'inherit',
                            color: 'inherit',
                            mr: '0.3rem',
                        }}
                    >
                        <StyledLink to={'/'}>Project Mangement Tool</StyledLink>
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                xs: 'flex',
                                md: 'none',
                            },
                            marginLeft: 'auto',
                        }}
                    >
                        <IconButton
                            sx={{ color: colors.secondary }}
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon fontSize='large' />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            PaperProps={{
                                sx: {
                                    width: {
                                        xs: '100%',
                                    },
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            color='inherit'
                        >
                            {menuItems.map((item) => (
                                <MenuItem key={item.label}>
                                    <StyledLink to={item.link}>
                                        {item.label}
                                    </StyledLink>
                                </MenuItem>
                            ))}
                            {authItems.map((item) => {
                                if (
                                    auth?.access_token !== undefined &&
                                    auth !== null &&
                                    item.link !== '/logout'
                                ) {
                                    return null;
                                }
                                if (
                                    auth?.access_token === undefined &&
                                    auth === null &&
                                    item.link === '/logout'
                                ) {
                                    return null;
                                }
                                return (
                                    <MenuItem key={item.label}>
                                        <StyledLink to={item.link}>
                                            {item.label}
                                        </StyledLink>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            width: '100%',
                        }}
                    >
                        {menuItems.map((item) => (
                            <Button sx={{ padding: 0 }} key={item.label}>
                                <StyledLink
                                    style={{ padding: '0.5rem 0.5rem' }}
                                    to={item.link}
                                >
                                    {item.label}
                                </StyledLink>
                            </Button>
                        ))}
                        <IconButton
                            sx={{ color: colors.secondary, marginLeft: 'auto' }}
                            onClick={handleOpenAuthMenu}
                        >
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElAuthNav}
                            keepMounted
                            open={Boolean(anchorElAuthNav)}
                            onClose={handleCloseAuthMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block',
                                },
                            }}
                            color='inherit'
                        >
                            {authItems.map((item) => {
                                if (
                                    auth?.access_token !== undefined &&
                                    auth !== null &&
                                    item.link !== '/logout'
                                ) {
                                    return null;
                                }
                                if (
                                    auth?.access_token === undefined &&
                                    auth === null &&
                                    item.link === '/logout'
                                ) {
                                    return null;
                                }
                                return (
                                    <MenuItem key={item.label}>
                                        <StyledLink to={item.link}>
                                            {item.label}
                                        </StyledLink>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
