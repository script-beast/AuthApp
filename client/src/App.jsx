import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useHandleReturnUser } from "./utils";
import PassContext from "./utils/PassContext";
import "../node_modules/react-simple-toasts/dist/theme/failure.css";
import "../node_modules/react-simple-toasts/dist/theme/success.css";

import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./layout";
import Error from "./pages/Error";

import Auth from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import AddUser from "./pages/Home/AddUser";
import EditUser from "./pages/Home/EditUser";

function App() {
  const { loading, loggedUser, setLoggedUser } = useHandleReturnUser();

  if (loading) return null;

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/auth",
          element: <Auth />,
          children: [
            {
              path: "/auth/login",
              element: <Login />,
            },
            {
              path: "/auth/register",
              element: <Register />,
            },
          ],
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/add-user",
              element: <AddUser />,
            },
            {
              path: "/edit-user/:id",
              element: <EditUser />,
            }
          ],
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <PassContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={BrowserRouter} />
    </PassContext.Provider>
  );
}

export default App;
