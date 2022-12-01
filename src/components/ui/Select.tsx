import React, {FC} from "react";
import { FOCUS_ORDER } from "src/models/constants";
import { SelectOption } from "src/models/types";
import styled from "styled-components";

interface SelectModel{
  value: (string | number) | (string | number)[]
  onChange: (value: SelectOption) => void
  options: SelectOption[]
  classes?: string
  style?: React.CSSProperties
}

const SelectValueStyle = styled.div`
  width: calc(100% - 2em);
  overflow: hidden;
`;

const SelectTriangleStyle = styled.div`
  width: 1em;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  transform: rotate(180deg);
  :after{
    content: "";
    --sideborder: 0.4em solid transparent;
    border-left: var(--sideborder);
    border-right: var(--sideborder);
    border-bottom: 0.6em solid var(--app-bg);
    height: 0;
    display: flex;
    width: 0;
    margin-top: -0.15em;
  }
`;
const SelectListStyle = styled.div`
  height: 0;
  width: 0;
  transform: translate(-1em, 50%);
  transition: all var(--transition);
  visibility: hidden;
  opacity: 0;
  max-height: 14em;
  z-index: var(--z-select-list);

`;
const SelectListItemStyle = styled.div` 
  background: var(--section-bg);
  padding: 0.5em 1.2em;
  max-width: 17em;
  overflow: hidden;
  min-width: 5em;
  cursor: pointer;
  border: 0.2em solid var(--app-bg);
  border-bottom-width: 0;
  border-top-width: 0;
  &:first-child{
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    border-top-width: 0.2em;
  }
  &:last-child{
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    border-bottom-width: 0.2em;
  }
  :hover{
    background: var(--app-bg);
    border-color: var(--app-bg);
  }
  &.selected{
    color: var(--section-bg);
    background: var(--main-color);
    border-color: var(--main-color);
    :hover{
      color: var(--app-bg);
    }
  }
`;

const SelectWrapperStyle = styled.div`
  width: calc(100% - 2.4em);
  border: 0.2em solid var(--app-bg);
  background: transparent;
  border-radius: var(--border-radius);
  padding: 0.5em 1em;
  color: var(--text-color);
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover{
  }
  &:focus-within ${SelectListStyle}{
    transform: translate(-1em, calc(50% + 1em));
    visibility: visible;
    opacity: 1;
  }
  &:focus-within ${SelectTriangleStyle}{
    transform: rotate(0deg);
  }

`;


const Select: FC<SelectModel> = ({value, onChange, options, classes, style}) => {
  const selectedValue = options.filter(
    option => {
      if(["string", "number"].includes(typeof value)) {
        if(option.value === value) {
          return true;
        }else{
          return false;
        }
      }
      if(typeof value === "object") {
        if(value.includes(option.value)) {
          return true;
        }else{
          return false;
        }
      }
      return false;
    }
  );
  const seletedValueString = selectedValue.map(item => item.label).join(", ");
  const handleOptionSelecting = (item: SelectOption) => {
    onChange(item);
  };

  return <SelectWrapperStyle
    className={classes}
    style={style}
    tabIndex={parseInt(FOCUS_ORDER.select)}
  >
    <SelectListStyle className="optionsList">
      { options.map(item => {
        return <SelectListItemStyle
          key={item.value}
          vocab={item.value + ""}
          className={`${selectedValue.map(selectedItem => selectedItem.value).includes(item.value) ? "selected" : ""}`}
          onClick={ () => { 
            handleOptionSelecting(item);
          } }
          tabIndex={parseInt(FOCUS_ORDER.select)}
        >
          {item.label}
        </SelectListItemStyle>;
      }) }
    </SelectListStyle>
    <SelectValueStyle>{seletedValueString}</SelectValueStyle>
    <SelectTriangleStyle></SelectTriangleStyle>
  </SelectWrapperStyle>;
  // return <div className={`classes ${classes}`}>
  //   <TitleStyle>{seletedValueString}</TitleStyle>
  //   <SelectOptions>
  //     { options.map(item => {
  //       return <SelectOption
  //         key={item.value}
  //         vocab={item.value + ""}
  //         className={`${selectedValue.map(selectedItem => selectedItem.value).includes(item.value) ? "selected" : ""}`}
  //         onClick={ () => { 
  //           handleOptionSelecting(item);
  //         } }
  //         tabIndex={parseInt(FOCUS_ORDER.select)}
  //       >
  //         {item.label}
  //       </SelectOption>;
  //     }) }
  //   </SelectOptions>
  // </div>;
};
export default Select;