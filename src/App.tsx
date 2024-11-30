import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, PrivateRoute } from "./features/auth";
import { ProductList, ProductDetail } from "./features/products";
import { Layout } from "./components";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
