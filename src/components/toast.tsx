import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Props = {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: "success" | "error";
};

export default function Toast({ open, handleClose, message, severity }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posición en la esquina superior derecha
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
