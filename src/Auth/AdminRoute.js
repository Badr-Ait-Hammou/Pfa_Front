import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../components/HomePage';
import Ville from '../components/Ville';
import Restaurant from '../components/Restaurant';
import Zone from '../components/Zone';
import Serie from '../components/Serie';
import Specilite from '../components/Specialite';
import Header from '../components/Header';

const AdminRoute = () => {
    return (

        <Routes>
            <Route>
            <Route index element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/ville">
                    <Route path="/ville" element={<Ville/>}/>
                </Route>
                <Route path="/restaurant">
                    <Route path="/restaurant" element={<Restaurant/>}/>
                </Route>
                <Route path="/zone">
                    <Route path="/zone" element={<Zone/>}/>
                </Route>
                <Route path="/serie">
                    <Route path="/serie" element={<Serie/>}/>
                </Route>
                <Route path="/specialite">
                    <Route path="/specialite" element={<Specilite/>}/>
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoute;