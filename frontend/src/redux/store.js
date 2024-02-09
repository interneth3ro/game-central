import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './user/userSlice';

const reducers = combineReducers({ userSlice });

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer
});

export default store;
