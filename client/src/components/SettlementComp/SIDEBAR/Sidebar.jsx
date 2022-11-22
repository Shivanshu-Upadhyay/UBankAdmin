import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink, Outlet } from "react-router-dom";
import "./sidebar.css";
import { useStateContext } from "../../../context/ContextProvider";

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `100%`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SettlementSidebar() {
  const [open, setOpen] = React.useState(true);
  const {setIsLoginUser} = useStateContext();

  const logout = () => {
    localStorage.clear("admin");
    localStorage.clear("role");
    setIsLoginUser(undefined);

  };

  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/virtual-terminal.svg",
      path: "/",
    },
    {
      name: "Bank Deposit Received",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/sattlement.svg",
      path: "/BankDepositReceived",
    },
    {
      name: "Local Payouts",
      iconUrl: "https://www.bankconnect.online/assets/merchants/img/payout.svg",
      path: "/LocalPayouts",
    },
    {
      name: "Add Funds",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/employes.svg",
      path: "/AddFunds",
    },
    {
      name: "Local Settlement",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/internationalsettlement.svg",
      path: "/LocalSettlement",
    },
    {
      name: "International Settlement ",
      iconUrl:"https://www.payoway.com/web/assets/admin/icons/world.png",
      path: "/InternationalSettlement",
    },
    {
      name: "Disputes/Chargeback",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/disputes.svg",
      path: "/DisputesChargebacks",
    },
    {
      name: "Refunds",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/refund.svg",
      path: "/Refunds",
    },
    {
      name: "Commissions",
      iconUrl:
        "	https://www.payoway.com/web/assets/admin/icons/commission.png",
      path: "/Commissions",
    },
    {
      name: "Reports",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/reports.svg",
      path: "/Reports",
    },
    {
      name: "Settings",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/setting.svg",
      path: "/Settings",
    },
    {
      name: "Change Password",
      iconUrl:
        "https://www.payoway.com/web/assets/admin/icons/password.svg",
      path: "/ChangePassword",
    },

    {
      name: "Logout",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/log-out.svg",
      path: "/login-admin",
    },
  ];

  return (
    <Box sx={{ display: "flex" }} className="parentAll">
      <div
        onClick={() => setOpen(!open)}
        className={open ? "openClose" : "openClose2"}
      >
        <img
          src="	https://www.bankconnect.online/assets/merchants/img/quick-previous.svg"
          alt=""
          width="40px"
          style={{ position: "fixed", cursor: "pointer" }}
        />
      </div>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="settlementappBar">
        <Toolbar className="settlementappBarcom">
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src="./imges/newlogo.svg"
                alt="not found"
                width="200px"
              />
            ) : (
              <img src="./imges/newlogo.svg" alt="" width="200px" />
            )}
          </Typography>
          <div className="settlementnavLeft">
            
            
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="./imgs/profile.svg"
                alt=""
                width="40px"
                style={{ borderRadius: "20px" }}
              />
              
            </div>
            <div className="mx-2">
              <span style={{ fontSize: "14px" }}>UBankConnect</span>
              
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sidebarLink.map((item, index) => {
            return (
              <div className="settlementsidebarcontainer mb-3 " key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? " settlementiconcontainer mx-2 settlementiconActive"
                      : " settlementiconcontainer mx-2"
                  }
                >
                  <img src={item.iconUrl} alt="" className="settlementiconstyle" />
                </NavLink>

                <div>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "settlementlinkNAme settlementactiveClass mx-2" : "settlementlinkNAme mx-2"
                    }
                    onClick={() => (item.name === "Logout" ? logout() : null)}
                  >
                    {item.name}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="mainBlockSideBar"
      >
        <DrawerHeader />
        <div className="bdcolor">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
