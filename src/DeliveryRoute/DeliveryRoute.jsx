import React from 'react';
import './DeliveryRoute.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {http} from '../Service/http';

class DeliveryRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            route: null,
            visitedPickUpPoints: []
        }
    }

    componentDidMount() {
        http
            .get(`/api/deliverers/stores/${this.props.store.id}/routes`)
            .then(response => {
                this.setState({route: response.data});
                this.getVisitedPickupPoints(this.props.store.id, response.data.id)
            });
    }

    checkIn(storePickUpPointId) {
        const storeId = this.props.store.id;
        const routeId = this.state.route.id;

        http
            .post(`/api/deliverers/stores/${storeId}/routes/${routeId}/check-ins`, {storePickUpPointId})
            .then(() => {
                this.getVisitedPickupPoints(storeId, routeId)
            })
            .catch(() => alert('Już wysłałeś powiadomienia'));
    }

    getVisitedPickupPoints(storeId, routeId) {
        http
            .get(`/api/deliverers/stores/${storeId}/routes/${routeId}/check-ins`)
            .then((response) => {
                if (response.data.length) {
                    const visited = response.data.map((visitedPickUpPoint) => {
                        return visitedPickUpPoint.storePickUpPointId;
                    });
                    this.setState({visitedPickUpPoints: visited})
                }
            })
            .catch();
    }

    render() {
        return (
            <ListGroup>
                <ListGroup.Item variant="secondary">
                    Adresy dostaw
                </ListGroup.Item>
                <ListGroup  className="route-scroll">
                    {this.state.route && this.state.route.pickUpPoints.map((pickUpPoint, index) => {
                        return (
                            <ListGroup key={index}>
                                <ListGroup.Item
                                    variant="action"
                                    className="flex">
                                    {pickUpPoint.street} {pickUpPoint.buildingNumber}<br/>
                                    {pickUpPoint.postalCode} {pickUpPoint.city}
                                    <Button
                                        variant={"primary"}
                                        disabled={this.state.visitedPickUpPoints.includes(pickUpPoint.id)}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.checkIn(pickUpPoint.id);
                                        }}>Już jestem!
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        )
                    })}
                </ListGroup>
            </ListGroup>
        );
    }
}

export default DeliveryRoute;
