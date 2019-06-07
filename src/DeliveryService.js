import {getAuthorized} from "./Service/http";

class DeliveryService {
    getDeliveryProduct(code) {
        return new Promise((resolve, reject)=> {
            getAuthorized()
                .get(`/api/deliverers/deliveries/human-ids/${code}/products`)
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }
}

const deliveryService = new DeliveryService();
export default deliveryService;