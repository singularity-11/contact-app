
import { SxProps, Theme } from "@mui/material/styles";

export function arrayify<T>(item?: T | T[] | null | undefined) {
  if (Array.isArray(item)) {
    return item;
  }

  if (item) {
    return [item];
  }

  return [];
}

export function mergeSx(...sx: (SxProps<Theme> | null | undefined)[]) {
  return sx
    .map((style) => [...arrayify<SxProps<Theme>>(style)])
    .flat() as SxProps<Theme>;
}
