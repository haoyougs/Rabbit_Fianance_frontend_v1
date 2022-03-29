import React from "react";
import styled from "styled-components";

export const Slider: React.FC = () => {
  return (
    <SliderBox>
      <SliderBor>
        <BGColorBox></BGColorBox>
        <Btn></Btn>
      </SliderBor>
      <ValueBox>9 X</ValueBox>
    </SliderBox>
  );
};
const SliderBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;
const SliderBor = styled.div`
  flex: 1;
  height: 5px;
  background: #fff;
  position: relative;
  border-radius: 5px;
`;
const ValueBox = styled.div`
  width: 80px;
  height: 30px;
  background-color: rgb(66, 60, 86);
  border-radius: 10px;
  display: flex;
  padding: 0px 10px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Btn = styled.div`
  position: absolute;
  top: -4px;
  left: 50%;
  margin-left: -4px;
  cursor: pointer;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  border: 2px solid rgb(255, 182, 13);
  background: #fff;
  box-shadow: 0 0 4px 4px #00000040;
  :after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    pointer-events: none;
    background-color: rgba(255, 182, 13, 0.5);
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0;
    transition: all 0.5s;
  }
  :hover:after {
    opacity: 0.8;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    transition: 0.3s;
  }
`;
const BGColorBox = styled.div`
  width: 50%;
  height: 5px;
  background-color: rgba(255, 182, 13);
  border-radius: 5px;
`;

export const SliderInp: React.FC<{
  max: any;
  min: any;
  value: any;
  onChange: any;
}> = ({ max, min, value, onChange }) => {
  // {((value+100)*100)/200}%
  return (
    <SliderBox>
      <SliderBbox>
        <Input
          type="range"
          max={max}
          min={min}
          value={value}
          onChange={onChange}
        />
      </SliderBbox>
      <ValueBox>{value/10} X</ValueBox>
    </SliderBox>
  );
};

const Input = styled.input<{ value: number }>`
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background-image: linear-gradient(
    to right,
    rgb(255, 182, 13) ${(props) =>props.value}%,
    #fff 0%
  );

  background-repeat: no-repeat;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 2px solid rgb(255, 182, 13);
    background: #fff;
    box-shadow: 0 0 4px 4px #00000040;
    cursor: pointer;
  }
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;

const SliderBbox = styled.div`
  flex: 1;
`;
