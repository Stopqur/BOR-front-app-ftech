import { authHost } from './index';

interface IRecipeProps {
  FormData?: any;
  title?: string;
  description?: string;
  cookingSteps?: any[];
  userId?: number;
  img?: any;
  complexity?: number;
  cookingTime?: string;
  formData?: any;
}

export const createRecipeWithoutImg = async ({
  title,
  description,
  cookingSteps,
  userId,
  complexity,
  cookingTime,
}: IRecipeProps) => {
  try {
    const newRecipe = await authHost.post('api/recipe/new', {
      title,
      description,
      cookingSteps,
      user_id: userId,
      complexity,
      cookingTime,
    });
    return newRecipe;
  } catch (e) {
    console.log({ e });
  }
};

export const updateRecipeImg = async ({ recipeId, formData }: any) => {
  try {
    const newRecipeImg = await authHost.post('api/recipe/new', formData);
    const recipe = await authHost.put('api/recipe/new', { id: recipeId, img: newRecipeImg.data });
    return recipe;
  } catch (e) {
    console.log({ e });
  }
};
