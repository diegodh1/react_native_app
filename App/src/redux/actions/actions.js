import { Alert } from "react-native";

export const VALIDARUSUARIO = 'validateUser';
export const REQUEST_USER = 'REQUEST_USER';
export const ERROR_USER = 'ERROR_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_PATHS = 'REQUEST_PATHS';
export const ERROR_PATHS = 'ERROR_PATHS';
export const RECEIVE_PATHS = 'RECEIVE_PATHS';
export const REQUEST_DIRECTORY = 'REQUEST_DIRECTORY';
export const RECEIVE_DIRECTORY = 'RECEIVE_DIRECTORY';
export const ERROR_DIRECTORY = 'ERROR_DIRECTORY';
export const REQUEST_FILE = 'REQUEST_FILE';
export const RECEIVE_FILE = 'RECEIVE_FILE';
export const ERROR_FILE = 'ERROR_FILE';
export const REQUEST = 'REQUEST';
export const SET_EXT = 'SET_EXT';
export const REQUEST_UPLOAD = 'REQUEST_UPLOAD';
export const SUCCESS_UPLOAD = 'SUCCESS_UPLOAD';
export const ERROR_UPLOAD = 'ERROR_UPLOAD';
export const SEARCH_OT = 'SEARCH_OT';
export const RECEIVE_OT = 'RECEIVE_OT';
export const ERROR_OT = 'ERROR_OT';
export const REQUEST_REMISION = 'REQUEST_REMISION';
export const RECEIVE_REMISION = 'RECEIVE_REMISION';
export const ERROR_REMISION = 'ERROR_REMISION';
export const REQUEST_COMPONENTES = 'REQUEST_COMPONENTES';
export const RECEIVE_COMPONENTES = 'RECEIVE_COMPONENTES';
export const ERROR_COMPONENTES = 'ERROR_COMPONENTES';
export const REQUEST_SAVE_CPTE = 'REQUEST_SAVE_CPTE';
export const RECEIVE_SAVE_CPTE = 'RECEIVE_SAVE_CPTE';
export const ERROR_SAVE_CPTE = 'ERROR_SAVE_CPTE';
//******************LOGIN*******************
export const successSeccion = (user, id) => {
    return {
        type: RECEIVE_USER,
        usuario: {
            user,
            id,
            islogued: true,
        }
    }
}
export const errorSeccion = error => {
    return {
        type: ERROR_USER,
        message: 'usuario y/o contraseña incorrectos',
    }
}
export const requestSeccion = (user, pass) => {
    return {
        type: REQUEST_USER,
        usuario: {
            user,
            pass,
        }
    }
}
//**********************HOME********************/
export const requestPaths = () => {
    return {
        type: REQUEST_PATHS,
    }
}
export const successPaths = paths => {
    return {
        type: RECEIVE_PATHS,
        paths: paths['routes'],
    }
}
export const errorPaths = () => {
    return {
        type: ERROR_PATHS,
        message: 'Error al obtener las rutas',
    }
}
//******************GET DIRECTOY*****************/
export const requestDirectoy = path => {
    return {
        type: REQUEST_DIRECTORY,
        path,
    }
}
export const successDirectoy = (paths, path) => {
    return {
        type: RECEIVE_DIRECTORY,
        paths,
        path,
    }
}
export const errorDirectoy = () => {
    return {
        type: ERROR_DIRECTORY,
        message: 'Error al obtener el directorio',
    }
}
//**************FILE TO 64 BITS*************/
export const requestFile = (path, extension) => {
    return {
        type: REQUEST_FILE,
        path,
        extension,
    }
}
export const successFile = encoded64 => {
    return {
        type: RECEIVE_FILE,
        encoded64,
    }
}

export const errorFile = () => {
    return {
        type: ERROR_FILE,
        message: 'Error al obtener el archivo',
    }
}
export const request = () => {
    return {
        type: REQUEST,
    }
}
export const setext = extension => {
    return {
        type: SET_EXT,
        extension,
    }
}
export const successUpload = message => {
    return {
        type: SUCCESS_UPLOAD,
        message,
    }
}

export const errorUpload = message => {
    return {
        type: ERROR_UPLOAD,
        message: 'Error al subir el archivo',
    }
}
export const requestUpload = (image, path, name) => {
    return {
        type: REQUEST_UPLOAD,
        image,
        path,
        name
    }
}
export const search_ot_remision = ot => {
    return {
        type: SEARCH_OT,
        ot,
    }
}
export const receive_ot_remision = (header_remision, ot) => {
    return {
        type: RECEIVE_OT,
        header_remision,
        ot,
    }
}
export const error_ot_remision = () => {
    return {
        type: RECEIVE_OT,
        header_remision: {},
    }
}
export const request_remision = (ot,id_user) => {
    return {
        type: REQUEST_REMISION,
        ot,
        id_user,
    }
}
export const receive_remision = items_remision => {
    return {
        type: RECEIVE_REMISION,
        items_remision,
    }
}
export const error_remision = () => {
    return {
        type: ERROR_REMISION,
        items_remision: [],
    }
}
export const request_componentes = (ot,item,nro) => {
    return {
        type: REQUEST_COMPONENTES,
        ot,
        item,
        nro,
    }
}
export const receive_componentes = item_componentes => {
    return {
        type: RECEIVE_COMPONENTES,
        item_componentes,
    }
}
export const error_componentes = () => {
    return {
        type: ERROR_COMPONENTES,
        item_componentes: [],
    }
}
export const request_save_cpte= (id_sub_item,id_componente,id_usuario,requerida,ot,item,nro) => {
    return {
        type: REQUEST_SAVE_CPTE,
        id_sub_item,
        id_componente,
        id_usuario,
        requerida,
        ot,
        item,
        nro,
    }
}
export const receive_save_cpte = item_componentes => {
    return {
        type: RECEIVE_SAVE_CPTE,
        item_componentes,
    }
}
export const error_save_cpte= () => {
    return {
        type: ERROR_SAVE_CPTE,
        item_componentes: [],
    }
}
