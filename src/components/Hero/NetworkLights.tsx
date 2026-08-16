import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type SourceLight = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  nudgeX?: number;
  nudgeY?: number;
};

type RenderedLight = SourceLight & {
  screenX: number;
  screenY: number;
};

type LightStyle = CSSProperties & {
  "--delay": string;
  "--duration": string;
  "--size": string;
  "--glow": string;
  "--halo-inset": string;
};

type StarLight = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

type StarStyle = CSSProperties & {
  "--star-delay": string;
  "--star-duration": string;
  "--star-size": string;
  "--star-opacity": number;
};

const IMAGE_WIDTH = 1665;
const IMAGE_HEIGHT = 944;

// x/y use the original network-bg.png coordinate space: 1665 x 944.
const LIGHTS: SourceLight[] = [
  { x: 40, y: 339, size: 5, duration: 4.4, delay: -0.7 },
  { x: 228, y: 190, size: 4, duration: 3.8, delay: -2.1 },
  { x: 337, y: 358, size: 4, duration: 4.9, delay: -1.4 },
  { x: 487, y: 248, size: 6, duration: 3.6, delay: -0.2 },
  { x: 301, y: 506, size: 7, duration: 5, delay: -3.3 },
  { x: 963, y: 110, size: 5, duration: 4.6, delay: -1.9 },
  { x: 1185, y: 260, size: 4, duration: 3.4, delay: -0.9 },
  { x: 1244, y: 312, size: 7, duration: 4.1, delay: -2.8 },
  { x: 1332, y: 402, size: 5, duration: 5.2, delay: -1.1 },
  { x: 1153, y: 480, size: 4, duration: 3.7, delay: -2.5 },
  { x: 1300, y: 595, size: 5, duration: 4.8, delay: -3.7 },
  { x: 1077, y: 760, size: 5, duration: 4.2, delay: -1.6 },
];

const STARS: StarLight[] = [
  { left: 8, top: 5, size: 1.5, duration: 3.2, delay: -0.4, opacity: 0.48 },
  { left: 12, top: 18, size: 1, duration: 4.7, delay: -2.8, opacity: 0.34 },
  { left: 23, top: 14, size: 1.2, duration: 4.1, delay: -1.8, opacity: 0.42 },
  { left: 28, top: 4, size: 1, duration: 3.9, delay: -1.1, opacity: 0.32 },
  { left: 39, top: 8, size: 1.4, duration: 3.6, delay: -2.3, opacity: 0.5 },
  { left: 44, top: 19, size: 1.1, duration: 4.3, delay: -3.6, opacity: 0.36 },
  { left: 54, top: 2, size: 1.1, duration: 4.8, delay: -0.9, opacity: 0.38 },
  { left: 58, top: 11, size: 1, duration: 3.5, delay: -2.2, opacity: 0.34 },
  { left: 63, top: 16, size: 1.6, duration: 3.9, delay: -2.9, opacity: 0.52 },
  { left: 67, top: 5, size: 1.1, duration: 5.1, delay: -4.1, opacity: 0.36 },
  { left: 74, top: 8, size: 1.3, duration: 4.4, delay: -1.2, opacity: 0.44 },
  { left: 79, top: 20, size: 1, duration: 3.7, delay: -0.6, opacity: 0.32 },
  { left: 88, top: 12, size: 1.5, duration: 3.4, delay: -2.5, opacity: 0.5 },
  { left: 95, top: 6, size: 1, duration: 4.9, delay: -1.7, opacity: 0.35 },
  { left: 18, top: 30, size: 1.3, duration: 4.6, delay: -3.1, opacity: 0.4 },
  { left: 25, top: 35, size: 1, duration: 3.3, delay: -2.6, opacity: 0.34 },
  { left: 34, top: 25, size: 1.1, duration: 3.7, delay: -0.7, opacity: 0.36 },
  { left: 41, top: 34, size: 1.2, duration: 4.5, delay: -1.9, opacity: 0.38 },
  { left: 51, top: 32, size: 1.4, duration: 5, delay: -2.1, opacity: 0.44 },
  { left: 57, top: 28, size: 1, duration: 3.8, delay: -3.2, opacity: 0.32 },
  { left: 69, top: 27, size: 1.2, duration: 4.2, delay: -1.5, opacity: 0.4 },
  { left: 76, top: 32, size: 1.1, duration: 4.6, delay: -0.3, opacity: 0.36 },
  { left: 91, top: 34, size: 1.3, duration: 3.8, delay: -3.4, opacity: 0.42 },
  { left: 6, top: 46, size: 1.2, duration: 4.1, delay: -2.4, opacity: 0.38 },
  { left: 14, top: 50, size: 1, duration: 3.6, delay: -1.3, opacity: 0.34 },
  { left: 22, top: 48, size: 1.1, duration: 4.8, delay: -4.2, opacity: 0.36 },
  { left: 36, top: 53, size: 1, duration: 3.4, delay: -0.8, opacity: 0.32 },
  { left: 47, top: 51, size: 1.2, duration: 4.3, delay: -2.7, opacity: 0.36 },
  { left: 61, top: 49, size: 1, duration: 5.2, delay: -3.5, opacity: 0.34 },
  { left: 72, top: 46, size: 1.1, duration: 3.9, delay: -1.6, opacity: 0.38 },
  { left: 84, top: 50, size: 1, duration: 4.7, delay: -2.9, opacity: 0.34 },
  { left: 96, top: 48, size: 1.2, duration: 3.5, delay: -0.5, opacity: 0.36 },
];

