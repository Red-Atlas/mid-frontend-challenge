import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "../components";
import { ProtectedRoute } from "../components/protectedroute/ProtectedRoute";

const Home = React.lazy(() => import("../views/home/HomeView"));
const Property = React.lazy(() => import("../views/property/PropertyView"));
const Create = React.lazy(() => import("../views/create/CreateView"));
const NotFound = React.lazy(() => import("../views/notfound/NotFoundView"));
const Error = React.lazy(() => import("../views/error/ErrorView"));
const Edit = React.lazy(() => import("../views/edit/EditView"));
const Login = React.lazy(() => import("../views/login/LoginView"));

export function Router() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
