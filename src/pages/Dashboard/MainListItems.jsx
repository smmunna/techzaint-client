import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import useUserInfoHooks from '../../hooks/user/useUserInfoHooks';

export const MainListItems = () => {
  const email = localStorage.getItem('email');
  const { userInfo } = useUserInfoHooks(email);
  // Empty dependency array means this effect runs once when the component mounts

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/dashboard/create-blog">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Create Blog" />
      </ListItemButton>
      {
        userInfo.roles === 'admin' ?
          <>
            <ListItemButton component={Link} to="/dashboard/blog-list">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Blog List" />
            </ListItemButton>
          </>
          :
          <>
            {
              userInfo.roles === 'user' ?
                <>
                  <ListItemButton component={Link} to="/dashboard/my-blogs">
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Blogs" />
                  </ListItemButton>
                </>
                :
                <></>
            }
          </>
      }

    </React.Fragment>
  );
};
