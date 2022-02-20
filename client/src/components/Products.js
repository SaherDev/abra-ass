import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useProductsFetch } from "../hooks/useProductsFetch";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCart } from "../redux/apiCalls";
const Container = styled.div``;

const ContainerData = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ContainerButton = styled.div`
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 150px;
  border: none;
  padding: 10px 20px;
  background-color: white;
  border: 2px solid teal;
  background-color: ${(props) => (props.disabled ? "#aeaeae" : "#e9f5f5")};
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    cursor: not-allowed;
  }

  &:active {
    transform: ${(props) => (props.disabled ? "scale(1)" : "scale(1.04)")};
  }
  ${mobile({ flex: 0.75 })}
`;

const Products = ({ filters, sort }) => {
  const { isLoading, products, offset, hasMore, setOffset } =
    useProductsFetch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      updateUserCart(dispatch, currentUser, cart);
    }
  }, [currentUser, cart.CartId, cart.products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
          if (value === "all") return true;
          else return item[key].includes(value);
        })
      )
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <ContainerData>
        {filteredProducts.map((item, idx) => (
          <Product item={item} key={idx} />
        ))}
      </ContainerData>
      <ContainerButton>
        {filteredProducts.length > 0 ? (
          <Button onClick={() => setOffset(offset + 6)} disabled={!hasMore}>
            {isLoading ? "טוען ..." : "הצג עוד"}
          </Button>
        ) : (
          ""
        )}
      </ContainerButton>
    </Container>
  );
};

export default Products;
