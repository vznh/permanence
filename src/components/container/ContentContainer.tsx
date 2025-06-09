// components/container/SurroundingContainer
import { motion } from "framer-motion";
import { ReactNode } from "react";


const ContentContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div
    className=""
  >
    {children}
  </div>
}

export default ContentContainer;
