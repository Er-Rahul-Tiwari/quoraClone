import {createStore, combineReducers, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import Logger from 'redux-logger'
import {Profile} from './profile'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            ProfileData: Profile,            
        }),
        applyMiddleware(Thunk, Logger)
    )    
    return store
}