import {createSlice} from '@reduxjs/toolkit'


const notification = ''


const reduceNoti = createSlice({
    name: 'notification',
    initialState: notification,
    reducers: {
        addNotification(state, action){
            state = action.payload;
          
            return state
        },
        clearNotification(state, action){
            return ''
        }
    }
})

export const popNotification =(notificationMessage, time) => {
    return (dispatch)=> {
    dispatch(addNotification(notificationMessage))
    
    setTimeout(()=> {
        dispatch(clearNotification())

    
      },time*1000)
    }
}

export const {addNotification, clearNotification} = reduceNoti.actions

export default reduceNoti.reducer

