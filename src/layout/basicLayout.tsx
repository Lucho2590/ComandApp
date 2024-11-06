import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "./components/appBar";
// import SideBar from "./Components/SideBar";
import { useUser } from "reactfire";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export let userData: any;
export default function BasicLayout({ children }: Props) {
  const { data: user } = useUser();

  userData = user;

  return (
    <Box
      sx={{
        bgcolor: "#eaeaea",
        height: "100vh",
      }}
    >
      {user ? (
        <>
          <CssBaseline />
          <ResponsiveAppBar />
          <Box
            component="main"
            sx={{
              bgcolor: "#eaeaea",
            }}
          >
            {children}
          </Box>
        </>
      ) : (
        <>Loading ...</>
      )}
      ;
    </Box>
  );
}

// "#eaeaea"
