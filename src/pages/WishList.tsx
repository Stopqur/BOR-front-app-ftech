import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { UseSelectorType } from '../hooks/hookUseSelector'
import RecipeItem from '../components/RecipeItem'
import { getWishList } from '../store/actions/recipe'

const WishList:React.FC = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const { wishRecipes } = UseSelectorType(store => store.wishRecipes)
  const { userId } = UseSelectorType(store => store.authUserId)

  useEffect(() => {
    dispatch(getWishList(userId))
  }, [dispatch, userId])

  return (
    <div className='px-5 py-5'>
      <ListGroup>
        {wishRecipes.map(item => {
          return <RecipeItem key={item.id} item={item} flagIcon={true} token={token}/>
        })}
      </ListGroup>
    </div>
  )
}

export default WishList