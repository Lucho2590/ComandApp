import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useFirebaseApp, useUser } from "reactfire";
import {
  Button,
  Typography,
  Box,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { useForm } from "react-hook-form";
import RegisterModal from "../../components/registerModal";
import GoogleLogo from "../../Icons/iconGoogle.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  // const db = getFirestore(firebaseApp);
  const navigate = useNavigate(); // Hook de navegación
  const [isModalOpen, setModalOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    const { user, password } = data;
    try {
      await signInWithEmailAndPassword(auth, user, password);
      navigate("/"); // Redirige a la página de inicio después del inicio de sesión
    } catch (error) {
      setLoginError("Usuario o contraseña no válido.");
      console.error("Error al iniciar sesión:", error);
    }
    reset();
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Asegura que ocupe toda la pantalla
        backgroundColor: "#f5f5f5", // Color de fondo opcional
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="ComandApp"
        />
        <CardContent>
          {loginError && (
            <Typography color="error" variant="body2" gutterBottom>
              {loginError} {/* Muestra el mensaje de error aquí */}
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="standard"
              size="small"
              fullWidth
              {...register("user", { required: "El usuario es requerido" })}
              label="Usuario"
              error={!!errors.user}
              helperText={errors.user ? String(errors.user.message) : ""}
            />
            <br />
            <TextField
              variant="standard"
              fullWidth
              size="small"
              type={!showPassword ? "text" : "password"}
              {...register("password", {
                required: "La contraseña es requerido",
              })}
              label="Contraseña"
              error={!!errors.password}
              helperText={
                errors.password ? String(errors.password.message) : ""
              }
              InputProps={{
                // Agrega el icono del ojito
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#b0b0b0" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <Button onClick={handleSubmit(onSubmit)} type="submit">
              Ingresar
            </Button>
          </form>
          <Button onClick={handleOpenModal}>Registrarme</Button>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          <Button
            variant="outlined" // Cambiado a outlined
            color="inherit" // Texto negro
            onClick={handleGoogleLogin}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>
              ingresar con google
            </Typography>
            <img
              src={GoogleLogo}
              alt="Google"
              style={{ width: 24, height: 24 }}
            />
          </Button>
          <RegisterModal open={isModalOpen} handleClose={handleCloseModal} />
        </CardActions>
      </Card>
    </Box>
  );
}

export default Login;
