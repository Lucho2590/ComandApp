import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  // sendEmailVerification,
} from "firebase/auth";
import { useFirebaseApp } from "reactfire";
import Toust from "./toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function InitModal({ open, handleClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  const password = watch("password");
  const handleToastClose = () => {
    setToastOpen(false);
  };

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const handleToastOpen = (
      message: string,
      severity: "success" | "error"
    ) => {
      setToastMessage(message);
      setToastSeverity(severity);
      setToastOpen(true);
    };

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Limpiar el formulario y cerrar el modal después de registrar
      reset();
      handleClose();
      handleToastOpen("Registro exitoso!", "success");
    } catch (error) {
      reset();
      handleClose();
      handleToastOpen("El usuario ya está registrado.", "error");
      //   setError("email", { type: "manual", message: error.message });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Registro de Usuario
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="standard"
              size="small"
              fullWidth
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "El formato del email es incorrecto",
                },
              })}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as String}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="standard"
              size="small"
              fullWidth
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                // validate: {
                //   isStrong: (value) =>
                //     /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/-])/.test(
                //       value
                //     ) ||
                //     "La contraseña debe contener al menos una mayúscula, un número y un carácter especial",
                // },
              })}
              label="Contraseña"
              error={!!errors.password}
              helperText={errors.password?.message as string}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="standard"
              size="small"
              fullWidth
              type="password"
              {...register("confirmPassword", {
                required: "Confirme su contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              label="Confirmar Contraseña"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message as String}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Registrar
            </Button>
          </form>
        </Box>
      </Modal>
      <Toust
        open={toastOpen}
        handleClose={handleToastClose}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}
