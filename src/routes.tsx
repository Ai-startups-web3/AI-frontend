import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { Pages } from "./Datatypes/enums";
import DashboardLayout from "./layout/layout";
import HomePage from "./Pages/HomePage";

const Router: React.FC = () => {


  const routes = useRoutes([

    {
      path: "",
      element: <DashboardLayout/>,
      children: [
        {
          path: Pages.Home,
          element: <HomePage/>,
        },
  
   
      
      ],
    },
    { path: "*", element: <Navigate to={Pages.Home} /> },
  ]);

  return routes;
};

export default Router;