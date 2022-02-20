import { useEffect, useState } from "react";
import { publicRequest } from "..//utils/axiosInstanse";

export const useProductsFetch = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const fetchProducts = async () => {
    try {
      setisLoading(true);
      const res = await publicRequest.get(
        `/products?offset=${offset}&limit=${6}`
      );
      setisLoading(false);
      sethasMore(res.data.products.length == 6);

      if (offset == 0) {
        setProducts(res.data.products);
      } else setProducts([...products, ...res.data.products]);
    } catch (err) {
      setError(true);
    }
  };

  return {
    isLoading,
    error,
    hasMore,
    products,
    offset,
    setOffset,
    fetchProducts,
  };
};
