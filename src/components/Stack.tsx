import React, { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { BlockModel, StoreModel } from "src/models/types";
import { ACTION_NAMES, AFTER_ANIMATION, ONE, THOUSAND, ZERO } from "src/models/constants";
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
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justyfy-content: flex-start;
`;

const Stack: FC<StackModel> = ({store}) => {

  const handleBlockSelect = (uuid: string | null) => {
    store.dispach({
      name: ACTION_NAMES.app_selectBlock,
      payload: uuid
    });
  };
  
  //it seems like this is the only reliable way to get correct dom element size
  setTimeout(() => {
    const rootBlocks = document.querySelectorAll(".rootBlock");
    [...rootBlocks].map((block) => {
      const pageDOM = block.parentElement as HTMLElement;
      //getting block uuid
      const blockUUID = block.className.split(" ").find(name => /uuid-b(\d){1,}/.test(name))?.replace("uuid-", "") || "";
      //getting size proportions
      const pageRightBorder = pageDOM.clientWidth;
      const pageBottomBorder = pageDOM.clientHeight;
      const blockHeight = block.clientHeight;
      const blockWidth = block.clientWidth;
      const widthProportion = Math.round(blockWidth / pageRightBorder * THOUSAND) / THOUSAND;
      const heightProportion = Math.round(blockHeight / pageBottomBorder * THOUSAND) / THOUSAND;
      //comparing to state saved
      const targetBlock = store.state.templates[0].blocks.find(block => block.uuid === blockUUID);
      if(targetBlock) {
        if(targetBlock.FTPProportions.height !== heightProportion || targetBlock.FTPProportions.width !== widthProportion) {
          store.dispach({
            name: ACTION_NAMES.block_setFTP,
            payload: {
              blockUUID: blockUUID,
              width: widthProportion,
              height: heightProportion
            }
          });
        }
      }
    });
  }, AFTER_ANIMATION);

  const renderPage: (block: BlockModel[], store: StoreModel) => React.ReactNode = (blocks, store) => {
    const pageKey = `${blocks[0].uuid}${blocks[blocks.length - ONE].uuid}`;
    return <PageStyle key={pageKey} className="page">
      {
        blocks.map(block => 
          <Block key={block.uuid} classes="rootBlock" store={store} block={block}></Block>
        )
      }
    </PageStyle>;
  };
  const rootChildren = store.state.templates[0].blocks.filter(block => block.parentId === null);
  const pageSize = store.state.templates[0].pageSizeMM.split(" ");
  const isHorizontal = store.state.templates[0].pageOrientation === "horizontal";
  const modifiedSize = isHorizontal ? pageSize.reverse() : pageSize;
  const rootBlocks: (blocks: BlockModel[]) => BlockModel[][] = (blocks) => {
    //v.3
    //we expect page style to be
    // display: flex, justify-content: start, align-content: start
    const ret:BlockModel[][] = [];
    let pageIndex = ZERO;
    let blockIndex = ZERO;
    const blocksLength = blocks.length - ONE;
    let rowTop = ZERO;
    let borderB = ZERO;
    let borderR = ZERO;
    while(blockIndex <= blocksLength) {
      const blockFtpW = blocks[blockIndex].FTPProportions.width;
      const blockFtpH = blocks[blockIndex].FTPProportions.height;
      // console.log(`BLOCK ${blockIndex}`);
      // console.log("start");
      // console.log("rowTop", rowTop);
      // console.log("blockH", blockFtpH);
      // console.log("blockW", blockFtpW);
      // console.log("borderB", borderB);
      // console.log("borderR", borderR);
      //do we need to break page?
      if(rowTop + blockFtpH > ONE) {
        pageIndex++;
        rowTop = ZERO;
        borderB = ZERO;
        borderR = ZERO;
      }else{
        //do we need to break line?
        if(borderR + blockFtpW > ONE) {
          rowTop = borderB;
          borderR = blockFtpW;
          borderB = borderB + blockFtpH;
          //do we need to break page now?
          if(borderB > ONE) {
            pageIndex++;
            rowTop = ZERO;
            borderB = ZERO;
            borderR = ZERO;
            //do we need to update borderB?
            if(rowTop + blockFtpH > borderB) {
              borderB = rowTop + blockFtpH;
            }
            //at least updating borderR
            borderR += blockFtpW;
          }
        }else{
          //do we need to update borderB?
          if(rowTop + blockFtpH > borderB) {
            borderB = rowTop + blockFtpH;
          }
          //at least updating borderR
          borderR += blockFtpW;
        }
      }
      if(!ret[pageIndex]) {
        ret[pageIndex] = [];
      }
      ret[pageIndex].push(blocks[blockIndex]);
      blockIndex++;
      // console.log("end");
      // console.log("rowTop", rowTop);
      // console.log("blockH", blockFtpH);
      // console.log("blockW", blockFtpW);
      // console.log("borderB", borderB);
      // console.log("borderR", borderR);
    }
    return ret;
  };
  return <SidebarStyle
    className="stack"
    onClick={(e) => { (e.target as HTMLElement).classList.contains("stack") && handleBlockSelect(null); }}
    style={({
      "--page-size-1":modifiedSize[0],
      "--page-size-2":modifiedSize[1]
    } as CSSProperties)}
  >
    {
      rootBlocks(rootChildren).map(childList => {
        return renderPage(childList, store);
      })
    }
  </SidebarStyle>;
};

export default Stack;