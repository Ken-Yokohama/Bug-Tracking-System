import React from "react";

const Loading = () => {

    const handleRefresh = () => {
        window.location.reload();
    }

    return (
        <div>
            <h1>Spinning Up Backend... <br />Please Wait...</h1>
            <br />
            <p>This Could Take Up to 15 seconds</p>
            <br />
            <button onClick={handleRefresh}>Refresh Page</button>
        </div>
    );
};

export default Loading;
