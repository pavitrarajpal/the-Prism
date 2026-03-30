import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './ScrollSequence.module.css';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 233;
const currentFrame = index => (
    `/art-sequence/frame_${index.toString().padStart(3, '0')}_delay-0.033s.jpg`
);

const ScrollSequence = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);

    // Preload all images properly
    useEffect(() => {
        const loadedImages = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            loadedImages.push(img);

            img.onload = () => {
                loadedCount++;
                // Intentionally draw the first frame once loaded
                if (i === 0 && canvasRef.current) {
                    const canvas = canvasRef.current;
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    const context = canvas.getContext('2d');

                    const hRatio = canvas.width / img.width;
                    const vRatio = canvas.height / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvas.width - img.width * ratio) / 2;
                    const centerShift_y = (canvas.height - img.height * ratio) / 2;

                    context.drawImage(img, 0, 0, img.width, img.height,
                        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                }
            };
        }
        setImages(loadedImages);
    }, []);

    useGSAP(() => {
        // Only set up standard GSAP when images have finished populating
        if (images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        const render = (obj) => {
            const frameIndex = Math.min(Math.max(Math.floor(obj.frame), 0), frameCount - 1);
            if (images[frameIndex]) {
                context.clearRect(0, 0, canvas.width, canvas.height);

                const img = images[frameIndex];
                // Calculate crop to cover screen
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        };

        const obj = { frame: 0 };

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=3500', // Scroll length
            scrub: 0.5,
            pin: true,
            animation: gsap.to(obj, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none',
                onUpdate: () => render(obj)
            })
        });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(obj);
        };

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, { dependencies: [images], scope: containerRef });

    return (
        <div ref={containerRef} className={styles.scrollContainer}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {/* Overlay Focus Text */}
            <div className={styles.overlayContent}>
                <h2 className={styles.title}>The Art of Matcha</h2>
                <p className={styles.subtitle}>Discover the rich, vibrant narrative behind our premium ceremonial selections.</p>
            </div>
        </div>
    );
};

export default ScrollSequence;
