import React from 'react'
import { ListGroup } from 'react-bootstrap'

interface RecipeProps {
  item: {
    title: string;
    description: string;
    cookingSteps: string;
    img: string;
  };
}

const Recipe = ({ item }: RecipeProps) => {
  return (
    <ListGroup.Item>
      <div>
        <h2>{item.title}</h2>
        <p style={{color: "orange"}}>{item.description}</p>
        <ul>
          <li>
            {item.cookingSteps}
          </li>
        </ul>
        {item.img}
      </div>
    </ListGroup.Item> 
  )
}

export default Recipe