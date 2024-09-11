import {configureStore} from '@reduxjs/toolkit'


const store = configureStore({
    reducer:{
        admin,
        user
    }
})