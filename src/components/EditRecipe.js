import React from "react";
import { Control, useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { data } from "jquery";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditRecipe = (props) => {
  const API_URL =
    "https://recipe-8e76d-default-rtdb.europe-west1.firebasedatabase.app/";
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [author, setAuthor] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/${id}.json`);
        const data = await response.json();

        setValue("name", data.name);
        setValue("imageUrl", data.imageUrl);
        setValue("recipeText", data.recipeText);
        setAuthor(data.author)

        let ingredientsMock = [];

          Object.keys(data.ingredients).forEach((key) => {
            ingredientsMock.push({ ...data.ingredients[key], id: key });
          });
          setIngredients(ingredientsMock);
  
          for (let i = 0; i < ingredientsMock.length; i++) {
            append({ name: ingredientsMock[i].name, amount: ingredientsMock[i].amount });
          }
        

      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");

  function navigateToHome() {
    navigate("/");
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);

    if (data.ingredients.length > 0) {
      try {
        let recipe = {
          name: data.name,
          imageUrl: data.imageUrl,
          ingredients: data.ingredients,
          recipeText: data.recipeText,
          author: author
        };

        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          accept: "application/json",
          body: JSON.stringify(recipe),
        };
        const response = await fetch(`${API_URL}/recipes/${id}.json`, requestOptions);
        await response.json().then((data) => {
          if (data.error !== undefined) {
            setError("Unkown error");
          } else {
            setError("");
            navigateToHome();
          }
        });
      } catch (err) {
        setError("Unkown error");
      }
    } else {
      setError("You need to add atleast one ingredient");
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        {error.length > 0 && (
          <div className="alert alert-danger">
            <p className="text-danger">{error}</p>
          </div>
        )}
        <div>
          <label>Recipe name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-danger">Name is required</span>}
        </div>
        <hr />
        <div>
          <label>Recipe image</label>
          <input
            type="text"
            className="form-control"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-danger">Name is required</span>
          )}
          <br />
          <label>Recipe image preview</label>
          <img src={imageUrl} />
        </div>
        <hr />
        <div>
          <label>Ingredients</label>
          {fields.map((field, index) => {
            return (
              <section key={field.id}>
                <label>
                  <span>Name</span>
                  <input
                    className="form-control"
                    type="text"
                    {...register(`ingredients[${index}].name`, {
                      required: true,
                    })}
                  />
                  {errors.ingredients?.[index]?.name && (
                    <span className="text-danger">Name is required</span>
                  )}
                </label>
                <label>
                  <span>Amount</span>
                  <input
                    className="form-control"
                    type="text"
                    {...register(`ingredients[${index}].amount`, {
                      required: true,
                    })}
                  />
                  {errors.specificIngredient?.[index]?.amount && (
                    <span className="text-danger">Name is required</span>
                  )}
                </label>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  X
                </button>
              </section>
            );
          })}
          <hr />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              append({ name: "", amount: "" });
            }}
          >
            Add new ingredient
          </button>
        </div>
        <hr />

        <div>
          <label>Recipe text</label>
          <textarea
            type="text"
            className="form-control"
            {...register("recipeText", { required: true })}
          ></textarea>
          {errors.recipeText && (
            <span className="text-danger">Recipe text is required</span>
          )}
        </div>
        <button className="btn btn-primary btn-width">Add</button>
      </form>
    </div>
  );
};

export default EditRecipe;
