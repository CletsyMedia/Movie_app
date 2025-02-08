import { IoIosHome } from "react-icons/io";
import { IoTvOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";

// Type for navLink
export interface NavLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
}

export const navLinks: NavLink[] = [
  { label: "Home", path: "/", icon: IoIosHome },
  { label: "TV", path: "/tv", icon: IoTvOutline },
  { label: "Movies", path: "/movies", icon: BiMoviePlay },
];
