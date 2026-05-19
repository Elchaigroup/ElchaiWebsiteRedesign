import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name composer — clsx + tailwind-merge.
 * Used across every component to merge conditional classes
 * without leaving conflicting Tailwind utilities behind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
