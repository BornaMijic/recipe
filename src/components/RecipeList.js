import React from "react";
import { Link } from "react-router-dom";
import useWindowWidth from "../hooks/useWindowWidth";
import RecipeDetails from "./RecipeDetails";
import {useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import { currentUser} from '../services/authenticationService';


const RecipeList = () => {
  const {width} = useWindowWidth();

  const navigate = useNavigate();

  const API_URL = 'https://recipe-8e76d-default-rtdb.europe-west1.firebasedatabase.app/';
  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null
  )

  const [logInUser, setLogInUser] = useState("");

  function navigateToAddRecipeForm() {
    navigate("/add-recipe");
  }

  function selectRecipe(recipe) {
    setSelectedRecipe(recipe);
  }


  function navigateToEditRecipeForm(event, id) {
    event.stopPropagation();
    event.preventDefault()
    navigate(`/edit-recipe/${id}`);
  }

  function deleteRecipe(id) {
  
    if(window.confirm("Do you want to remove?")) {
      try {
        const requestOptions = {
          method: "DELETE",
                  accept: "application/json",
        };

        const response = fetch(`${API_URL}/recipes/${id}.json`, requestOptions);

        setRecipes(recipes.filter(recipe => id !== recipe.id));


      } catch (err) {
      }
    }

  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes.json`);
        const data = await response.json();
        let recipes = [];
        Object.keys(data).forEach(key => {
          recipes.push({...data[key], id: key})
        });
          setRecipes(recipes);
      } catch(err){
        console.log(err);
      }
    }
    fetchItems()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      currentUser.subscribe((user) => {
        setLogInUser(user)
      })
    };
    getUser();
  }, []);

  return (
    <>
      {width >= 768 && (
        <section className="container">
          {logInUser && <><button className="btn btn-secondary btn-width" onClick={navigateToAddRecipeForm}>ADD NEW RECIPE</button><hr /></>}
          <div className="row">
            <div className="col-md-6">
            {recipes.map((recipe) => (
            <Link className="text-link" key={recipe.id} onClick={() => selectRecipe(recipe)}>
              <div className="recipe-box row text-box">
                <div className="col-md-7 col-12 recipe-name-and-author">
                  <h5>{recipe.name}</h5>
                </div>
                <div className="col-md-5 col-12">
                  <img className="image-url-box" src={recipe.imageUrl} />
                </div>
                <div className="col-md-12 col-12 recipe-name-and-author">
                  <p>By: {recipe.author}</p>
                </div>
                {logInUser === recipe.author && <button className="btn btn-warning" onClick={(event) => navigateToEditRecipeForm(event, recipe.id)}>EDIT</button>}
                {logInUser === recipe.author && <button className="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>DELETE</button>}
              </div>
            </Link>
          ))}
            </div>
            <div className="col-md-6">
            {!selectedRecipe  && (
                <div className="alert alert-info">
                  <p className="text-info">Select recipe</p>
                  </div>
              )}
              {selectedRecipe  && (
                  <RecipeDetails recipe={selectedRecipe}/> 
              )}
             
            </div>
          </div>
    
        </section>
      )}
       {width < 768 && (
        <section className="container">
          {logInUser && <><button className="btn btn-secondary btn-width" onClick={navigateToAddRecipeForm}>ADD NEW RECIPE</button><hr /></>}
        
            {recipes.map((recipe, index) => (
            <Link className="text-link" key={recipe.id} to={`/recipe-details/${recipe.id}`}>
              <div className="recipe-box row text-box">
                <div className="col-md-7 col-6 recipe-name-and-author">
                  <h3>{recipe.name}</h3>
                </div>
                <div className="col-md-5 col-6">
                  <img className="image-url-box" src={recipe.imageUrl} />
                </div>
                <div className="col-md-12 col-12 recipe-name-and-author">
                  <p>By: {recipe.author}</p>
                </div>
                {logInUser === recipe.author && <button className="btn btn-warning" onClick={(event) => navigateToEditRecipeForm(event, recipe.id)}>EDIT</button>}
                {logInUser === recipe.author && <button className="btn btn-danger" onClick={() => deleteRecipe(recipe.id)}>DELETE</button>}
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default RecipeList;
