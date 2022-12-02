import React, { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import { ACTION_NAMES } from "src/models/constants";
import { Block } from "./Block";

interface StackModel {
  store: StoreModel
}

const SidebarStyle = styled.div`
  position: fixed;
  top: var(--topbar-height);
  left: var(--sidebar-width);
  --stack-padding: 3em;
  padding: var(--stack-padding);
  width: calc(100vw - var(--sidebar-width) - var(--stack-padding) - var(--stack-padding));
  height: calc(100vh - var(--topbar-height) - var(--stack-padding) - var(--stack-padding));
  overflow: auto;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: var(--stack-padding);
  align-content: start;
  justify-content: start;
`;

const PageStyle = styled.div`
  cursor: default;
  background: var(--section-bg);
  transition: all var(--transition);
  min-width: var(--page-size-1);
  min-height: var(--page-size-2);
  max-width: var(--page-size-1);
  max-height: var(--page-size-2);
`;

const Stack: FC<StackModel> = ({store}) => {

  const handleBlockSelect = (uuid: string | null) => {
    store.dispach({
      name: ACTION_NAMES.app_selectBlock,
      payload: uuid
    });
  };

  const renderPage: (block: BlockModel, store: StoreModel) => React.ReactNode = (block, store) => {
    
    return <PageStyle key={block.uuid} >
      <Block store={store} block={block}></Block>
    </PageStyle>;
  };

  //strategy for calculating fitsToPage
  //if dont know FTP render one block on one page 
  //after rendering check saved FTP and real
  //   if different >> dispatch change for block
  const rootChildren = store.state.templates[0].blocks.filter(block => block.parentId === null);
  const isHorizontal = store.state.templates[0].pageOrientation === "horizontal";
  const pageSize = store.state.templates[0].pageSizeMM.split(" ");
  const modifiedSize = isHorizontal ? pageSize.reverse() : pageSize;
  return <SidebarStyle
    className="stack"
    onClick={(e) => { (e.target as HTMLElement).classList.contains("stack") && handleBlockSelect(null); }}
    style={({
      "--page-size-1":modifiedSize[0],
      "--page-size-2":modifiedSize[1]
    } as CSSProperties)}
  > 
    {
      rootChildren.map(block => {
        return renderPage(block, store);
      })
    }
  </SidebarStyle>;
};

export default Stack;