import { authHost } from './index'

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


export const createRecipeWithoutImg = async({
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
      })
      return newRecipe
    } catch(e) {
      console.log({e})
    }
}

export const updateRecipeImg = async({recipe_id, formData}: any) => {
  try {
    const newRecipeImg = await authHost.post('api/recipe/new', formData)
    console.log('UPDATE', newRecipeImg)
    const recipe = await authHost.put('api/recipe/new', {id: recipe_id, img: newRecipeImg.data})
    return recipe
  } catch(e) {
    console.log({e})
  }
}

// export const update

// export const addWishRecipe = async(recipe_id: any, userId: any) => {
//   try {
//     const wishRecipe = await authHost.post('/api/recipe/', {recipe_id, user_id: userId})
//     return wishRecipe
//   } catch(e) {
//     console.log(e)
//   }
// }