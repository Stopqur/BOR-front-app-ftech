import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'

import Auth from '../pages/Auth'
import RecipesList from './RecipesList'
import Profile from '../pages/Profile'
import WishList from '../pages/WishList'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/api/auth/sign-up' element={<Auth />} />
      <Route path='/api/auth/user/:id' element={<Profile />} />
      <Route path='/api/auth/sign-in' element={<Auth />} />
      <Route path='/recipe' element={<RecipesList />} />
      <Route path='/recipe/new' element={<RecipesList />} />
      <Route path='/recipe/user/:id' element={<RecipesList />} />
      <Route path='/api/wishlist/:id' element={<WishList />} />
      <Route path='/recipe/by/' element={<RecipesList />} />
      <Route path="*" element={<Navigate replace to="/recipe" />} />
    </Routes>
  )
}

export default AppRouter