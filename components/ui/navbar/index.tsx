import { motion } from "framer-motion";
import "./style.css";

export const Navbar = ({
  setIsOpenBarDiscount,
}: {
  setIsOpenBarDiscount: any;
}) => {
  // const PromotionNavbar = () => {
  //   return (
  //     <>
  //       <nav className="relative bg-[#ffefd5] flex w-full flex-wrap items-center justify-between py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700">
  //         <div className="flex w-full flex-wrap items-center justify-center px-6">
  //           <div className="flex items-center">
  //             <div className="mr-3">
  //               <motion.div
  //                 animate={{ x: 6 }}
  //                 transition={{ repeat: Infinity, duration: 1 }}
  //               >
  //                 📣
  //               </motion.div>
  //             </div>
  //             <p className="text-lg text-neutral-800 mr-6">
  //               Volvió El Kit Completo! 🔥 Lentes + Liquido Desifectante Gratis
  //               + Envio Gratis 🔥
  //             </p>
  //             <div className="flex flex-col">
  //               <div className="bg-[#fff] w-[32px] h-[30px] rounded-lg">
  //                 <div className="flex justify-center text-lg outline-none text-[#364152]">
  //                   01
  //                 </div>
  //               </div>
  //               <p className="text-[10px] text-center text-[#364152] mt-0.5">
  //                 DÍA
  //               </p>
  //             </div>
  //             <p className="text-[#364152] -mt-[18px] ml-2 mr-2"> : </p>
  //             <div className="flex flex-col">
  //               <div className="bg-[#fff] w-[32px] h-[30px] rounded-lg">
  //                 <div className="flex justify-center text-lg outline-none text-[#364152]">
  //                   23
  //                 </div>
  //               </div>
  //               <p className="text-[10px] text-center text-[#364152] mt-0.5">
  //                 HRS
  //               </p>
  //             </div>
  //             <p className="text-[#364152] -mt-[18px] ml-2 mr-2"> : </p>
  //             <div className="flex flex-col">
  //               <div className="bg-[#fff] w-[32px] h-[30px] rounded-lg">
  //                 <div className="flex justify-center text-lg outline-none text-[#364152]">
  //                   39
  //                 </div>
  //               </div>
  //               <p className="text-[10px] text-center text-[#364152] mt-0.5">
  //                 MINS
  //               </p>
  //             </div>
  //             <p className="text-[#364152] -mt-[18px] ml-2 mr-2"> : </p>
  //             <div className="flex flex-col">
  //               <div className="bg-[#fff] w-[32px] h-[30px] rounded-lg">
  //                 <div className="flex justify-center text-lg outline-none text-[#364152]">
  //                   22
  //                 </div>
  //               </div>
  //               <p className="text-[10px] text-center text-[#364152] mt-0.5">
  //                 SECS
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </nav>
  //     </>
  //   );
  // };

  const NavbarDiscount = () => {
    return (
      <>
        <nav className="relative bg-gray-800 flex w-full flex-wrap items-center py-2">
          <div className="flex flex-1 items-center">
            <div className="flex w-full flex-wrap items-center justify-center px-6">
              <div className="mr-6">
                <motion.div
                  animate={{ x: 16 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  📣
                </motion.div>
              </div>
              <p className="text-sm text-white mr-6 font-lalia-bold Text__detail Text__detail--moving">
                Ahorra 10% en tu primera compra 🔥
              </p>
            </div>
            {/* <div className="flex justify-end flex-1 mr-8">
              <div
                className="cursor-pointer text-white font-bold"
                onClick={() => setIsOpenBarDiscount(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div> */}
          </div>
        </nav>
      </>
    );
  };

  return <NavbarDiscount />;
};
