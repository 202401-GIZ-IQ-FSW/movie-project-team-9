// app/icon.tsx
import { ImageResponse } from "next/og";
import React from "react";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Team9
      </div>
    ),
    // <img src="/favicon.png" width="24" height="24"/>
    {
      // Re-use the exported icon size metadata to set ImageResponse's width and height
      ...size,
    }
  );
}
