
import React, { useEffect, useState } from 'react';

const RealLightOverlay = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Fastrack/Sporty Shape Dimensions
    const lensWidth = 200; // Increased width
    const lensHeight = 140; // Increased height
    const bridgeWidth = 20;

    // Custom Path Data for a sporty shape: Flat top, curved bottom-outer, slightly angled inner
    const getLensPath = (x: number, y: number, width: number, height: number, isRight: boolean) => {
        // SVG Path for a sporty "D" shape or wrap-around style
        if (!isRight) {
            // Left Lens
            return `M ${x} ${y} 
                     L ${x + width - 10} ${y} 
                     Q ${x + width} ${y} ${x + width} ${y + 20} 
                     L ${x + width - 5} ${y + height - 30} 
                     Q ${x + width - 10} ${y + height} ${x + width - 40} ${y + height} 
                     L ${x + 20} ${y + height} 
                     Q ${x} ${y + height} ${x} ${y + height - 20} 
                     L ${x} ${y + 20} 
                     Q ${x} ${y} ${x + 20} ${y} Z`;
        } else {
            // Right Lens (Mirrored logic)
            return `M ${x} ${y} 
                    L ${x + width - 20} ${y} 
                    Q ${x + width} ${y} ${x + width} ${y + 20} 
                    L ${x + width} ${y + height - 20} 
                    Q ${x + width} ${y + height} ${x + width - 20} ${y + height} 
                    L ${x + 40} ${y + height} 
                    Q ${x + 10} ${y + height} ${x + 5} ${y + height - 30} 
                    L ${x} ${y + 20} 
                    Q ${x} ${y} ${x + 10} ${y} Z`;
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'none',
            mixBlendMode: 'normal'
        }}>
            <svg width="100%" height="100%">
                <defs>
                    <mask id="sunglasses-mask">
                        {/* White Rect = Visible Overlay (The blinding light) */}
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />

                        {/* Black Shapes = Transparent Holes (The lenses) */}
                        {/* Left Lens */}
                        <path d={getLensPath(mousePosition.x - lensWidth - (bridgeWidth / 2), mousePosition.y - (lensHeight / 2), lensWidth, lensHeight, false)} fill="black" />

                        {/* Right Lens */}
                        <path d={getLensPath(mousePosition.x + (bridgeWidth / 2), mousePosition.y - (lensHeight / 2), lensWidth, lensHeight, true)} fill="black" />

                        {/* Bridge */}
                        <rect
                            x={mousePosition.x - (bridgeWidth / 2) - 5}
                            y={mousePosition.y - (lensHeight / 2) + 10}
                            width={bridgeWidth + 10}
                            height={8}
                            fill="black"
                        />
                    </mask>
                </defs>

                {/* The Overlay Rect using the Mask */}
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="white"
                    mask="url(#sunglasses-mask)"
                />
            </svg>
        </div>
    );
};

export default RealLightOverlay;
