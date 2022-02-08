import { authhost } from './index'

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

const createRecipe = async({
  title, 
  description, 
  cookingSteps,
  userId, 
  complexity, 
  cookingTime, 
  formData
}: IRecipeProps) => {
  try {
    const newRecipeImg = await authhost.post('api/recipe/new', formData)
    const newRecipe = await authhost.post('api/recipe/new', {
      title, 
      description, 
      cookingSteps, 
      user_id: userId, 
      complexity, 
      cookingTime, 
      img: newRecipeImg.data.img
    })
    return newRecipe
  } catch(e) {
    console.log(e)
  }
}

export default createRecipe