import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

export default function MenuItems({ level }) {
  switch (level) {
    case 0: 
      return (
        <List>
          <ListItem button onClick={() => { console.log("cagasburr") }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" /> {/* Voti */}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Dossier" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Impostazioni Profilo" />
          </ListItem>
        </List>
      );

    default:
      return (
        <List>
          <ListItem button>
            <ListItemIcon>
              <NotInterestedIcon />
            </ListItemIcon>
            <ListItemText primary="Che ci fai qui?" />
          </ListItem>
        </List>
      );
  }
}