import { combineReducers } from 'redux'

const init = {
    id: '',
    username: ''
}

const AuthReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {...state, id: action.payload.id, username: action.payload.username}

        default:
            return state
    }
}

const reducers = combineReducers(
    {
        auth: AuthReducer
    }
)

export default reducers

// Pertama kali aplikasi running, reducer akan menjalankan kode yang ada di default
// Pada default kita akan return state yang berisi object init sebagai data awal