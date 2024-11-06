import BasicLayout from "../../layout/basicLayout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/productCard";
import { useState } from "react";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import { FastfoodSharp } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const categorias = ["sandwich", "empanadas", "porciones"];

const handleclick = (e: any) => {
  console.log(e);
};

export default function Home() {
  // const { data: user } = useUser();

  return (
    <BasicLayout>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={8}>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                position: "relative",
                "&::-webkit-scrollbar": {
                  display: "none", // Oculta la barra de scroll en navegadores basados en WebKit (Chrome, Safari)
                },
                scrollbarWidth: "none", // Oculta la barra de scroll en Firefox
              }}
            >
              <Box sx={{ display: "flex" }}>
                {categorias.map((id: any) => {
                  return (
                    <IconButton
                      key={id} // Agrega una clave única para cada elemento en el map
                      onClick={() => {
                        handleclick(id);
                      }}
                      size="large"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent", // Elimina el color de fondo en hover
                          boxShadow: "none", // Elimina cualquier sombra en hover
                        },
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FastfoodOutlinedIcon />
                      <Typography variant="overline">{id}</Typography>
                    </IconButton>
                  );
                })}
              </Box>
              {/* <Box
                sx={{
                  bgcolor: "#eaeaea",
                  position: "sticky",
                  right: 0,
                  minWidth: "fit-content",
                }}
              >
                <IconButton
                  onClick={() => {
                    handleclick("agregar");
                  }}
                  size="large"
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
              </Box> */}
            </Box>
            <Divider />
            <Box>Lista de productos</Box>
          </Grid>
          <Grid size={4}>
            <Item sx={{ height: "85vh" }}>La comanda</Item>
          </Grid>
        </Grid>
      </Box>
    </BasicLayout>
  );
}
