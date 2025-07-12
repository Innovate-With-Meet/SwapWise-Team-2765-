import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
    Container,
    Divider,
    MenuItem,
    Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '4px 12px',
    minHeight: '48px !important', // 🔻 Reduced height
}));

export const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/Login");
    };

    const menuItems = [
        { label: 'Section 1', path: '/admin/allusers' },
        { label: 'Section 2', path: '/admin/categorymanage' },
        { label: 'Section 3', path: '/admin/adminanalytics' },
        { label: 'Section 4', path: '/admin/allproviderusers' },
        { label: 'Section 5', path: '#' },
        { label: 'Profile', path: '/admin/profilepage' },
    ];

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    {/* Left Menu (Desktop) */}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.label}
                                    variant="text"
                                    color="info"
                                    size="small"
                                    onClick={() => navigate(item.path)}
                                    sx={{ textTransform: 'none', fontWeight: 500 }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Right Side Buttons (Desktop) */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleLogout}
                            sx={{ minWidth: 0 }}
                        >
                            Logout
                        </Button>
                    </Box>

                    {/* Mobile Menu */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 5 }}>
                        <IconButton aria-label="Menu" onClick={toggleDrawer(true)} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                    backgroundColor: 'background.default',
                                },
                            }}
                        >
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                {menuItems.map((item) => (
                                    <MenuItem
                                        key={item.label}
                                        onClick={() => {
                                            navigate(item.path);
                                            setOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}

                                <Divider sx={{ my: 2 }} />

                                <MenuItem>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
