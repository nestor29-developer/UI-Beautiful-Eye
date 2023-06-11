import {
  useCalculateForwardedFree,
  useProductsBuyCarSidebar,
  useQuickAddition,
  useShouldUpdateCarIems,
} from "@/lib/store";
import {
  getCurrencyFormat,
  getLocalStorage,
  getTotalCarPurchaseProducts,
  setLocalStorage,
} from "components/common/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { stack as Menu } from "react-burger-menu";
import { useCookies } from "react-cookie";
import { Button } from "../button";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import "./styles.css";
import { Skeleton } from "../skeleton";

const SearchProductsList = ({ products }: { products: any }) => {
  return (
    <>
      {products.map((product: any) => (
        <div className="flex flex-row gap-8">
          <div className="aspect-square overflow-hidden rounded-[10px] h-48">
            <img
              className="h-[192px] w-[214px] rounded-xl cursor-zoom-in transition duration-300 ease-in-out hover:scale-[1.7]"
              src={`/img/contact-lenses-people/${product.imageName}`}
              alt=""
            />
          </div>
          <div className="flex flex-col mt-8">
            <span className="text-[#364152] font-bold capitalize link link-underline link-underline-black link-underline__thin">
              {product.title}
            </span>
            <div className="flex gap-3">
              <span className="text-[#364152] font-semibold">
                {getCurrencyFormat(product.currentPrice, "en-US", "USD")}
              </span>
              <span className="line-through" style={{color: 'rgba(53, 53, 53, 0.7)'}}>
                {" "}
                {getCurrencyFormat(product.oldPrice, "en-US", "USD")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export const SideBar = ({
  openSideBar,
  setOpenSideBar,
  isSearchAction,
  productList,
}: {
  openSideBar: boolean;
  setOpenSideBar: any;
  isSearchAction: any;
  productList: any[];
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
  const [total, setTotal] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [showTrash, setShowTrash] = useState<boolean>(false);
  const searchRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productsSearched, setProductsSearched] = useState<any[]>([]);

  const handleClose = () => {
    setOpenSideBar(!openSideBar);
    document.body.style.overflow = "auto";
  };

  const getTotal = (products: any) => {
    let total = 0;
    products.forEach((element: any) => {
      if (element?.amount) {
        total += element?.amount * element.currentPrice;
      }
    });
    const formatNumber = getCurrencyFormat(total, "en-US", "USD");
    setTotal(formatNumber);
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
    const formatNumber = getCurrencyFormat(rest, "en-US", "USD");
    setaAmountToGetForwardedFree(formatNumber);
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
      getTotal(products);
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
        getTotal(products);
      }
    }
  }, [quickAddition]);

  useMemo(() => {
    if (calculateForwardedFree) {
      getCalculationForwardedFree(products);
      setCalculateForwardedFree(false);
      getTotal(products);
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
    const price = getCurrencyFormat(product.currentPrice, "en-US", "USD");

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
    return (
      <>
        <div className="flex justify-between p-9">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xl">TOTAL</span>
            <span className="underline text-[#353535bf] text-xs cursor-pointer">
              Agregar nota al pedido
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{total} CLP</span>
          </div>
        </div>

        <div className="flex justify-between mx-10 items-center">
          <div className="flex ml-16">
            <span className="font-bold text-base cursor-pointer link link-underline link-underline-black">
              Ver Carrito
            </span>
          </div>
          <div className="flex -mr-0">
            <Button
              iconPosition="left"
              type="primary"
              className=" w-[270px] h-[60px] flex justify-center items-center rounded-lg"
              description="Finalizar Compra"
              textClassName="text-base text-white font-bold"
              animated={false}
              Icon={LockClosedIcon}
              iconClass="text-white mr-2"
            />
          </div>
        </div>
      </>
    );
  };

  useMemo(() => {
    if (products && products.length > 0) {
      let items = getTotalCarPurchaseProducts(products);
      setProductsCarPurchase(items);
    }
  }, [products]);

  const searchProduct = (value: string) => {
    const rows: any[] = [];
    productList.forEach((element) => {
      if (element.title.includes(value.trim())) {
        rows.push(element);
      }
    });
    setProductsSearched(rows);
  };

  const handleChangeSearch = (e: any) => {
    const value = e.target.value;
    if (value?.length > 0) {
      setShowTrash(true);
      searchProduct(value);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setShowTrash(false);
      setProductsSearched([]);
    }
    setSearchValue(value);
  };

  const handleBlurSearch = () => {
    setShowTrash(false);
  };

  const handleFocusSearch = () => {
    if (searchValue?.length > 0) {
      setShowTrash(true);
    } else setShowTrash(false);
  };

  const handleClearSearchValue = () => {
    setSearchValue("");
    setProductsSearched([]);
  };

  useEffect(() => {
    const search: any = searchRef?.current;
    if (search) {
      search?.focus();
    }
  }, []);

  return (
    <div className="font-montserrat-regular">
      <Menu
        onClose={handleClose}
        right={!isSearchAction ? true : false}
        width={680}
        isOpen={openSideBar}
        className={`${
          !isSearchAction ? "mr-4" : "ml-60"
        } bg-white shadow-2xl mt-6 SideBar--container rounded-md`}
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

        {productsCarPurchase > 0 && !isSearchAction ? (
          <>
            <div className="divide-y-[1px] divide-gray-400 w-full container">
              <div className="flex flex-col mx-6 content px-5">
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
                      {amountToGetForwardedFree}{" "}
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
                <div className="overflow-auto">
                  <Products products={products} />
                </div>
              </div>
              <div className="footer goldLight--color">
                <BottomSection />
              </div>
            </div>
          </>
        ) : productsCarPurchase === 0 && !isSearchAction ? (
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
        ) : (
          <div className="w-full px-12 pt-5">
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <input
                type="text"
                placeholder="Buscar..."
                maxLength={50}
                ref={searchRef}
                value={searchValue}
                onChange={handleChangeSearch}
                onBlur={handleBlurSearch}
                onFocus={handleFocusSearch}
                className="px-3 py-3 placeholder-slate-300 text-[#788AA6] font-semibold border-r-0 border-l-0 border-t-0 relative bg-white rounded-sm text-sm outline-none border-[1.25px] border-b-[#5f2698] w-full pr-10 shadow-none focus:shadow-purple-300 focus:shadow-sm-light"
              />

              <span className="z-10 h-full leading-snug font-normal absolute text-center text-purple-800 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <div
                  className="cursor-pointer"
                  onClick={() => handleClearSearchValue()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`${
                      showTrash ? "visible" : "invisible"
                    } w-6 h-6 -mt-0.5 text-[#788AA6] hover:text-[#364152]`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </span>
            </div>
            <div className="pt-10 ml-7" style={{height: 'calc(100vh - 216px)'}}>
              {isLoading ? (
                <div className="flex flex-col gap-5">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : (
                <div className="flex flex-col gap-6 overflow-auto h-full">
                  {productsSearched.length > 0 && (
                    <SearchProductsList products={productsSearched} />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
};
