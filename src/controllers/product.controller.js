import { ObjectId } from "mongodb";

export async function getAllRecipes(req, res) {
  try {
    const recipes = await req.db.collection("recipes").find({}).toArray();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
}

export async function getRecipeById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await req.db
      .collection("recipes")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: "Recipe not exist" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
}

export async function createRecipe(req, res) {
  try {
    const {
      title,
      description,
      preparation,
      instructions,
      ingredients,
      nutritionalValues,
    } = req.body;

    if (
      !title ||
      typeof title !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      return res.status(400).json({
        message: "Title and description are required and type of string ",
      });
    }

    const newRecipe = {
      title,
      description,
      preparation: {
        ingredients: preparation.ingredients || "0 minutes",
        cooking: preparation.cooking || "0 minutes",
        total: preparation.total || "0 minutes",
      },
      instructions: instructions || [],
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      nutritionalValues: {
        calories: nutritionalValues.calories || 0,
        carbohydrates: nutritionalValues.carbohydrates || "0g",
        protein: nutritionalValues.protein || "0g",
        fat: nutritionalValues.fat || "0g",
      },
    };

    const result = await req.db.collection("recipes").insertOne(newRecipe);

    res.status(201).json({
      _id: result.insertedId,
      ...newRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Error creating recipe", error });
  }
}

export async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      preparation,
      instructions,
      ingredients,
      nutritionalValues,
    } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (preparation) {
      updateData.preparation = {
        ingredients: preparation.ingredients || "0 minutes",
        cooking: preparation.cooking || "0 minutes",
        total: preparation.total || "0 minutes",
      };
    }
    if (instructions) updateData.instructions = instructions;
    if (ingredients)
      updateData.ingredients = Array.isArray(ingredients) ? ingredients : [];
    if (nutritionalValues) {
      updateData.nutritionalValues = {
        calories: nutritionalValues.calories || 0,
        carbohydrates: nutritionalValues.carbohydrates || "0g",
        protein: nutritionalValues.protein || "0g",
        fat: nutritionalValues.fat || "0g",
      };
    }

    const result = await req.db
      .collection("recipes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully" });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Error updating recipe", error });
  }
}

export async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    const result = await req.db
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
}
