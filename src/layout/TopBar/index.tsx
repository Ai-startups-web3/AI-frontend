import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import {
  Box,
  // Menu,
  // styled,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { ColorModeContext, getColors } from "../Theme/themes";

import { motion } from "framer-motion";
import "./style.css"
import { useSelector } from "react-redux";
import { isAuthenticated, selectUser } from "../../lib/slices/auth/authSlice";
import LogoutButton from "../../components/Logout";
// import LoginForm from "../../components/LoginForm";
// import CustomDialog from "../../components/Dailog";
import FireBaseLogin from "../../components/LoginForm/FireBaseLogin";

interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate()
  // const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const isUserAuthenticated = useSelector(isAuthenticated)
  const user = useSelector(selectUser)
  if (!colorMode) {
    // Handle the case where colorMode is undefined (e.g., context not yet initialized)
    return null; // or render a loading state or default content
  }
  let userName = decodeURIComponent(user);
  // Remove surrounding double quotes if they exist
  userName = userName.replace(/^"|"$/g, '');

  const toggleSwitch = () => {
    colorMode.toggleColorMode()
    setIsOn(!isOn);
  }

  return (
    <AppBar sx={{
      backgroundColor: getColors().secondary[900],
      height: APP_BAR
    }} >
      <Toolbar>

        <IconButton
          onClick={() => setIsSidebarOpen()}
          sx={{
            mt: 2,
            color: getColors().blueAccent[100]
          }}
        >
          <MenuIcon />
          {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
        </IconButton>
        <Box
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", mt: 2 }}
        >
          <img src={`/logo.svg`} alt="logo" className="w-8 h-8 ml-4" />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          sx={{
            mt: 1
          }}
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <div>
            {isUserAuthenticated ? (
              <>
                <LogoutButton userName={userName} />
              </>

            ) : (

              <FireBaseLogin />
              //   <CustomDialog
              //   className="ml-2"
              //   open={isDialogOpen}
              //   onClose={() => setDialogOpen(!isDialogOpen)}
              //   triggerButtonText={"Login"}
              //   title={""}
              //   description={"Only admin are availabale to login for now"}
              //   >
              //   <LoginForm
              //     loginTitle="Admin Login"
              //     OnFormSuccess={() => setDialogOpen(!isDialogOpen)}
              //     />
              // </CustomDialog>
            )}
          </div>
          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

// const StyledMenu = styled((props: any) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     backgroundColor: getColors().primary[900],
//     borderRadius: "8px",
//     marginTop: theme.spacing(1),
//     padding: "16px",
//     minWidth: 240,
//     border: "1px"
//   },
// }));

// const StyledMenuItem = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer",
//   "&:hover": {
//     backgroundColor: "rgba(72, 92, 165, 0.5)",
//     borderRadius: "8px",
//   },
//   "& .MuiAvatar-root": {
//     width: "24px",
//     height: "26px",
//     marginRight: theme.spacing(1),
//     color: getColors().primary[100],
//   },
//   "& .MuiTypography-root": {
//     color: getColors().primary[300],
//   },
// }));


export default Header;