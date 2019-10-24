import {getAuthorized} from "../app/service/http";


export function getCurrentUser() {
    return new Promise((resolve, reject)=> {
        getAuthorized()
            .get("/users/me")
            .then(user => resolve(user.data))
            .catch((error) => reject(error));
    });
}
export function getUserStore() {
    return new Promise((resolve)=> {
        getAuthorized()
            .get("/deliverers/stores")
            .then(store => resolve(store.data))
            .catch();
    });
}