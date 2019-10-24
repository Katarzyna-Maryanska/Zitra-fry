import {useEffect} from 'react';
import history from '../../app/service/history';

const Authorized = (props) => {

    const {children, loggedIn} = props;

    useEffect(() => {
        if (!loggedIn) {
            history.push('/fry/login');
        }
    }, [loggedIn]);


    if (loggedIn) {
        return children;
    }

    return null;
};

export default Authorized;