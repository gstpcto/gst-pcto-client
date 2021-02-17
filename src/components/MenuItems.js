import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DashboardLevelZero from '../fragments/DashboardLevelZero';
import SettingsLevelZero from '../fragments/SettingsLevelZero';

export default function MenuItems({ level, setFragment }) {
    const getMenu = (level) => {
        switch (level) {
            case 0:
                return (
                    <>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Dashboard',
                                    component: <DashboardLevelZero />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" /> {/* Voti */}
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Dossier',
                                    component: <>Dossier Studente</>,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dossier" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Impostazioni Profilo',
                                    component: <SettingsLevelZero />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Impostazioni Profilo" />
                        </ListItem>
                    </>
                );

            case 1:
                return (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </>
                );

            case 2:
                return (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" /> {/* Voti */}
                        </ListItem>
                    </>
                );

            case 3:
                return (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" /> {/* Voti */}
                        </ListItem>
                    </>
                );

            case 4:
                return (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" /> {/* Voti */}
                        </ListItem>
                    </>
                );

            default:
                return (
                    <>
                        <ListItem button>
                            <ListItemIcon>
                                <NotInterestedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Che ci fai qui?" />
                        </ListItem>
                    </>
                );
        }
    };

    return <List>{getMenu(level)}</List>;
}
