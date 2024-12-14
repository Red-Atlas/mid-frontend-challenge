import { useWindowSize } from "@uidotdev/usehooks";

export function useIsMobile() {
  const { width } = useWindowSize();

  const isMobile = width !== null && width < 768;
  const isTable = width !== null && width >= 768 && width < 1024;

  return {
    isMobile,
    isTable,
  };
}
