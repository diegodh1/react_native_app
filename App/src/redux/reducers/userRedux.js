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
    SET_EXT,
    SUCCESS_UPLOAD,
    ERROR_UPLOAD,
    SEARCH_OT,
    RECEIVE_OT,
    ERROR_OT,
    REQUEST_REMISION,
    RECEIVE_REMISION,
    ERROR_REMISION,
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
    path: 'hola',
    ot: '',
    header_remision: {},
    items_remision: [['', '', '', '']],
    id_remision: '',
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
            return { ...state, path: action.path };
        case RECEIVE_DIRECTORY:
            return { ...state, paths: action.paths, path: action.path, cargando: false };
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
        case SUCCESS_UPLOAD:
            return { ...state, message: action.message, cargando: false };
        case ERROR_UPLOAD:
            return { ...state, message: action.message, cargando: false };
        case SEARCH_OT:
            return { ...state, ot: action.ot };
        case RECEIVE_OT:
            return { ...state, header_remision: action.header_remision, ot: action.ot };
        case ERROR_OT:
            return { ...state, header_remision: action.header_remision };
        case REQUEST_REMISION:
            return { ...state };
        case RECEIVE_REMISION:
            return { ...state, items_remision: action.items_remision };
        case ERROR_REMISION:
            return { ...state, items_remision: action.items_remision };
        default:
            return state;
    }
}
export default reducer;