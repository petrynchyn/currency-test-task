import React from 'react';
import { Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import Navigation from "./components/navigation/Navigation";
const Converter = React.lazy(() => import("./components/converter/Converter"));
const Rates = React.lazy(() => import("./components/rates/Rates"));

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Navigation />

        <Card variant="outlined">
          <CardContent>
            <Routes>
              <Route index element={
                <React.Suspense fallback={<CircularProgress />}>
                  <Converter />
                </React.Suspense>
              } />
              <Route path="converter" element={
                <React.Suspense fallback={<CircularProgress />}>
                  <Converter />
                </React.Suspense>
              } />
              <Route path="rates" element={
                <React.Suspense fallback={<CircularProgress />}>
                  <Rates />
                </React.Suspense>
              } />
            </Routes>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
