import { createContext, useContext, userEffect, useState} from 'react';

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageURL: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenitcated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    chechAuthUser: async () => false as boolean,
}

const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext