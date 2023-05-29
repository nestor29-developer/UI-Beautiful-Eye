import { Product } from "components/common/models/product";
import { Button } from "components/ui/button";
import { useState } from "react";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { useQuickAddition } from "@/lib/store";
import { setLocalStorage } from "components/common/utils";

const Item = ({
  product,
  handleClick,
}: {
  product: Product;
  handleClick: any;
}) => {
  const [showQuickButton, setShowQuickButton] = useState<boolean>(false);

  const handleMouseHover = () => {
    setShowQuickButton(!showQuickButton);
  };

  return (
    <article
      className="relative"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <div className="aspect-square overflow-hidden rounded-[10px] h-auto">
        <img
          className="transition duration-300 ease-in-out hover:scale-[1.7]"
          src={`/img/contact-lenses-people/${product.imageName}`}
          alt={`${product.imageName}`}
        />
      </div>

      <div className="absolute top-1 -ml-16 rounded-full bg-white">
        <p className="text-xs rounded-md bg-black p-1 font-bold tracking-wide text-white sm:px-3 sm:py-1">
          {product.info}
        </p>
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div className="">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            <span title="" className=" capitalize">
              {product.title}
              <span className="absolute" aria-hidden="true"></span>
            </span>
          </h3>
          <div className="mt-2 flex items-center">
            <svg
              className={`${
                product.stars >= 1 ? "text-black" : "text-gray-400"
              } block h-3 w-3 align-middle sm:h-4 sm:w-4`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
            <svg
              className={`${
                product.stars >= 2 ? "text-black" : "text-gray-400"
              } block h-3 w-3 align-middle sm:h-4 sm:w-4`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
            <svg
              className={`${
                product.stars >= 3 ? "text-black" : "text-gray-400"
              } block h-3 w-3 align-middle sm:h-4 sm:w-4`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
            <svg
              className={`${
                product.stars >= 4 ? "text-black" : "text-gray-400"
              } block h-3 w-3 align-middle sm:h-4 sm:w-4`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
            <svg
              className={`${
                product.stars >= 5 ? "text-black" : "text-gray-400"
              } block h-3 w-3 align-middle sm:h-4 sm:w-4`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                className=""
              ></path>
            </svg>
          </div>
        </div>

        <div className="text-right">
          <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm">
            {" "}
            $
            {product.oldPrice
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
          </del>
          <p className="text-xs font-normal sm:text-sm md:text-base">
            $
            {product.currentPrice
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </p>
        </div>
      </div>

      {showQuickButton && (
        <div className="mt-4 flex justify-center mx-2.5">
          <Button
            type="group-primary"
            className="w-full h-[40px] flex justify-center items-center font-montserrat-regular"
            textClassName="text-[14px]"
            description="Adición Rápida"
            animated={false}
            iconPosition="left"
            Icon={PlusSmallIcon}
            handleClick={handleClick}
          />
        </div>
      )}
    </article>
  );
};

export const ProductList = ({ productList }: { productList: Product[] }) => {
  const setQuickAddition = useQuickAddition(
    (state: any) => state.setQuickAddition
  );

  const handleClick = (product: any) => {
    setLocalStorage('clickQuickAdd', true);
    setQuickAddition(product);
  };

  return (
    <section className="bg-white text-gray-700 cursor-pointer font-montserrat-regular">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-8 xl:gap-[84px]">
          {productList &&
            productList.length > 0 &&
            productList.map((product: Product) => {
              return (
                <Item
                  key={product.title}
                  product={product}
                  handleClick={() => handleClick(product)}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};
