import React from "react";

export default function error(props) {
    const { isError } = props;

    if (isError) {
        return (
            <div className="alert alert-danger">
                Both selected currencies are same...
            </div>
        );
    } else {
        return <></>;
    }
}
