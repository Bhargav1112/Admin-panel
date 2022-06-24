import React from "react";
import ReactDOM from "react-dom";

const BackDrop = () => {
    return <div className="backdrop" />;
};

const ModalContent = (props) => {
    return (
        <div className="add-medicine-dialog">
            <div>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");
function AddMedicine(props) {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, portalElement)}
            {ReactDOM.createPortal(<ModalContent />, portalElement)}
        </>
    );
}

export default AddMedicine;
