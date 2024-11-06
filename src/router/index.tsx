/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Navigate,
} from "react-router-dom";
import { useUser } from "reactfire";
import Login from "../pages/log";
import Home from "../pages/home";
import Menu from "../pages/Menu";

// Componente para proteger rutas y manejar redirección
function AuthRoute({ element }: { element: React.ReactElement }) {
  const { data: user, status } = useUser();

  if (status === "loading") {
    return <div>Cargando... routing</div>; // Mensaje mientras se verifica el estado del usuario
  }

  // Redirige si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el elemento
  return element;
}

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthRoute element={<Home />} />,
    },
    {
      path: "/menu",
      element: <AuthRoute element={<Menu />} />,
    },
    // {
    //   path: "/product/:id",
    //   element: <AuthRoute element={<Product />} />,
    // },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}
