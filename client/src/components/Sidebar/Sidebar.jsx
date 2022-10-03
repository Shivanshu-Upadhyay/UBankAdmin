import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
const drawerWidth = 240;
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
  // necessary for content to be below app bar
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

export default function Sidebar({ modulePesmission }) {
  const [open, setOpen] = useState(true);
  const { active, setActive, toggel, setToggel, setIsLoginUser, isLoginUser } =
    useStateContext();
  const navigate = useNavigate();

  const userTokenExp = () => {
    if (localStorage.getItem("admin")) {
    } else {
      setIsLoginUser(!isLoginUser);
      navigate("/login-admin");
    }
  };
  userTokenExp();

  const logout = () => {
    setIsLoginUser(undefined);
    localStorage.clear("admin");
    navigate("/login-admin");
  };

  const sidebarLink = [
    {
      name: "Dashboard",
      iconUrl:
        "	https://payoway.com/web/assets/admin/icons/dashboard.svg",
      path: "/",
      children: [{ name: "Sub Admin", path: "/subAdmin" }],
      authPermission:1,
    },
    {
      name: "Sub Admin",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/subadmin.svg",
      path: "/subAdmin",
      children: [{ name: "Sub Admin", path: "/subAdmin" }],
      authPermission: modulePesmission[0] ? modulePesmission[0].status : 0,
    },
    {
      name: "Bank/Acquireres",
      iconUrl: "https://payoway.com/web/assets/admin/icons/banks.svg",
      path: "/PGMod",
      children: [{ name: "Payment Gates", path: "/PGMod" }],
      authPermission: modulePesmission[1] ? modulePesmission[1].status : 0,
    },
    {
      name: "Merchants Info",
      iconUrl:
        "	https://payoway.com/web/assets/admin/icons/merinfo.svg",
      path: "/Mid",
      children: [{ name: "Mid", path: "/Mid" }],
      authPermission: modulePesmission[2] ? modulePesmission[2].status : 0,
    },
    // {
    //   name: "Chines  Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/reports.svg",
    //   path: "/Chinese",
    //   children: [{ name: "Chines Bank", path: "/Chinese" }],
    //   authPermission: modulePesmission[3] ? modulePesmission[3].status : 0,
    // },

    {
      name: "BankCode Bankconnect",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/statements.svg",
      path: "/bankcodeakonto",
      children: [{ name: "BankCode Module", path: "/bankcodeakonto" }],
      authPermission: modulePesmission[4] ? modulePesmission[4].status : 0,
    },
    {
      name: "BankCode Module",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/billing.svg",
      path: "/BankCode",
      children: [{ name: "BankCode", path: "/BankCode" }],
      authPermission: modulePesmission[5] ? modulePesmission[5].status : 0,
    },
    {
      name: "Merchant Module",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/managemer.svg",
      path: "/merchantAdmin",
      children: [{ name: "Merchant Admin", path: "/merchantAdmin" }],
      authPermission: modulePesmission[6] ? modulePesmission[6].status : 0,
    },
    {
      name: "Deposits",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/transaction.svg",
      path: "/MerchantTrans",
      children: [
        { name: "Merchants Transaction ", path: "/MerchantTrans" },
      ],
      authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
    },
    {
      name: "Refunds",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/refund.svg",
      path: "/MerchantRefunds",
      children: [
        { name: "Merchant Refund ", path: "/MerchantRefunds" },
      ],
      authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
    },
    {
      name: "Payouts",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/payout.svg",
      path: "/PayoutMerchants",
      children: [
        { name: "Payout Merchant ", path: "/PayoutMerchants" },
      ],
      authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
    },
    // {
    //   name: "Transaction Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/employes.svg",
    //   path: "/MerchantTrans",
    //   children: [
    //     { name: "Merchants Transaction ", path: "/MerchantTrans" },
    //     { name: "Merchants End Of Tran... ", path: "/EndOfDay" },
    //     { name: "Merchant Refund ", path: "/MerchantRefunds" },
    //     { name: "Payout Merchant ", path: "/PayoutMerchants" },
    //   ],
    //   authPermission: modulePesmission[7] ? modulePesmission[7].status : 0,
    // },

    // {
    //   name: "SandBox Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/employes.svg",
    //   path: "/Teams",
    //   children: [
    //     { name: "Merchants Transaction ", path: "/MerchantsTransaction" },
    //     { name: "Merchants End Of Tran... ", path: "/BankCode" },
    //     { name: "Merchant Refund ", path: "/BankCode" },
    //     { name: "Payout Merchant ", path: "/BankCode" },
    //   ],
    //   authPermission: modulePesmission[8] ? modulePesmission[8].status : 0,
    // },
    // {
    //   name: "Banner Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/business-settings.svg",
    //   path: "/BusinessSetting",
    //   children: [{ name: "Banner Admin ", path: "/MerchantsTransaction" }],
    //   authPermission: modulePesmission[9] ? modulePesmission[9].status : 0,
    // },

    // {
    //   name: "Settlement Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/business-settings.svg",
    //   path: "/LocalSettlement",
    //   children: [
    //     { name: "Local Settlement", path: "/LocalSettlement" },
    //     { name: "Add Funds", path: "/AddFunds" },
    //     { name: "International Settlement", path: "/InternationalSettlement" },
    //     { name: "Reports", path: "/SettlementReports" },
    //   ],
    //   authPermission: modulePesmission[10] ? modulePesmission[10].status : 0,
    // },

    {
      name: "Activity Logs",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/developerImg.png",
      path: "/AdminLogs",
      children: [
        { name: "Admin logs", path: "/AdminLogs" },
        { name: "Merchants Logs ", path: "/MerchantLogs" },
        { name: "Wallet Logs ", path: "/WalletLogs" },
      ],
      authPermission: modulePesmission[11] ? modulePesmission[11].status : 0,
    },
    {
        name: "Website Email",
        iconUrl:
          "https://payoway.com/web/assets/admin/icons/websiteemail.svg",
        path: "/contact",
        children: [{ name: "Contact", path: "/contact" }],
        authPermission: modulePesmission[12] ? modulePesmission[12].status : 0,
      },

    // {
    //   name: "Contact Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
    //   path: "/contact",
    //   children: [{ name: "Contact", path: "/contact" }],
    //   authPermission: modulePesmission[12] ? modulePesmission[12].status : 0,
    // },
    // {
    //   name: "CMS Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
    //   path: "/CMSModule",
    //   children: [{ name: "CMS", path: "/MerchantsTransaction" }],
    //   authPermission: modulePesmission[13] ? modulePesmission[13].status : 0,
    // },
    // {
    //   name: "Meta Module",
    //   iconUrl:
    //     "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
    //   path: "/MetaModule",
    //   children: [{ name: "Meta", path: "/MerchantsTransaction" }],
    //   authPermission: modulePesmission[14] ? modulePesmission[14].status : 0,
    // },

    {
      name: "Setting Module",
      iconUrl:
        "https://payoway.com/web/assets/admin/icons/setting.svg",
      path: "/siteSetting",
      children: [
        { name: "Site Setup", path: "/siteSetting" },
        { name: "Currency Exchange", path: "/CurrencyRate" },
        { name: "Exchange", path: "/Exchange" },
        { name: "Block User", path: "/AllUpi" },
        { name: "Banner Module ", path: "/MerchantsTransaction" },
        { name: "CMS Module", path: "/MerchantsTransaction" },
        { name: "Meta Module", path: "/MerchantsTransaction" }
      ],
      authPermission: modulePesmission[15] ? modulePesmission[15].status : 0,
    },
    {
      name: "Change Password",
      iconUrl:
        "https://www.bankconnect.online/assets/merchants/img/change-password.svg",
      path: "/ChangePassword",
      children: [{ name: "Change Password", path: "/ChangePassword" }],
      authPermission: modulePesmission[16] ? modulePesmission[16].status : 0,
    },
  ];

  const sideBarPermissionLink = sidebarLink.filter(
    (item) => item.authPermission === 1
  );

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
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar className="appBarcom">
          <Typography variant="h6" noWrap component="div">
            {open ? (
              <img
                src="https://www.bankconnect.online/assets/merchants/img/logo.png"
                alt=""
                width="40px"
              />
            ) : (
              <img src="./imges/fav-icon.png" alt="" width="36px" />
            )}
          </Typography>
          <div className="navLeft">
            <div>
              <img
                src="https://www.bankconnect.online/assets/merchants/img/setting.svg"
                alt=""
                width="40px"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="drawer">
        <br />

        <List className="my-5">
          {sideBarPermissionLink.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex align-items-center">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive || (toggel && active === index)
                        ? "iconcontainer iconActive mx-2 my-1"
                        : "iconcontainer mx-1 my-1"
                    }
                  >
                    <img
                      src={item.iconUrl}
                      alt="not found"
                      width="23px"
                      height="23px"
                      className="m-3"
                      onClick={() => {
                        setActive(index);
                        setToggel(!toggel);
                      }}
                    />
                  </NavLink>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "linkNAme activeClass mx-2" : "linkNAme mx-2"
                    }
                    onClick={() => {
                      setActive(index);
                      setToggel(!toggel);
                    }}
                  >
                    {item.name}
                  </NavLink>
                  {item.children.length > 1 ? (
                    <div>
                      {toggel && active === index ? (
                        <UnfoldLessIcon
                          onClick={() => {
                            setActive(index);
                            setToggel(!toggel);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <AddIcon
                          onClick={() => {
                            setActive(index);
                            setToggel(!toggel);
                          }}
                          color="primary"
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
                {toggel && active === index ? (
                  <>
                    {item?.children.length > 1 &&
                      item.children.map((child, index) => (
                        <div
                          className="d-flex flex-column container"
                          key={index}
                        >
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              isActive
                                ? "linkNAme activeClass ms-5 container"
                                : "ms-5 linkNAme container"
                            }
                          >
                            {child.name}
                          </NavLink>
                        </div>
                      ))}
                  </>
                ) : null}
              </div>
            );
          })}
          <div className=" d-flex align-items-center">
            <img
              src="https://www.bankconnect.online/assets/merchants/img/log-out.svg"
              alt="not found"
              width="30px"
              height="30px"
              className="m-3"
            />
            <div className="linkNAme mx-2" onClick={logout}>
              Logout
            </div>
          </div>
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
