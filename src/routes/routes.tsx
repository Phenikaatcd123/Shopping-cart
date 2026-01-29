import { ReactNode } from "react";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/ManageProducts";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";

export interface AppRoute {
    path: string;
    element: ReactNode;
}

export const routes: AppRoute[] = [
    {
    path: "/login",
    element: <Login/>,
    },
    {
        path: "/",
        element: <Dashboard/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
    {
        path: "/products/:id",
        element: <ProductDetail/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    }, 
];