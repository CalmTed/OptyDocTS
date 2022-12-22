import React, { FC } from "react";
import { StoreModel } from "src/models/types";
import styled from "styled-components";
import Select from "./Select";
import { ACTION_NAMES, ONE } from "src/models/constants";

interface MICopyNavModel{
  store: StoreModel
}

const MICopyNavStyle = styled.div`
  padding: 0.6em 1em;
  diplay: flex;
  flex-wrap: wrap;
  .copyNavArrow{
    width: 1em;
    display: flex;
    align-items: center;
    justyfy-content: center;
    font-size: 110%;
  }
`;

export const MICopyNav:FC<MICopyNavModel> = ({store}) => {
  const handleSelectCopy = (arg: "prev" | "next" | string | null) => {
    store.dispach({
      name: ACTION_NAMES.app_selectCopy,
      payload: arg === "null" ? null : arg
    });
  };
  const copiesOptions = () => {
    return [
      {
        label: "None",
        value: "null"
      },
      ...store.state.templates[0].copyRows.map((row, i) => {
        return {
          label: `Copy ${i + ONE} `,
          value: row.uuid
        };
      })
    ];
  };
  return <MICopyNavStyle>
    <Select value={store.state.selectedCopy || "null"} options={copiesOptions()} onChange={(newVal) => handleSelectCopy(String(newVal.value))}></Select>
    {/* <Button
      classes="copyNavArrow"
      onClick={() => handleSelectCopy("prev")}
      type="nocolor"
    >
      <Icon iconType="left"></Icon>
    </Button>
    <Button
      classes="copyNavArrow"
      onClick={() => handleSelectCopy("next")}
      type="nocolor"
    >
      <Icon iconType="right"></Icon>
    </Button> */}
  </MICopyNavStyle>;
};