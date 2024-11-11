// AllRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Create from '../Pages/create';
import Read from '../Pages/read';
import Update from '../Pages/update';
import Deletefile from '../Pages/delete';


const AllRoutes = () => {
  return (
    <Routes>
      
      <Route path="/create" element={<Create />} />
      <Route path="/read" element={<Read />} />
      <Route path="/update" element={<Update />} />
      <Route path="/delete" element={<Deletefile />} />
    </Routes>
  );
};

export default AllRoutes;
