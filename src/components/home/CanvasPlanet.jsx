import React, { useEffect, useState } from "react";

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
      const maxDim = 256;
      let w = img.naturalWidth || img.width || 300;
      let h = img.naturalHeight || img.height || 300;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);

      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxVal = Math.max(r, g, b);

          if (maxVal < threshold) {
            data[i + 3] = 0; // 100% Transparent
          } else if (maxVal < 60) {
            const alphaFactor = (maxVal - threshold) / (60 - threshold);
            data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setDataUrl(canvas.toDataURL("image/png"));
      } catch (e) {
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

  return (
    <img
      src={dataUrl || src}
      alt={alt}
      className={`${className} pointer-events-none select-none`}
      style={{ mixBlendMode: "screen" }}
      draggable={false}
    />
  );
}
