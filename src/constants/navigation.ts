import { IoIosHome } from "react-icons/io";
import { IoTvOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";

export interface NavLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
}

export const navLinks: NavLink[] = [
  { label: "Home", path: "/", icon: IoIosHome },
  { label: "TV", path: "/tv", icon: IoTvOutline },
  { label: "Movie", path: "/movie", icon: BiMoviePlay },
];
