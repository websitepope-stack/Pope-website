"use client"

import Image from "next/image";
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { cn } from "@/lib/utils"

function getImageSrc(src) {
  if (typeof src === "string") return src
  if (src && "default" in src) return src.default.src
  return src?.src || src
}

export function ImageZoom({
  zoomInProps,
  zoomProps,
  className,
  children,
  ...props
}) {
  return (
    <Zoom
      classDialog={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
      classOverlay={cn(
        "absolute inset-0 transition-colors bg-transparent",
        "cursor-zoom-out" 
      )}
      closeText="Close" 
      zoomMargin={20}
      wrapElement={props.fill ? "div" : "span"}
      wrapStyle={props.fill ? { position: "relative", width: "100%", height: "100%", display: "block" } : undefined}
      {...zoomProps}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        className: cn(
          "image-rendering-high-quality cursor-zoom-out", 
          zoomInProps?.className
        ),
        ...zoomInProps,
      }}
    >
      {children ?? (
        <Image
          className={cn(
            "cursor-zoom-in rounded-md transition-all",
            className
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          {...props}
        />
      )}
    </Zoom>
  )
}
