import React, { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { StoreModel } from "src/models/types";
import { ACTION_NAMES, AFTER_ANIMATION, PAGE_ORIENTATION, TAB_TYPE, THOUSAND} from "src/models/constants";
import { CopiesStack } from "./CopiesStack";
import { EditStack } from "./EditStack";

interface StackModel {
  store: StoreModel
}

const StackStyle = styled.div`
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
  --zoom: 1;
  --page-margin-top: 0mm;
  --page-margin-right: 0mm;
  --page-margin-bottom: 0mm;
  --page-margin-left: 0mm;
`;

export const PageStyle = styled.div`
  cursor: default;
  background: var(--section-bg);
  transition: all var(--transition);
  --width: calc( var(--zoom) * (var(--page-size-1) - var(--page-margin-left) - var(--page-margin-right)));
  --height: calc( var(--zoom) * (var(--page-size-2) - var(--page-margin-top) - var(--page-margin-bottom)));
  width: var(--width);
  height: var(--height);
  min-width: var(--width);
  min-height: var(--height);
  max-width: var(--width);
  max-height: var(--height);
  padding-top: calc( var(--zoom) * var(--page-margin-top));
  padding-right: calc( var(--zoom) * var(--page-margin-right));
  padding-bottom: calc( var(--zoom) * var(--page-margin-bottom));
  padding-left: calc( var(--zoom) * var(--page-margin-left));
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justyfy-content: flex-start;
  overflow: hidden;
  box-shadow: var(--box-shadow);
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
        if(heightProportion && widthProportion &&
          (targetBlock.FTPProportions.height !== heightProportion || targetBlock.FTPProportions.width !== widthProportion)) {
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


  const pageSize = store.state.templates[0].pageSizeMM.split(" ");
  const isHorizontal = store.state.templates[0].pageOrientation === PAGE_ORIENTATION.horizontal;
  const modifiedSize = isHorizontal ? pageSize.reverse() : pageSize;
  return <StackStyle
    className="stack"
    onClick={(e) => { (e.target as HTMLElement).classList.contains("stack") && handleBlockSelect(null); }}
    style={({
      // ...getMargins(store.state.templates[0].pageMargin),
      "--zoom":store.state.zoomByTab[store.state.selectedTab],
      "--page-size-1":modifiedSize[0],
      "--page-size-2":modifiedSize[1]
    } as CSSProperties)}
  >
    {
      store.state.selectedTab === TAB_TYPE.Edit && 
      <EditStack store={store}/>
    }
    {
      store.state.selectedTab === TAB_TYPE.Copy && 
      <CopiesStack store={store} />
    }
  </StackStyle>;
};

export default Stack;