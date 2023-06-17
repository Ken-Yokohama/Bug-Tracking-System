import React, { useEffect, useState } from "react";
import { clearAllStorage } from "../../utils/api";
import WaveBackground from "./wave-background";

const Loading = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    const [complete5Seconds, setComplete5Seconds] = useState<boolean>(false);
    const [complete10Seconds, setComplete10Seconds] = useState<boolean>(false);
    const [complete20Seconds, setComplete20Seconds] = useState<boolean>(false);
    const [complete1Minute, setComplete1Minute] = useState<boolean>(false);

    useEffect(() => {
        const delay5Sec = setTimeout(() => {
            setComplete5Seconds(true);
        }, 5000);
        const delay10Sec = setTimeout(() => {
            setComplete10Seconds(true);
            clearAllStorage();
        }, 10000);
        const delay20Sec = setTimeout(() => {
            setComplete20Seconds(true);
        }, 20000);
        const delay1Min = setTimeout(() => {
            setComplete1Minute(true);
        }, 60000);
        return () => {
            clearTimeout(delay5Sec);
            clearTimeout(delay10Sec);
            clearTimeout(delay20Sec);
            clearTimeout(delay1Min);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div
                style={{
                    height: "100dvh",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "3rem",
                }}
            >
                <div>
                    <h1>
                        {complete5Seconds
                            ? "Spinning Up Backend..."
                            : "Loading..."}
                    </h1>
                    <br />
                    {complete10Seconds && <p>This Could Take Up to 1 minute</p>}
                    <br />
                    {complete20Seconds && (
                        <p>
                            While waiting, feel free to view my other projects{" "}
                            <a
                                target={"_blank"}
                                href="https://kenyokohama.com/"
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                    )}
                    <br />
                    {complete1Minute && (
                        <button onClick={handleRefresh}>Refresh Page</button>
                    )}
                </div>
            </div>
            {complete5Seconds && <WaveBackground />}
        </div>
    );
};

export default Loading;
