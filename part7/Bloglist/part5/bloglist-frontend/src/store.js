import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import notificationRedu from './reducers/notificationRedu'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'


const store = configureStore({
    reducer: {
     notification: notificationRedu,
     blogMan: blogReducer,
     user: userReducer,
     userList: userListReducer
    }
  })


export default store