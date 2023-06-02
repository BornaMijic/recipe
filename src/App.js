import "./App.css";
import React from "react";
import Navigation from "./components/Navigation";
import RecipeDetails from "./components/RecipeDetails";
import RecipeList from "./components/RecipeList";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<RecipeList />}></Route>
        <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
