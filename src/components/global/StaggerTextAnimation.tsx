"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const StaggerTextAnimation = ({
  text,
  delay,
  textSize,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
      className={cn("inline-block whitespace-pre-wrap ", className)}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className={cn(
            "inline-block text-foreground",
            textSize && `text-${textSize}`
          )}
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
              filter: "blur(10px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          {word + " "}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggerTextAnimation;
