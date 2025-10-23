import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layout/Layout";
import HomePage from "@/pages/HomePage";
import CharacterPage from "@/pages/CharacterPage";
import CreatePage from "@/pages/CreatePage";
import NotFoundPage from "@/pages/NotFoundPage";
// import Test from "@/_test/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/character/:id", element: <CharacterPage /> },
      // { path: "/test", element: <Test /> },
      { path: "/*", element: <NotFoundPage /> },
    ],
  },
]);
