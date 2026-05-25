"use client";

import dynamic from "next/dynamic";

export const BackgroundScene = dynamic(
  () => import("./BackgroundScene.impl").then((m) => m.BackgroundScene),
  { ssr: false, loading: () => null }
);
