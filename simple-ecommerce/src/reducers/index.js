import { combineReducers } from 'redux'

const init = {
    id: 28,
    username: 'fahrezialwi'
}

const AuthReducer = (state = init, action) => {
    switch(action.type) {
        case "asd":
            break;

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