"use client";

import { getLocationCity } from "@/lib/ip_info";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { LuPlay, LuRotateCcw, LuTrophy, LuCpu, LuMonitor } from "react-icons/lu";

export default function FullScreenDinoGame() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [myLocation, setMyLocation] = useState("");

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationFrameRef = useRef(null);
    const countdownTimerRef = useRef(null);

    const dinoY = useRef(0);
    const dinoVelocity = useRef(0);
    const obstacles = useRef([]);
    const frameCount = useRef(0);
    const gameSpeed = useRef(1.8);

    const GRAVITY = 0.6;
    const JUMP_FORCE = -10.5;
    const BASE_WIDTH = 480;
    const BASE_HEIGHT = 180;
    const DINO_WIDTH = 20;
    const DINO_HEIGHT = 30;

    const handleJump = useCallback(() => {
        if (!isGameStarted || isGameOver || countdownTimerRef.current !== null) return;
        if (dinoY.current === 0) {
            dinoVelocity.current = JUMP_FORCE;
        }
    }, [isGameStarted, isGameOver]);

    const triggerPreflightSequence = () => {
        if (countdownTimerRef.current !== null) return;

        setIsGameOver(false);
        setIsGameStarted(false);
        setScore(0);

        let counter = 3;
        setCountdown(counter);

        countdownTimerRef.current = setInterval(() => {
            counter--;
            if (counter > 0) {
                setCountdown(counter);
            } else {
                clearInterval(countdownTimerRef.current);
                countdownTimerRef.current = null;
                setCountdown(null);
                bootGameEngine();
            }
        }, 1000);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space" || e.code === "ArrowUp" || e.key === "Enter") {
                e.preventDefault();
                if (countdown !== null) return;

                if (!isGameStarted && !isGameOver) {
                    triggerPreflightSequence();
                } else if (isGameOver) {
                    triggerPreflightSequence();
                } else {
                    handleJump();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isGameStarted, isGameOver, handleJump, countdown]);

    const bootGameEngine = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setScore(0);
        dinoY.current = 0;
        dinoVelocity.current = 0;
        obstacles.current = [{ x: BASE_WIDTH + 140, width: 14, height: 26 }];
        frameCount.current = 0;
        gameSpeed.current = 1.8;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;

        const renderLoopFrame = () => {
            if (!isGameStarted || isGameOver) return;

            ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
            frameCount.current++;

            if (frameCount.current % 6 === 0) {
                setScore((prev) => {
                    const current = prev + 1;
                    if (current > highScore) setHighScore(current);
                    return current;
                });
            }

            if (frameCount.current % 450 === 0 && gameSpeed.current < 12) {
                gameSpeed.current += 0.25;
            }

            dinoVelocity.current += GRAVITY;
            dinoY.current += dinoVelocity.current;
            if (dinoY.current >= 0) {
                dinoY.current = 0;
                dinoVelocity.current = 0;
            }

            const currentDinoX = 30;
            const currentDinoY = BASE_HEIGHT - DINO_HEIGHT + dinoY.current;

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.roundRect(currentDinoX, currentDinoY, DINO_WIDTH, DINO_HEIGHT, 3);
            ctx.fill();

            ctx.fillStyle = "#10b981";
            ctx.fillRect(currentDinoX + 12, currentDinoY + 6, 3, 3);

            const spawnInterval = Math.max(140, 240 - Math.floor(gameSpeed.current * 12));
            if (frameCount.current % spawnInterval === 0) {
                const height = 18 + Math.random() * 20;
                const width = 10 + Math.random() * 8;
                obstacles.current.push({ x: BASE_WIDTH, width, height });
            }

            obstacles.current = obstacles.current.filter((obs) => {
                obs.x -= gameSpeed.current;

                ctx.fillStyle = "#404040";
                ctx.beginPath();
                ctx.roundRect(obs.x, BASE_HEIGHT - obs.height, obs.width, obs.height, 2);
                ctx.fill();

                const obsY = BASE_HEIGHT - obs.height;
                if (
                    currentDinoX < obs.x + obs.width &&
                    currentDinoX + DINO_WIDTH > obs.x &&
                    currentDinoY < obsY + obs.height &&
                    currentDinoY + DINO_HEIGHT > obsY
                ) {
                    setIsGameOver(true);
                }

                return obs.x + obs.width > 0;
            });

            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, BASE_HEIGHT - 1);
            ctx.lineTo(BASE_WIDTH, BASE_HEIGHT - 1);
            ctx.stroke();

            animationFrameRef.current = requestAnimationFrame(renderLoopFrame);
        };

        if (isGameStarted && !isGameOver) {
            animationFrameRef.current = requestAnimationFrame(renderLoopFrame);
        } else {
            ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.beginPath();
            ctx.moveTo(0, BASE_HEIGHT - 1);
            ctx.lineTo(BASE_WIDTH, BASE_HEIGHT - 1);
            ctx.stroke();

            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.beginPath();
            ctx.roundRect(30, BASE_HEIGHT - DINO_HEIGHT, DINO_WIDTH, DINO_HEIGHT, 3);
            ctx.fill();
        }

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isGameStarted, isGameOver, highScore]);

    useEffect(() => {
        getLocationCity()
            .then(response => setMyLocation(response.city))
            .catch(e => setMyLocation("Unknown"));

        return () => {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        };
    }, []);

    const handleScreenPress = (e) => {
        e.preventDefault();
        if (countdown !== null) return;

        if (!isGameStarted || isGameOver) {
            triggerPreflightSequence();
        } else {
            handleJump();
        }
    };

    return (
        <div
            ref={containerRef}
            onTouchStart={handleScreenPress}
            onClick={handleScreenPress}
            className="fixed inset-0 w-screen h-screen bg-neutral-950 text-neutral-200 flex flex-col justify-between p-2 sm:p-6 overflow-hidden select-none touch-none"
        >
            <header className="w-full max-w-4xl mx-auto flex items-center justify-between border-b border-neutral-900 pb-2 z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-[8px] tracking-widest text-emerald-400 uppercase">
                        <LuCpu className="w-2.5 h-2.5" /> IO_RUN
                    </div>
                    <h1 className="text-xs font-bold tracking-tight text-white font-sans">
                        DINO.SYSTEMS
                    </h1>
                </div>

                <div className="flex items-center gap-3 text-[10px] tracking-wider">
                    <div className="text-neutral-400 scale-90 sm:scale-100">
                        SC: <span className="text-white font-bold">{score}</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded text-[9px] sm:text-xs">
                        <LuTrophy className="w-2.5 h-2.5" />
                        <span>HI: <strong className="text-white font-bold">{highScore}</strong></span>
                    </div>
                </div>
            </header>

            <div className="w-full max-w-3xl mx-auto my-auto relative flex items-center justify-center p-1">
                <canvas
                    ref={canvasRef}
                    width={BASE_WIDTH}
                    height={BASE_HEIGHT}
                    className="w-full h-auto object-contain max-h-[35vh] sm:max-h-[45vh]"
                />

                {countdown !== null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1 pointer-events-none animate-in zoom-in-95 duration-150">
                        <span className="text-[8px] font-black tracking-[0.2em] text-emerald-400 uppercase block">Initializing Grid</span>
                        <h2 className="text-4xl font-black text-white font-mono">{countdown}</h2>
                    </div>
                )}

                {countdown === null && (!isGameStarted || isGameOver) && (
                    <div className="absolute inset-x-2 max-w-xs mx-auto bg-neutral-900/95 border border-neutral-800 backdrop-blur-sm rounded-xl p-4 shadow-2xl text-center space-y-2.5 animate-in fade-in duration-150">
                        {isGameOver ? (
                            <div className="space-y-2">
                                <h2 className="text-xs font-bold uppercase tracking-wide text-white">Execution Fault</h2>
                                <p className="text-[9px] text-neutral-400 ">Loop reset required: {score} pts.</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); triggerPreflightSequence(); }}
                                    className="w-full inline-flex h-8 items-center justify-center gap-1 bg-white text-neutral-950 rounded-lg text-[9px] font-bold uppercase transition-transform active:scale-95 cursor-pointer"
                                >
                                    <LuRotateCcw className="w-2.5 h-2.5" /> Restart [Enter]
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <h2 className="text-xs font-bold uppercase tracking-wide text-white">Diagnostic Active</h2>
                                <p className="text-[9px] text-neutral-500 leading-normal max-w-[180px] mx-auto">
                                    Press Center Select Key [Enter], Spacebar, or tap screen to start.
                                </p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); triggerPreflightSequence(); }}
                                    className="w-full inline-flex h-8 items-center justify-center gap-1 bg-white text-neutral-950 rounded-lg text-[9px] font-bold uppercase transition-transform active:scale-95 cursor-pointer"
                                >
                                    <LuPlay className="w-2.5 h-2.5 fill-current" /> Launch [Enter]
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <footer className="w-full max-w-4xl mx-auto flex justify-between items-center text-[7px] text-neutral-600 tracking-wider border-t border-neutral-900 pt-2 uppercase">
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5"><LuMonitor className="w-2 h-2" /> QVGA_READY</span>
                </div>
                <span>{myLocation} // {new Date().getFullYear()}</span>
            </footer>
        </div>
    );
}