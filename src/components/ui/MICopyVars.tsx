import React, { FC } from "react";
import { CopyCellModel, StoreModel } from "src/models/types";
import styled from "styled-components";
import Select from "./Select";
import { ACTION_NAMES, CONTENT_TYPE, ONE } from "src/models/constants";
import Input from "./Input";
import Textarea from "./Textarea";

interface MICopyVarsModel{
  store: StoreModel
}

const CopyVarStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.6em 0;
  label{
    padding-bottom: 0.3em;
  }
`;

const MICopyVarsStyle = styled.div`
  padding: 0.6em 1em;
  diplay: flex;
  flex-wrap: wrap;
  .input{
    width: 100%;
  }
`;

export const MICopyVars:FC<MICopyVarsModel> = ({store}) => {
  
  const row = store.state.templates[0].copyRows.find(cell => cell.uuid === store.state.selectedCopy);
  const handleValueChange = (newVal: string, cell: CopyCellModel) => {
    if(!row || !cell) {
      return;
    }
    store.dispach({
      name: ACTION_NAMES.template_setCopyValue,
      payload: {
        cellUUID: cell.uuid,
        value: newVal
      }
    });
  };
  return <MICopyVarsStyle>
    {
      row?.cells && row.cells.map(cell => {
        const column = store.state.templates[0].copyColumns.find(col => col.uuid === cell.columnId);
        if(!column) {
          return;
        }
        return <CopyVarStyle key={cell.uuid}>
          <label>{column.label}</label>
          {
            column.contentType === CONTENT_TYPE.variable &&
            cell.value.indexOf("\n") === -ONE &&
            <Input value={cell.value} onChange={ (e) => handleValueChange((e.target as HTMLInputElement).value, cell) }></Input>
          }
          {
            column.contentType === CONTENT_TYPE.variable &&
            cell.value.indexOf("\n") > -ONE &&
            <Textarea value={cell.value} onChange={ (e) => handleValueChange((e.target as HTMLInputElement).value, cell) }></Textarea>
          }
          {
            column.contentType === CONTENT_TYPE.select &&
            <Select
              value={cell.value}
              options={column.options.map(c => {
                return {
                  label: c,
                  value: c
                }; 
              })}
              onChange={ (newVal) => handleValueChange(String(newVal.value), cell) }
            ></Select>}
        </CopyVarStyle>;
      })
    }
  </MICopyVarsStyle>;
};