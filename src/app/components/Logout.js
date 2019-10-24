import React from 'react';
import styles from "./Logout.module.css"
import {http} from "../service/http";

const Logout = (props) => {

    const {onLogout} = props;

    const onLogoutHandler = (event) => {
        event.preventDefault();
        http
            .delete("/logout")
            .then((response) => {
                console.log(response );
                localStorage.clear();
                onLogout()
            })
            .catch();
    };

    return (
        <a
            href={"#"}
            className={styles.logoutBtn}
            onClick={onLogoutHandler}>
            <i className="fas fa-sign-out-alt"></i>
        </a>
    )
};

export default Logout;