import { useState } from 'react'
import { Button, ListGroup, Image } from 'react-bootstrap'

import { authhost } from '../api'
import { UseSelectorType } from '../hooks/hookUseSelector'

interface RecipeProps {
  item: {
    title: string;
    description: string;
    cookingSteps: any[];
    img: string;
    complexity: number;
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
  const recipe_id = item.id
  const { userId } = UseSelectorType(store => store.authUserId)
  const [heartIcon, setHeartIcon] = useState<boolean>(flagIcon)

  const handleAddRecipe = ({recipe_id, userId}: WishProps) => {
    try {
      const request = authhost.post('/api/recipe/', {recipe_id, user_id: userId})
      setHeartIcon(!heartIcon)
      console.log(request)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ListGroup.Item className='recipe d-flex justify-content-between align-items-center'>
      <div>
        <h2>{item.title}</h2>
        <p style={{color: "orange"}}>{item.description}</p>
        {item.cookingSteps !== undefined ?
        <div>
          <p>Шаги приготовления: </p>
          <ul >
            {item.cookingSteps.map((step, index) => {
              return <li key={index}>{index + 1}) {step.name}</li>
            })}
          </ul>
        </div>
        : null
        }
        <div className='d-flex align-items-center'>
          <p>Complexity: </p>
          <p className='complexity'> {item.complexity}</p>
        </div>
        {token ? 
          <div className='recipe__icon-btn'>
          <Button 
            variant='outline-danger'
            onClick={() => handleAddRecipe({recipe_id, userId})}>
            {heartIcon ?
            <img src='https://img.icons8.com/color/48/000000/like--v3.png' className='recipe_icon' alt=''></img>
            :
            <img src="https://img.icons8.com/ios-glyphs/30/000000/like--v1.png" className='recipe_icon' alt=''></img>
            }
            </Button>
          </div>
          : null
        }
        
      </div>
      <div>
        <Image width={150} height={150} src={`http://localhost:5000/${item.img}`}/>
      </div>
    </ListGroup.Item> 
  )
}

export default RecipeItem