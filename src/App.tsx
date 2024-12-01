import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/common/Loader/Loader";

/*
Utilize React.lazy and Suspense for code-splitting, 
enhancing performance and scalability by loading components on demand.
*/

const Login = lazy(() => import("./features/auth/components/Login/Login"));
const PrivateRoute = lazy(() => import("./features/auth/components/PrivateRoute/PrivateRoute"));
const ProductList = lazy(() => import("./features/products/components/ProductList/ProductList"));
const ProductDetail = lazy(() => import("./features/products/components/ProductDetail/ProductDetail"));
const Layout = lazy(() => import("./components/layouts/Layout/Layout"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="" element={<ProductList />} />
                  <Route path=":id" element={<ProductDetail />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;