import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Facebook, Twitter, Search, Globe, CheckCircle } from 'lucide-react';

const steps = [
    { icon: Globe, text: "Initializing Search...", color: "text-blue-400" },
    { icon: Linkedin, text: "Scanning LinkedIn profiles...", color: "text-blue-600" },
    { icon: Facebook, text: "Checking Facebook activity...", color: "text-blue-500" },
    { icon: Twitter, text: "Analyzing X (Twitter) feeds...", color: "text-sky-500" },
    { icon: Search, text: "Aggregating results...", color: "text-purple-500" },
];

const LoadingOverlay = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 800); // Change step every 800ms

        return () => clearInterval(timer);
    }, []);

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
                {/* Outer Ring */}
                <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        key={currentStep}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-full bg-secondary/50 backdrop-blur-sm ${steps[currentStep].color}`}
                    >
                        <CurrentIcon className="w-8 h-8" />
                    </motion.div>
                </div>
            </div>

            <div className="space-y-4 w-full max-w-xs">
                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    const isPending = index > currentStep;

                    return (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 flex justify-center">
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : isActive ? (
                                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                ) : (
                                    <div className="w-2 h-2 bg-muted rounded-full" />
                                )}
                            </div>
                            <span
                                className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-foreground' : isCompleted ? 'text-muted-foreground line-through opacity-50' : 'text-muted-foreground/30'
                                    }`}
                            >
                                {step.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LoadingOverlay;
