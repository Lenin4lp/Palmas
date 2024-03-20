import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/login/Login.jsx";
import ProtectedRoutes from "./middlewares/ProtectedRoutes.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Wallet from "./pages/wallet/Wallet.jsx";
import Houses from "./pages/houses/Houses.jsx";
import Neighbor from "./pages/neighbor/Neighbor.jsx";
import Aliquot from "./pages/aliquot/Aliquot.jsx";
import Calendar from "./pages/calendar/Calendar.jsx";
import { getNeighbors, getNeighbor, getRoles } from "./api/neighbors.js";
import NeighborInfo from "./pages/neighbor/NeighborInfo.jsx";
import RegisterNeighbor from "./pages/neighbor/RegisterNeighbor.jsx";
import ModifyNeighbor from "./pages/neighbor/ModifyNeighbor.jsx";
import NeighborPlaces from "./pages/neighbor/NeighborPlaces.jsx";
import { getPlaces } from "./api/places.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/billetera",
        element: <Wallet />,
      },
      {
        path: "/casas",
        element: <Houses />,
      },
      {
        path: "/vecinos",
        element: <Neighbor />,
        loader: () => getNeighbors(),
      },
      {
        path: "/vecinos/:id",
        element: <NeighborInfo />,
        loader: ({ params }) => {
          const { id } = params;
          return getNeighbor(id);
        },
      },
      {
        path: "/vecinos/registrar",
        element: <RegisterNeighbor />,
        loader: () => getRoles(),
      },
      {
        path: "/vecinos/modificar/:id",
        element: <ModifyNeighbor />,
        loader: ({ params }) => {
          const { id } = params;
          return getNeighbor(id);
        },
      },
      {
        path: "/vecinos/:id/inmuebles",
        element: <NeighborPlaces />,
        loader: async ({ params }) => {
          const { id } = params;
          const neighborPromise = getNeighbor(id);
          const placesPromise = getPlaces();

          const [neighborData, placesData] = await Promise.all([
            neighborPromise,
            placesPromise,
          ]);

          return { neighbor: neighborData, places: placesData };
        },
      },
      {
        path: "/alicuotas",
        element: <Aliquot />,
      },
      {
        path: "/calendario",
        element: <Calendar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <div className=" font-mono" translate="no">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
