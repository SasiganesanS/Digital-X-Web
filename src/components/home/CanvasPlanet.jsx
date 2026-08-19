import React, { useEffect, useRef, useState } from "react";

export default function CanvasPlanet({
  src,
  alt,
  className = "",
  threshold = 18,
}) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.naturalWidth || img.width || 500;
      canvas.height = img.naturalHeight || img.height || 500;

      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxVal = Math.max(r, g, b);

          if (maxVal < threshold) {
            data[i + 3] = 0; // 100% Transparent
          } else if (maxVal < 60) {
            // Smooth alpha transparency gradient at edges
            const alphaFactor = (maxVal - threshold) / (60 - threshold);
            data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setDataUrl(canvas.toDataURL("image/png"));
      } catch (e) {
        // Fallback to original image if canvas security throws
        setDataUrl(src);
      }
    };

    img.onerror = () => {
      if (isMounted) setDataUrl(src);
    };

    return () => {
      isMounted = false;
    };
  }, [src, threshold]);

  if (!dataUrl) {
    return <div className={className} />;
  }

  return (
    <img
      src={dataUrl}
      alt={alt}
      className={`${className} pointer-events-none select-none`}
      draggable={false}
    />
  );
}
