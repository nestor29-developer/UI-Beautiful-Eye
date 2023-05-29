import { MouseEventHandler } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export const Button = ({
  description,
  className,
  type,
  handleClick,
  Icon,
  iconPosition,
  textClassName,
  animated,
}: {
  description: string;
  className?: string;
  type?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  Icon?: any;
  iconPosition?: string;
  textClassName?: string;
  animated: boolean;
}) => {
  // const Icon = () => {
  //   return (
  //     <motion.div
  //       animate={{ x: 6 }}
  //       transition={{ repeat: Infinity, duration: 1 }}
  //     >
  //       <ArrowSmallRightIcon
  //         className="ml-1 h-6 w-6 flex-shrink-0"
  //         aria-hidden="true"
  //       />
  //     </motion.div>
  //   );
  // };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          type === "primary"
            ? "bg-[#5f2698] hover:opacity-90"
            : type === "group-primary"
            ? "bg-[#fff] hover:bg-[#5f2698] text-[#5f2698] hover:text-[#fff] font-bold rounded-[4px] shadow-md shadow-gray-500 hover:shadow-gray-900"
            : ""
        } cursor-pointer ${className} transition-none`}
      >
        {animated ? (
          <motion.div
            whileHover={{ scale: 1.275 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center"
          >
            <span className={`${textClassName}`}>{description}</span>
            {iconPosition === "right" && (
              <Icon className="mr-1 h-6 w-6 flex-shrink-0" />
            )}
          </motion.div>
        ) : (
          <>
            {iconPosition === "left" && (
              <Icon className="mr-1 h-6 w-6 flex-shrink-0" />
            )}
            <span className={`${textClassName}`}>{description}</span>
            {iconPosition === "right" && (
              <Icon className="mr-1 h-6 w-6 flex-shrink-0" />
            )}
          </>
        )}
      </button>
    </>
  );
};
