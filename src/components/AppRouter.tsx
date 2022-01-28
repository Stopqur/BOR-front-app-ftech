import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'

import Auth from './Auth'
import RecipesList from './RecipesList'
import MainPage from './MainPage'
import Profile from './Profile'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/api/auth/sign-up' element={<Auth />} />
      <Route path='/api/auth/user/:id' element={<Profile />} />
      <Route path='/api/auth/sign-in' element={<Auth />} />
      <Route path='/recipe' element={<RecipesList />} />
      <Route path="*" element={<Navigate replace to="/recipe" />} />
    </Routes>
  )
}

export default AppRouter