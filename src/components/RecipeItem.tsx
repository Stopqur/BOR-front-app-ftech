import { useState } from 'react'
import { Button, ListGroup, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { UseSelectorType } from '../hooks/hookUseSelector'
import { deleteUserRecipe } from '../store/actions/recipe'
import { addWishRecipe } from '../store/actions/recipe'

interface RecipeProps {
  item: {
    title: string;
    description: string;
    cookingSteps: any[];
    img: string;
    complexity: number;
    cookingTime: string;
    user_id: number;
    id: number;
  };
  flagIcon: boolean;
  token: string | null;
}

interface WishProps {
  recipe_id: number | undefined;
  userId: number | undefined;
}

const RecipeItem = ({ item, flagIcon, token }: RecipeProps) => {
  const dispatch = useDispatch()
  const recipe_id = item.id
  const { userId } = UseSelectorType(store => store.authUserId)
  const [heartIcon, setHeartIcon] = useState<boolean>(flagIcon)

  const handleAddWishRecipe = async ({recipe_id, userId}: WishProps) => {
    try {
      dispatch(addWishRecipe(recipe_id, userId))
      setHeartIcon(!heartIcon)
    } catch(e) {
      console.log(e)
    }
  } 

  const handleDeleteRecipe = (param: string, paramValue: string) => {
    try {
      dispatch(deleteUserRecipe(param, paramValue))
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <ListGroup.Item className='recipe'>
      <div className='d-flex justify-content-between align-items-center pb-2'>
        <div>
          <h2>{item.title}</h2>
          <p style={{color: "orange"}}>{item.description}</p>
          {item.cookingSteps !== undefined ?
          <div>
            <p>Cooking steps: </p>
            <ul >
              {item.cookingSteps.map((step, index) => {
                return <li key={index}>{index + 1}) {step.name}</li>
              })}
            </ul>
          </div>
          : null
          }
          <div className='recipe__cooking-info'>
            <div className='recipe__cooking-info-item'>
              <p className='recipe__cooking-info-title'>Complexity: </p>
              <p className='recipe__cooking-info-title--color'> {item.complexity}</p>
            </div>
            <div className='recipe__cooking-info-item'>
              <p className='recipe__cooking-info-title'>Cooking time: </p>
              <p className='recipe__cooking-info-title--color'> {item.cookingTime} min</p>
            </div>
          </div>
          {token ? 
            <div className='recipe__icon-btn'>
            <Button 
              variant='outline-danger'
              className='recipe__icon-btn--bg'
              onClick={() => handleAddWishRecipe({recipe_id, userId})}>
              {heartIcon ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              )
              }
              </Button>
            </div>
            : null
          }
        </div>
        <div>
          <Image width={150} height={150} src={`http://localhost:5000/${item.img}`}/>
        </div>
      </div>
      {item.user_id === userId ?
        <div className='d-flex justify-content-end'>
          <Button variant='danger' onClick={() => handleDeleteRecipe('recipeId', `${recipe_id}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
          </Button>
        </div>
      : null
      }
    </ListGroup.Item> 
  )
}

export default RecipeItem