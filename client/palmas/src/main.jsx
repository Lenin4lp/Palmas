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
import { getNeighbors, getNeighbor, getRoles } from "./api/neighbors.js";
import { getPlace, getPlaces, getPlaceTypes } from "./api/places.js";
import HouseOutlet from "./middlewares/HouseOutlet.jsx";
import { getVehicleTypes } from "./api/vehicles.js";
import { getYears } from "./api/time.js";
import { getMonthlyDebts, getMonthlyFees, getMonthlyFee } from "./api/debt.js";
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const Wallet = React.lazy(() => import("./pages/wallet/Wallet.jsx"));
const Houses = React.lazy(() => import("./pages/houses/Houses.jsx"));
const Neighbor = React.lazy(() => import("./pages/neighbor/Neighbor.jsx"));
const Aliquot = React.lazy(() => import("./pages/aliquot/Aliquot.jsx"));
const Calendar = React.lazy(() => import("./pages/calendar/Calendar.jsx"));
const NeighborInfo = React.lazy(() =>
  import("./pages/neighbor/NeighborInfo.jsx")
);
const RegisterNeighbor = React.lazy(() =>
  import("./pages/neighbor/RegisterNeighbor.jsx")
);
const ModifyNeighbor = React.lazy(() =>
  import("./pages/neighbor/ModifyNeighbor.jsx")
);
const NeighborPlaces = React.lazy(() =>
  import("./pages/neighbor/NeighborPlaces.jsx")
);
const RemoveNeighborPlaces = React.lazy(() =>
  import("./pages/neighbor/RemoveNeighborPlaces.jsx")
);
const HouseRegister = React.lazy(() =>
  import("./pages/houses/HouseRegister.jsx")
);
const HouseExtras = React.lazy(() => import("./pages/houses/HouseExtras.jsx"));
const VehicleTypes = React.lazy(() =>
  import("./pages/houses/VehicleTypes.jsx")
);
const PlaceTypes = React.lazy(() => import("./pages/houses/PlaceTypes.jsx"));
const HouseInfo = React.lazy(() => import("./pages/houses/HouseInfo.jsx"));
const AliquotRegister = React.lazy(() =>
  import("./pages/aliquot/AliquotRegister.jsx")
);
const AliquotModify = React.lazy(() =>
  import("./pages/aliquot/AliquotModify.jsx")
);

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
        loader: async () => {
          const placesPromise = getPlaces();
          const monthlyDebtsPromise = getMonthlyDebts();

          const [placesData, monthlyDebtsData] = await Promise.all([
            placesPromise,
            monthlyDebtsPromise,
          ]);
          return {
            places: placesData,
            monthlyDebts: monthlyDebtsData,
          };
        },
      },
      {
        path: "/inmuebles",
        element: <HouseOutlet />,
        children: [
          {
            path: "/inmuebles",
            element: <Houses />,
            loader: async () => {
              const typesPromise = getPlaceTypes();
              const placesPromise = getPlaces();

              const [typesData, placesData] = await Promise.all([
                typesPromise,
                placesPromise,
              ]);
              return { types: typesData, places: placesData };
            },
          },
          {
            path: "/inmuebles/registrar",
            element: <HouseRegister />,
            loader: () => getPlaceTypes(),
          },
          {
            path: "/inmuebles/config",
            element: <HouseExtras />,
            loader: () => getPlaceTypes(),
          },
          {
            path: "/inmuebles/config/tipos_de_vehiculo",
            element: <VehicleTypes />,
            loader: () => getVehicleTypes(),
          },
          {
            path: "/inmuebles/config/tipos_de_inmueble",
            element: <PlaceTypes />,
            loader: async () => {
              const placeTypesPromise = getPlaceTypes();
              const monthlyFeesPromise = getMonthlyFees();

              const [placeTypesData, monthlyFeesData] = await Promise.all([
                placeTypesPromise,
                monthlyFeesPromise,
              ]);
              return {
                placeTypes: placeTypesData,
                monthlyFees: monthlyFeesData,
              };
            },
          },
          {
            path: "/inmuebles/:id",
            element: <HouseInfo />,
            loader: async ({ params }) => {
              const { id } = params;
              const placePromise = getPlace(id);
              const vehicleTypesPromise = getVehicleTypes();
              const getMonthlyDebtsPromise = getMonthlyDebts();

              const [placeData, vehicleTypesData, getMonthlyDebtsData] =
                await Promise.all([
                  placePromise,
                  vehicleTypesPromise,
                  getMonthlyDebtsPromise,
                ]);
              return {
                place: placeData,
                vehicleTypes: vehicleTypesData,
                monthlyDebts: getMonthlyDebtsData,
              };
            },
          },
        ],
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
        loader: async ({ params }) => {
          const { id } = params;
          const neighborPromise = getNeighbor(id);
          const rolePromise = getRoles();

          const [neighborData, roleData] = await Promise.all([
            neighborPromise,
            rolePromise,
          ]);
          return { neighbor: neighborData, roles: roleData };
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
        path: "/vecinos/:id/inmuebles/remove",
        element: <RemoveNeighborPlaces />,
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
        loader: async () => {
          const monthlyFeesPromise = getMonthlyFees();
          const getPlacesPromise = getPlaces();
          const getMonthlyDebtsPromise = getMonthlyDebts();

          const [monthlyFeesData, getPlacesData, getMonthlyDebtsData] =
            await Promise.all([
              monthlyFeesPromise,
              getPlacesPromise,
              getMonthlyDebtsPromise,
            ]);

          return {
            monthlyFees: monthlyFeesData,
            places: getPlacesData,
            monthlyDebts: getMonthlyDebtsData,
          };
        },
      },
      {
        path: "/alicuotas/registrar",
        element: <AliquotRegister />,
      },
      {
        path: "/alicuotas/:id",
        element: <AliquotModify />,
        loader: async ({ params }) => {
          const { id } = params;
          return getMonthlyFee(id);
        },
      },
      {
        path: "/calendario",
        element: <Calendar />,
        loader: async () => {
          const yearsPromise = getYears();
          const placesPromise = getPlaces();
          const monthlyDebtPromise = getMonthlyDebts();
          const typesPromise = getPlaceTypes();

          const [yearsData, placesData, monthlyDebtsData, typesData] =
            await Promise.all([
              yearsPromise,
              placesPromise,
              monthlyDebtPromise,
              typesPromise,
            ]);

          return {
            years: yearsData,
            places: placesData,
            monthlyDebts: monthlyDebtsData,
            types: typesData,
          };
        },
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
