import React from 'react';

// Material-UI Components
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

// Material-UI Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import TableChartIcon from '@material-ui/icons/TableChart';
import WidgetsIcon from '@material-ui/icons/Widgets';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

// Fragments
import DashboardLevelZero from '../fragments/DashboardLevelZero';
import SettingsLevelZero from '../fragments/SettingsLevelZero';
import DashboardLevelOne from '../fragments/DashboardLevelOne';
import TabellaLevelOne from '../fragments/TabellaLevelOne';
import TabellaLevelTwo from '../fragments/TabellaLevelTwo';
import ProjectsLevelOne from '../fragments/ProjectsLevelOne';
import DashboardLevelFour from '../fragments/DashboardLevelFour';
import Classi from './admin/ClassiAdminQuattro'
import Studenti from './admin/StudentiAdminQuattro'
import Docenti from './admin/DocentiAdminQuattro'


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
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Dashboard',
                                    component: <DashboardLevelOne />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Tabella Classe',
                                    component: <TabellaLevelOne />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tabella Classe" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Progetti',
                                    component: <ProjectsLevelOne />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <WidgetsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Progetti" />
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
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Classi',
                                    component: <TabellaLevelTwo />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Classi" />
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
                        {/* dashboard */}
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Dashboard',
                                    component: <DashboardLevelFour />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>

                        {/* classi */}
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Classi',
                                    component: <Classi />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <TableChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Classi" />
                        </ListItem>
                        
                        {/* studenti */}
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Studenti',
                                    component: <Studenti />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Studenti" />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Docenti',
                                    component: <Docenti />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Docenti" />
                        </ListItem>

                        <ListItem
                            button
                            onClick={() => {
                                setFragment({
                                    titolo: 'Progetti',
                                    component: <ProjectsLevelOne />,
                                });
                            }}
                        >
                            <ListItemIcon>
                                <WidgetsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Progetti" />
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
