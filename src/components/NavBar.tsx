import React from 'react';
import { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userDataAction } from '../store/actions/user';
import { getWishList } from '../store/actions/recipe';
import { UseSelectorType } from '../hooks/hookUseSelector';
import NewRecipe from './NewRecipe';
import { userProfile } from '../api/userApi';

const NavBar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { userId } = UseSelectorType((store) => store.authUserId);
  const [recipeModal, setRecipeModal] = useState<boolean>(false);

  const handleCreateRecipe = () => {
    setRecipeModal(true);
    navigate('/recipe/new');
  };

  const closeModal = () => {
    setRecipeModal(false);
    navigate('/recipe');
  };

  const getProfile = async () => {
    try {
      const idProfile = await userProfile(userId);
      dispatch(userDataAction(idProfile));
      const str = '/api/auth/user/' + userId;
      navigate(str);
    } catch (e) {
      console.log('error', { e });
    }
  };

  const logoutProfile = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/api/auth/sign-in');
    } catch (e) {
      console.log('error', e);
    }
  };

  const openRecipes = () => {
    navigate('/recipe');
  };

  const openWishList = () => {
    if (token) {
      dispatch(getWishList(userId));
      navigate('/api/wishlist/' + userId);
    }
  };

  const openMainPage = () => {
    navigate('/recipe');
  };

  const openRegister = () => {
    navigate('/api/auth/sign-up');
  };

  return (
    <Navbar className="px-5 py-3 mb-3 justify-content-between" bg="dark" variant="dark">
      {!token && (path === '/api/auth/sign-in' || path === '/api/auth/sign-up') ? (
        <Nav>
          <Button onClick={openRecipes}>All Recipes</Button>
        </Nav>
      ) : (!token && path === '/recipe') || !token ? (
        <Nav>
          <Button onClick={openRegister}>Register</Button>
        </Nav>
      ) : path === '/api/auth/user/' + userId ? (
        <Nav>
          <Button variant="outline-info" onClick={openMainPage}>
            Main page
          </Button>
        </Nav>
      ) : path === '/api/wishlist/' + userId ? (
        <Nav>
          <Button variant="outline-info" onClick={openMainPage}>
            Main page
          </Button>
        </Nav>
      ) : token ? (
        <Nav className="w-100 justify-content-between">
          <div>
            <Button className="btn-nav-bar" variant="outline-info" onClick={getProfile}>
              Profile
            </Button>
            <Button className="btn-nav-bar" variant="outline-info" onClick={handleCreateRecipe}>
              Add recipe
            </Button>
            <NewRecipe show={recipeModal} close={closeModal} />
            <Button className="btn-nav-bar" variant="outline-info" onClick={openWishList}>
              Wishlist
            </Button>
          </div>
          <div>
            <Button variant="outline-danger" onClick={logoutProfile}>
              Logout
            </Button>
          </div>
        </Nav>
      ) : null}
    </Navbar>
  );
};

export default NavBar;
