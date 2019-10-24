import React, {useState} from "react";

const CameraButtons = (props) => {
    const [facingUser, setFacingUser] = useState(false);

    const {onCameraSwitch} = props;

    return (
        <div>
            <button onClick={() => {
                setFacingUser(!facingUser);
                onCameraSwitch(!facingUser)
            }}>Switch</button>
        </div>
    )
};

export default CameraButtons;