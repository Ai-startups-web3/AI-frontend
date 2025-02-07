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



interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate()
  if (!colorMode) {
    // Handle the case where colorMode is undefined (e.g., context not yet initialized)
    return null; // or render a loading state or default content
  }
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
            mt:2,
            color: getColors().blueAccent[100]
          }}
        >
          <MenuIcon/>
        {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
        </IconButton>
        <Box
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer",mt: 2}}
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
          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>
        
          {/* {address ? (
            <>
              <FlexBetween>
                <div className="flex justify-between items-center mt-2 sm:mt-2 md:mt-0 lg:mt-0 mx-2 ">
                  <Button
                    className=""
                    id="demo-customized-button"
                    aria-controls={open ? 'menu-list' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={(event: any) => handleClick(event)}
                    sx={{
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <Avatar>
                      <img src="/img/21.png" alt="img"
                        width={50}
                        height={50}
                        style={{
                          display: "block",
                          objectFit: "cover",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }} />
                    </Avatar>
                  </Button>

                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <div className="text-gray font-black text-sm tracking-wide pb-9">
                      Hi WEB3 User!
                    </div>
                    <Typography
                      sx={{
                        position: "relative",
                        left: "10%",
                        display: "flex",
                        alignItems: "center",
                      }}
                      variant="body2"
                      color="textSecondary"
                    >
                      {address && address.slice(0, 3) + "..." + address.slice(-4)}
                      <ContentCopyOutlinedIcon
                        onClick={handleCopySmartWalletAddress}
                        sx={iconClickedStyle}
                      />
                    </Typography>

                    <Paper>
                      <StyledMenuItem>
                        <Avatar>
                          <Person4OutlinedIcon />
                        </Avatar>
                        <Typography onClick={() => navigate("/profile")} >

                          Profile
                        </Typography>
                      </StyledMenuItem>
                    </Paper> */}
                    {/* <Paper>

                      <StyledMenuItem >
                        <Avatar>
                          <RedeemTwoToneIcon />
                        </Avatar>
                      </StyledMenuItem>

                    </Paper> */}

                    {/* <Paper>
                      <StyledMenuItem >
                        <Avatar>
                          <LogoutOutlinedIcon />
                        </Avatar>
                        <Typography>Log Out</Typography>
                      </StyledMenuItem>
                    </Paper> */}
                  {/* </StyledMenu>
                </div>
              </FlexBetween>
            </>
          ) : null} */}
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