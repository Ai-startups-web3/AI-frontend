import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import NavItem from './NavItem/NavItem';
//css
import { DrawerHeader } from './style.css';
import { SwipeableDrawer } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    setShowOutlet: (showOutlet: boolean) => void;
    isNonMobile: boolean;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR:string
}


const MiniDrawer: React.FC<MiniDrawerProps> = ({ setIsSidebarOpen, isNonMobile, isSidebarOpen, navConfig, setShowOutlet }) => {

    return (
        <>
           
                <SwipeableDrawer
                        variant="persistent"
                        open={isSidebarOpen}
                         onClose={function (_event: React.SyntheticEvent<{}, Event>): void {
                            isSidebarOpen
                            
                        } }
                         onOpen={function (_event: React.SyntheticEvent<{}, Event>): void {
                            isSidebarOpen

                        } }
                                        >
                    <DrawerHeader>
                    <IconButton onClick={() => setIsSidebarOpen()} >
                    {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
                    <CloseIcon/>

                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {navConfig.map((item, index) => (
                            <NavItem isNonMobile={isNonMobile} item={item} key={index} isSidebarOpen={isSidebarOpen} setShowOutlet={setShowOutlet} />
                        ))}
                    </List>
                    <Divider />
                    <DrawerHeader>
                        <IconButton onClick={() => setIsSidebarOpen()} >
                        {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
                        <CloseIcon/>

                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                </SwipeableDrawer>
        </>


    );
}
export default MiniDrawer;