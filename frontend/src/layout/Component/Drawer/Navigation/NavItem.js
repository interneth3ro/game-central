import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Avatar, Chip, ListItemButton, ListItemText, Typography } from '@mui/material';

// project import
import { handlerActiveComponent, handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

import { ThemeMode } from 'config';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item }) => {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const openComponent = menuMaster?.openedComponent;

  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = (id) => {
    handlerActiveComponent(id);
    matchesMD && handlerComponentDrawer(false);
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      handlerActiveComponent(item.id);
    }
    // eslint-disable-next-line
  }, []);

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === ThemeMode.DARK ? 'text.primary' : 'primary.main';

  return (
    <ListItemButton
      component={Link}
      to={item.url}
      target={itemTarget}
      disabled={item.disabled}
      onClick={() => itemHandler(item.id)}
      selected={openComponent === item.id}
      sx={{
        pl: 4,
        py: 1,
        mb: 0.5,
        '&:hover': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
        },
        '&.Mui-selected': {
          bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter',
          borderRight: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
          }
        }
      }}
    >
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: openComponent === item.id ? iconSelectedColor : textColor }}>
            {item.title}
          </Typography>
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object
};

export default NavItem;
