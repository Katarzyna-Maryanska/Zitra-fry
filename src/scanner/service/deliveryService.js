import {getAuthorized} from "../../app/service/http";

export function getDeliveryProduct(code) {
    return new Promise((resolve, reject)=> {
        getAuthorized()
            .get(`/api/deliverers/deliveries/human-ids/${code}/products`)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });
}