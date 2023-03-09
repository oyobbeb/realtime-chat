import React, { useState } from "react";
import styled from "styled-components";

export default function SearchInput({ onKeywordSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setValue('');
    onKeywordSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={value}
        placeholder="검색하기"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

const Input = styled.input`
  padding: 10px 15px;
  border: 1px solid #ededed;
  height: 24px;
  min-width: 30vh;
  border-radius: 2px;
  font-size: 16px;
  letter-spacing: -0.5px;
  transition: 0.3s all ease;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus,
  &:active {
    border: 1px solid #414141;
  }
`;

