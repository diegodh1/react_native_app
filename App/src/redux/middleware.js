import { successSeccion, errorSeccion, successPaths, errorPaths, errorDirectoy, successDirectoy, errorFile, successFile, request,setext } from './actions/actions';

const middleware = store => next => action => {
    switch (action.type) {
        case "REQUEST_USER":
            const { user, pass } = action.usuario;
            fetch('http://192.168.0.21:4000/login', {
                method: 'POST',
                body: JSON.stringify({ user: user, password: pass }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    response.message !== 'Ingreso Realizado' ? store.dispatch(errorSeccion(response.message)) : store.dispatch(successSeccion(user, response.userId));
                })
                .catch(error => store.dispatch(errorSeccion(error)));
            break;
        case "REQUEST_PATHS":
            store.dispatch(request());
            fetch('http://192.168.0.21:4000/getRoutes')
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    store.dispatch(successPaths(myJson));
                })
                .catch(error => store.dispatch(errorPaths()));
            break;
        case "REQUEST_DIRECTORY":
            store.dispatch(request());
            const { path } = action;
            fetch('http://192.168.0.21:4000/getFiles', {
                method: 'POST',
                body: JSON.stringify({ path }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    response.message !== 'status 200, ok' ? store.dispatch(errorDirectoy()) : store.dispatch(successDirectoy(response.directory));
                })
                .catch(error => store.dispatch(errorDirectoy()));
            break;
        case "REQUEST_FILE":
            store.dispatch(request());
            store.dispatch(setext(action.extension));
            fetch('http://192.168.0.21:4000/getb64bits', {
                method: 'POST',
                body: JSON.stringify({ path: action.path }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.text())
                .then(response => {
                    store.dispatch(successFile(response))
                })
                .catch(error => store.dispatch(errorFile()));
            break;
        default:
            next(action);
    }
}
export default middleware;