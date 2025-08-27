'use client'
import { useEffect, useRef } from "react";

let audioRefGlobal = null;

export const useBackgroundAudio = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (typeof Audio !== "undefined") {
            if (!audioRefGlobal) {
                audioRefGlobal = new Audio("/sound/bg.mp3");
                audioRefGlobal.loop = true;
                audioRefGlobal.volume = 0.2;
            }
            audioRef.current = audioRefGlobal;
        }
    }, []);

    const PlaySoundBackground = (toggle) => {
        if (!audioRef.current) return;

        if (toggle) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) =>
                console.warn("Audio play failed", err)
            );
        } else {
            audioRef.current.pause();
        }
    };


    return { PlaySoundBackground };
};

export function PlayHoverSound() {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/sound/hover.mp3");
    }, []);

    const playSoundHover = () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                const playPromise = audioRef.current.play();
                audioRef.current.volume =  .5;

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio playback failed:", error);
                    });
                }
            }
        } catch (err) {
            console.log("Error playing audio:", err);
        }
    };

    return { playSoundHover };
}

export default function PlayTickSound() {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/sound/tick.mp3");
    }, []);



    const playSoundTick = () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                const playPromise = audioRef.current.play();
                audioRef.current.volume = .2;
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio playback failed:", error);
                    });
                }
            }
        } catch (err) {
            console.log("Error playing audio:", err);
        }
    };

    return { playSoundTick };
}