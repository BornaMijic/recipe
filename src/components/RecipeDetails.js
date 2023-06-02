import React from "react";
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';



const RecipeDetails = (props) => {

  const API_URL = 'https://recipe-8e76d-default-rtdb.europe-west1.firebasedatabase.app/';
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/${id}.json`);
        const data = await response.json();
        setRecipe(data);
        let ingredientsMock = [];
        Object.keys(data.ingredients).forEach(key => {
          ingredientsMock.push({...data.ingredients[key], id: key})
        });
        setIngredients(ingredientsMock);
      } catch(err){
        console.log(err);
      }
    }
    fetchItems()
  }, [])

  return (
    <section className="container">
       {(recipe != null && props.recipe == null) && (
      <div className="recipe-detail-box">
        <h3>{recipe.name}</h3>
        <p>By: {recipe.author}</p>
        <hr/>
        <img className="image-url-detail" src={recipe.imageUrl}/>
        <hr/>
        <h4>Ingredients:</h4>
        {ingredients.map((ingredient) =>(
            <p key={ingredient.id}>{ingredient.name} - {ingredient.amount}</p>
        ))}
        <hr/>
        <h4>Recipe</h4>
        <hr/>
        <p className="text-box">{recipe.recipeText}</p>
      </div>)}

      {(recipe == null && props.recipe != null) && (
      <div className="recipe-detail-box">
        <h3>{props.recipe.name}</h3>
        <p>By: {props.recipe.author}</p>
        <hr/>
        <img className="image-url-detail" src={props.recipe.imageUrl}/>
        <hr/>
        <h4>Ingredients:</h4>
        {props.recipe.ingredients.map((ingredient) =>(
            <p key={ingredient.id}>{ingredient.name} - {ingredient.amount}</p>
        ))}
        <hr/>
        <h4>Recipe</h4>
        <hr/>
        <p className="text-box">{props.recipe.recipeText}</p>
      </div>)}
    </section>
  );
};

export default RecipeDetails;
