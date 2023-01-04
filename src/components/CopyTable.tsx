import React, {FC} from "react";
import { ACTION_NAMES } from "src/models/constants";
import { StoreModel } from "src/models/types";
import styled from "styled-components";

interface CopyTableModel{
  store: StoreModel
}

const CopyTableStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: flex-start;
`;

const CellStyle = styled.div`
  padding: 0.5em 1em;
  width: 100%;
  max-width: 15em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &.selected{
    color: var(--main-color);
  }
  :nth-child(even) {
    background-color: var(--table-row-bg);
  }
`;

const ColumnStyle = styled.div`
  width: min-content;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const TitleRowStyle = styled.div`
  font-weight: bold;
  padding: 0.5em 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
`;

export const CopyTable: FC<CopyTableModel> = ({store}) => {
  const handleRowClick = (copyId: string) => {
    store.dispach({
      name: ACTION_NAMES.app_selectCopy,
      payload: copyId
    });
  };

  return <CopyTableStyle>
    {
      store.state.templates[0].copyColumns.map(column => 
        <ColumnStyle key={column.uuid}>
          <TitleRowStyle>{column.label ? column.label : column.targetBlockId}</TitleRowStyle>
          <>
            {
              store.state.templates[0].copyRows.map(row => {
                const cell = row.cells.find(cell => cell.columnId === column.uuid);
                return cell && 
                <CellStyle 
                  key={cell.uuid}
                  onClick={() => handleRowClick(row.uuid)}
                  className={`${row.uuid === store.state.selectedCopy ? "selected" : ""}`}
                >
                  {cell.value}
                </CellStyle>;
              })
            }
          </>
        </ColumnStyle>
      )
    }
    {/* <TitleRowStyle>
      {
        store.state.templates[0].copyColumns.map(column => 
          <CellStyle key={column.uuid}>{column.label ? column.label : column.targetBlockId}</CellStyle>
        )
      }
    </TitleRowStyle>
    <>
      {
        store.state.templates[0].copyRows.map(row => 
          <RowStyle key={row.uuid} className={`${row.uuid === store.state.selectedCopy ? "selected" : ""}`}>
            {
              store.state.templates[0].copyColumns.map(column => {
                const cell = row.cells.find(cell => cell.columnId === column.uuid);
                return cell && <CellStyle key={cell.uuid}>{cell.value}</CellStyle>;
              })
            }
          </RowStyle>
        )
      }
    </> */}
  </CopyTableStyle>;
};