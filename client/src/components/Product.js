import { ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { mobile } from "../responsive";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3;
  display: flex;
  /* align-items: center;
  justify-content: center; */
  flex-direction: column;
  transition: all 0.5s ease;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  margin: 10px;
`;

const ItemColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: 2px solid white;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 25px;
  text-align: right;
  padding-right: 10px;
  color: #e9f5f5;
  /* direction: rtl; */
`;

const Colors = styled.span`
  font-weight: 400;
  font-size: 25px;
  text-align: right;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  color: #e9f5f5;
`;

const Container = styled.div`
  /* flex: 1; */
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ flex: "1" })}
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #e9f5f5;
  position: absolute;
`;

const Image = styled.img`
  height: 80%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px 5px;
  transition: all 0.3s ease;
`;

const Button = styled.button`
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 60px;
  justify-content: space-evenly;
  transition: all 0.3s ease;
  margin-top: 120px;

  &:active {
    background-color: #e9f5f5;
    transform: scale(1.04);

    ${Icon} {
      background-color: #e9f5f5;
    }
  }
`;
const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addProduct({
        ...item,
        quantity: 1,
        color: item.color[0],
        size: item.size[0],
      })
    );
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>

        <Price>₪ {item.price} :מחיר</Price>
        <Price> {item.size} :מידה</Price>
        <Colors>
          {item.color?.map((c) => (
            <ItemColor color={c} key={c} />
          ))}
          :צבע
        </Colors>

        <Button onClick={handleClick}>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          הוסף לסל
        </Button>
      </Info>
    </Container>
  );
};

export default Product;
