import Map from "@/components/MapWrapper/MapWrapper";
import { Outlet } from "react-router-dom";

export default function MapLayout() {
  return (
    <>
      <span className="fixed top-0 left-0 w-full h-full -z-10">
        <Map />
      </span>
      <Outlet />
    </>
  );
}
