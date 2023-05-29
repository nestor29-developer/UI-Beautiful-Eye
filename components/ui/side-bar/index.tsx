import {
  useCalculateForwardedFree,
  useProductsBuyCarSidebar,
  useQuickAddition,
  useShouldUpdateCarIems,
} from "@/lib/store";
import {
  getLocalStorage,
  getTotalCarPurchaseProducts,
  setLocalStorage,
} from "components/common/utils";
import { useEffect, useMemo, useState } from "react";
import { fallDown as Menu } from "react-burger-menu";
import { useCookies } from "react-cookie";
import { Button } from "../button";
import "./styles.css";

export const SideBar = ({
  openSideBar,
  setOpenSideBar,
}: {
  openSideBar: boolean;
  setOpenSideBar: any;
}) => {
  const quickAddition = useQuickAddition((state: any) => state.quickAddition);
  const setQuickAddition = useQuickAddition(
    (state: any) => state.setQuickAddition
  );
  const products = useProductsBuyCarSidebar(
    (state: any) => state.productsBuyCarSidebar
  );
  const setProduts = useProductsBuyCarSidebar(
    (state: any) => state.setProductsBuyCarSidebar
  );
  const [cookies, setCookie, removeCookie] = useCookies([
    "productsPurchaseCar",
  ]);
  const [amountToGetForwardedFree, setaAmountToGetForwardedFree] =
    useState<number>(0);
  const calculateForwardedFree = useCalculateForwardedFree(
    (state: any) => state.calculateForwardedFree
  );
  const setCalculateForwardedFree = useCalculateForwardedFree(
    (state: any) => state.setCalculateForwardedFree
  );
  const minAmountForwardedFree = 35000;
  const [stillLeftAmountToForwardFree, setStillLeftAmountToForwardFree] =
    useState<boolean>(true);
  const [pctCurrentAmountForwardFree, setPctCurrentAmountForwardFree] =
    useState<number>(0);
  const [productsCarPurchase, setProductsCarPurchase] = useState<any>(0);
  const [shouldUpdateCarItems, setShouldUpdateCarItems] =
    useState<boolean>(false);
  const setShouldUpdateCarProducts = useShouldUpdateCarIems(
    (state: any) => state.setShouldUpdateCarItems
  );

  const handleClose = () => {
    setOpenSideBar(!openSideBar);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const getCalculationForwardedFree = (products: any[]) => {
    let sum = 0;
    products.forEach((element: any) => {
      if (element?.currentPrice) {
        sum += element.currentPrice;
      }
    });
    const rest = minAmountForwardedFree - sum;
    setaAmountToGetForwardedFree(rest);
    debugger;
    if (rest > 0) {
      const total = (sum / minAmountForwardedFree) * 100;
      setPctCurrentAmountForwardFree(total);
    } else {
      setStillLeftAmountToForwardFree(false);
      setPctCurrentAmountForwardFree(100);
    }
  };

  useMemo(() => {
    if (products && products.length > 0) {
      let items = getTotalCarPurchaseProducts(products);
      setProductsCarPurchase(items);
      if (shouldUpdateCarItems) {
        setCookie("productsPurchaseCar", products);
        setShouldUpdateCarItems(false);
        setShouldUpdateCarProducts(true);
      }
    }
  }, [products, shouldUpdateCarItems]);

  useMemo(() => {
    if (quickAddition) {
      const isClickEvent = getLocalStorage("clickQuickAdd");
      if (isClickEvent) {
        setQuickAddition(null);
        const product = [];
        const data = products.find((e: any) => e.title === quickAddition.title);
        if (!data) {
          const productPayload = {
            ...quickAddition,
            amount: 1,
          };
          product.push(productPayload);
        } else {
          data.amount = data?.amount + 1;
        }
        const totalProducts = products.concat(product);
        setProduts(totalProducts);
        setCookie("productsPurchaseCar", totalProducts);
        getCalculationForwardedFree(totalProducts);
        setLocalStorage("clickQuickAdd", false);
      }
    }
  }, [quickAddition]);

  useMemo(() => {
    if (calculateForwardedFree) {
      debugger;
      getCalculationForwardedFree(products);
      setCalculateForwardedFree(false);
    }
  }, [calculateForwardedFree]);

  const Product = ({ product }: { product: any }) => {
    const [inputValue, setInputValue] = useState<any>(product?.amount ?? 1);
    const handleInputValue = (event: any) => {
      let value = event.target.value;
      const re = /^[0-9\b]+$/;
      if (value === "" || re.test(value)) {
        if (value == 0 && value !== "") {
          setInputValue(1);
        } else setInputValue(value);
        if (value !== "" && Number(value)) {
          const data = products.find((e: any) => e.title === product.title);
          data.amount = Number(value);
          setProduts(products);
          setShouldUpdateCarItems(true);
        }
      }
    };
    const price = product.currentPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    const handleRemoveProduct = (product: any) => {
      const data = products.filter((e: any) => e.title !== product.title);
      setProduts(data);
      setCookie("productsPurchaseCar", data);
    };

    return (
      <div key={product.title} className="flex justify-between items-center">
        <div className="flex">
          <img
            className="w-[102px] h-[102px] rounded-md"
            src={`/img/contact-lenses-people/${product.imageName}`}
            alt={`${product.imageName}`}
          />
          <div className="flex flex-col gap-1 ml-10">
            <span className="capitalize font-bold text-base">
              {product.title}
            </span>
            <span className="text-[#353535bf]">{price}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <input
            style={{ border: "1px solid #DAE0E9" }}
            className="w-12 h-10 text-xs outline-none rounded-md text-center focus:ring-0"
            type="text"
            autoComplete="off"
            value={inputValue}
            onChange={handleInputValue}
          />
          <span
            className="text-xs text-[#353535bf] underline cursor-pointer"
            onClick={() => handleRemoveProduct(product)}
          >
            Quitar
          </span>
        </div>
      </div>
    );
  };

  const Products = ({ products }: { products: any[] }) => {
    return (
      <div className="flex flex-col gap-5">
        {products.map((product) => {
          return <Product product={product} />;
        })}
      </div>
    );
  };

  const BottomSection = () => {
    return <div className="">oa</div>;
  };

  useMemo(() => {
    if (products && products.length > 0) {
      let items = getTotalCarPurchaseProducts(products);
      setProductsCarPurchase(items);
    }
  }, [products]);

  return (
    <div className="font-montserrat-regular">
      <Menu
        onClose={handleClose}
        right
        width={680}
        isOpen={openSideBar}
        className="bg-white shadow-2xl mt-6 SideBar--container mr-4 rounded-md p-4"
      >
        <div className="cursor-pointer Cross-alignment" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
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

        {productsCarPurchase > 0 ? (
          <div className="w-full">
            <div className="divide-y-[1px]">
              <div className="flex flex-col mx-6">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-[22px]">CARRITO</span>
                  <div className="flex justify-center bg-[#364152] rounded-full w-[25px] h-[25px]">
                    <h2 className="text-sm mt-0.5">
                      <span className="text-center whitespace-nowrap align-baseline text-white font-semibold">
                        {productsCarPurchase}
                      </span>
                    </h2>
                  </div>
                </div>

                {stillLeftAmountToForwardFree ? (
                  <span className="text-base mt-3 mb-2 text-[#364152]">
                    ¡Si Gastas{" "}
                    <b className="text-xl text-[#5f2698] font-bold">
                      ${amountToGetForwardedFree}{" "}
                    </b>
                    más, conseguirás envío gratis!
                  </span>
                ) : (
                  <div>
                    <span className="text-base mt-3 mb-2 text-[#364152]">
                      Tu pedido cumple los requisitos de envío gratis.
                    </span>
                  </div>
                )}

                <div className="w-full bg-gray-200 rounded-full h-1 mb-8">
                  <div
                    className="bg-[#5f2698] h-1 rounded-full"
                    style={{ width: `${pctCurrentAmountForwardFree}%` }}
                  ></div>
                </div>

                <Products products={products} />
              </div>
              <div className="mt-10">
                <BottomSection />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-52">
            <div className="flex justify-center relative">
              <svg
                role="presentation"
                stroke-width="1"
                focusable="false"
                width="48"
                height="48"
                className="icon icon-cart"
                viewBox="0 0 22 22"
              >
                <path
                  d="M11 7H3.577A2 2 0 0 0 1.64 9.497l2.051 8A2 2 0 0 0 5.63 19H16.37a2 2 0 0 0 1.937-1.503l2.052-8A2 2 0 0 0 18.422 7H11Zm0 0V1"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>

              <div className="rounded-full bg-black h-[26px] w-[26px] -mt-3 -ml-4">
                <span className="text-white font-bold text-sm">0</span>
              </div>
            </div>

            <p className="text-2xl mt-10">EL CARRITO ESTÁ VACIO</p>

            <div className="flex justify-center mt-9">
              <Button
                type="primary"
                className=" w-[220px] h-[60px] flex justify-center items-center"
                description="Seguir Comprando"
                textClassName="text-base text-white font-bold"
                animated={false}
              />
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
};
