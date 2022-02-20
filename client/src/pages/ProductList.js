import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-align: right;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  direction: rtl;
  text-align: right;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 5px;
`;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Slider></Slider>
      <Hr></Hr>
      <Title>כל המוצרים</Title>
      <FilterContainer>
        <Filter>
          <FilterText>סינון</FilterText>
          <Select name="categories" onChange={handleFilters}>
            <Option disabled>קטגוריה</Option>
            <Option>all</Option>
            <Option>men</Option>
            <Option>women</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>מידה</Option>

            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>מיון לפי</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">מוצרים: חודש לישן</Option>
            <Option value="asc">מחיר:נמוך לגבוה</Option>
            <Option value="desc">מחיר:גבוה לנמוך</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} />

      <Hr></Hr>
      <Footer />
    </Container>
  );
};

export default ProductList;
