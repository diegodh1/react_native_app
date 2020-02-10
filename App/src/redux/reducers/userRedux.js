import {
    REQUEST_USER,
    ERROR_USER,
    RECEIVE_USER,
    REQUEST_PATHS,
    RECEIVE_PATHS,
    ERROR_PATHS,
    REQUEST_DIRECTORY,
    RECEIVE_DIRECTORY,
    ERROR_DIRECTORY,
    REQUEST_FILE,
    RECEIVE_FILE,
    ERROR_FILE,
    REQUEST,
    SET_EXT
}
    from '../actions/actions';
const initialState = {
    usuario: { user: '', pass: '', islogued: false },
    message: '',
    paths: [],
    directorys: [],
    encoded64: '',
    cargando: false,
    extension: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER:
            return { ...state, usuario: action.usuario, cargando: true };
        case ERROR_USER:
            return { ...state, message: action.message };
        case RECEIVE_USER:
            return { ...state, usuario: action.usuario, message: 'Ingreso Realizado', cargando: false };
        case REQUEST_PATHS:
            return { ...state, cargando: true };
        case RECEIVE_PATHS:
            return { ...state, paths: action.paths, cargando: false };
        case ERROR_PATHS:
            return { ...state, message: action.message };
        case REQUEST_DIRECTORY:
            return { ...state };
        case RECEIVE_DIRECTORY:
            return { ...state, paths: action.paths, cargando: false };
        case ERROR_DIRECTORY:
            return { ...state, message: action.message };
        case REQUEST_FILE:
            return { ...state };
        case RECEIVE_FILE:
            return { ...state, encoded64: action.encoded64, cargando: false };
        case ERROR_FILE:
            return { ...state, message: action.message };
        case REQUEST:
            return { ...state, cargando: true };
        case SET_EXT:
            return { ...state, extension: action.extension };
        default:
            return state;
    }
}
export default reducer;