const WHITE_STARS: StarLight[] = [
  { left: 13, top: 8, size: 1.8, duration: 2.8, delay: -0.3, opacity: 0.72 },
  { left: 17, top: 14, size: 1.4, duration: 3.6, delay: -1.7, opacity: 0.58 },
  { left: 26, top: 9, size: 1.6, duration: 3.1, delay: -2.4, opacity: 0.68 },
  { left: 35, top: 20, size: 1.5, duration: 4.2, delay: -0.9, opacity: 0.6 },
  { left: 41, top: 13, size: 1.9, duration: 3.4, delay: -2.9, opacity: 0.74 },
  { left: 49, top: 23, size: 1.3, duration: 3.8, delay: -1.4, opacity: 0.56 },
  { left: 58, top: 15, size: 1.7, duration: 2.9, delay: -2.1, opacity: 0.68 },
  { left: 63, top: 6, size: 1.4, duration: 4.5, delay: -3.5, opacity: 0.54 },
  { left: 70, top: 26, size: 1.8, duration: 3.2, delay: -0.6, opacity: 0.72 },
  { left: 77, top: 18, size: 1.5, duration: 3.9, delay: -2.6, opacity: 0.6 },
  { left: 86, top: 9, size: 1.6, duration: 3.3, delay: -1.2, opacity: 0.66 },
  { left: 94, top: 22, size: 1.4, duration: 4.1, delay: -3.1, opacity: 0.58 },
  { left: 15, top: 38, size: 1.7, duration: 3.7, delay: -2.2, opacity: 0.68 },
  { left: 28, top: 31, size: 1.3, duration: 4.4, delay: -0.8, opacity: 0.54 },
  { left: 43, top: 39, size: 1.6, duration: 3.5, delay: -2.7, opacity: 0.62 },
  { left: 56, top: 34, size: 1.5, duration: 2.7, delay: -1.5, opacity: 0.66 },
  { left: 68, top: 41, size: 1.9, duration: 3.3, delay: -0.2, opacity: 0.72 },
  { left: 82, top: 37, size: 1.4, duration: 4, delay: -2.8, opacity: 0.56 },
  { left: 91, top: 44, size: 1.7, duration: 3.6, delay: -1.9, opacity: 0.64 },
];

function getRenderedLights(container: HTMLElement): RenderedLight[] {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const scale = Math.max(
    containerWidth / IMAGE_WIDTH,
    containerHeight / IMAGE_HEIGHT,
  );
  const renderedWidth = IMAGE_WIDTH * scale;
  const renderedHeight = IMAGE_HEIGHT * scale;
  const offsetX = (containerWidth - renderedWidth) / 2;
  const offsetY = (containerHeight - renderedHeight) / 2;

  return LIGHTS.map((light) => ({
    ...light,
    screenX: offsetX + light.x * scale + (light.nudgeX ?? 0),
    screenY: offsetY + light.y * scale + (light.nudgeY ?? 0),
  }));
}

export function NetworkLights() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [lights, setLights] = useState<RenderedLight[]>([]);

  useEffect(() => {
    const container = layerRef.current?.parentElement;

    if (!container) return;

    const updateLights = () => {
      setLights(getRenderedLights(container));
    };

    updateLights();

    const resizeObserver = new ResizeObserver(updateLights);
    resizeObserver.observe(container);

    window.addEventListener("resize", updateLights);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLights);
    };
  }, []);

  return (
    <div ref={layerRef} className="network-lights" aria-hidden="true">
      {lights.map((light) => {
        const style: LightStyle = {
          left: light.screenX,
          top: light.screenY,
          "--delay": `${light.delay}s`,
          "--duration": `${light.duration}s`,
          "--size": `${light.size}px`,
          "--glow": `${light.size * 5}px`,
          "--halo-inset": `${light.size * -2.8}px`,
        };

        return (
          <span
            key={`${light.x}-${light.y}`}
            className="network-light"
            style={style}
          />
        );
      })}

      {STARS.map((star) => {
        const style: StarStyle = {
          left: `${star.left}%`,
          top: `${star.top}%`,
          "--star-delay": `${star.delay}s`,
          "--star-duration": `${star.duration}s`,
          "--star-size": `${star.size}px`,
          "--star-opacity": star.opacity,
        };

        return (
          <span
            key={`${star.left}-${star.top}`}
            className="network-star"
            style={style}
          />
        );
      })}

      {WHITE_STARS.map((star) => {
        const style: StarStyle = {
          left: `${star.left}%`,
          top: `${star.top}%`,
          "--star-delay": `${star.delay}s`,
          "--star-duration": `${star.duration}s`,
          "--star-size": `${star.size}px`,
          "--star-opacity": star.opacity,
        };

        return (
          <span
            key={`white-${star.left}-${star.top}`}
            className="network-star network-star--white"
            style={style}
          />
        );
      })}
    </div>
  );
}
