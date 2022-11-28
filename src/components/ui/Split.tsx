import React, {FC, useEffect} from "react";
import { ACTION_NAMES, MinHeightBottom, MinHeightTop, TWO } from "src/models/constants";
import { StoreModel } from "src/models/types";
import styled from "styled-components";

interface SplitProps{
  store: StoreModel
  children?: React.ReactNode[]
}

const SplitStyle = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  --split-size: 0px;
`;

const UpperStyle = styled.div`
  width: 100%;
  height: calc(50% - 2.5em + var(--split-size));
`;

const LowerStyle = styled.div`
  width: 100%;
  height: calc(50% - 2.5em - var(--split-size));
`;

const GutterStyle = styled.div`
  max-height: 5em;
  display: flex;
  width: 100%;
  cursor: row-resize;
  ::before{
    cursor: row-resize;
    content: "";
    width: 2em;
    position: relative;
    left: calc(50% - 1em);
    height: 0.4em;
    background: var(--app-bg);
    display: inline-block;
    border-radius: 50px;
  }
`;
const setDraggigState = (event: MouseEvent | React.MouseEvent, arg: boolean) => {
  const split = document.querySelector("#split")  as HTMLElement;
  if(split) {
    const startY = event.clientY;
    const draggingState: string = document.querySelector("#split")?.getAttribute("draggingState") || "0";
    if(draggingState) {
      split.setAttribute("draggingState", arg ? "true" : "false");
      if(arg) {
        split.setAttribute("draggingStartY", startY + "");
        split.setAttribute("draggingStartSize", split.getAttribute("eventdifference") || split.getAttribute("property") || "");
      }
    }
  }
};
const handleMouseMove = (event: MouseEvent) => {
  const split = document.querySelector("#split") as HTMLElement;
  if(split) {
    const draggingState: string = split.getAttribute("draggingState") || "false";
    if(draggingState === "true") {
      const mouseMoveDistance = event.clientY - (parseInt(split.getAttribute("draggingStartY") || "0"));
      const sizeBeforeEvent = parseInt(split.getAttribute("draggingStartSize") || "0");
      const newSize = sizeBeforeEvent + mouseMoveDistance;
      const isTopOk = split.clientHeight / TWO + newSize > MinHeightTop;
      const isBottomOk = split.clientHeight / TWO - newSize > MinHeightBottom;
      if(isTopOk && isBottomOk) {
        split.style.setProperty("--split-size", newSize + "px");
        split.setAttribute("eventdifference", newSize + "");
      }
    }
  }
};
const handleMouseDown = (event: React.MouseEvent) => {
  const split = document.querySelector("#split");
  if(split) {
    if((split.getAttribute("draggingState") || "false") !== "true") {
      setDraggigState(event, true);
    }
  }
};

const MouseMoveEL = (event: MouseEvent) => {
  handleMouseMove(event);
};

const Split: FC<SplitProps> = ({store, children}) => {
  useEffect(() => {
    document.addEventListener("mouseup", MouseUpEL, true);
    document.addEventListener("mousemove", MouseMoveEL, true);
    return () => {
      document.removeEventListener("mouseup", MouseUpEL, true);
      document.removeEventListener("mousemove", MouseMoveEL, true);
    };
  });
  const MouseUpEL = (event: MouseEvent) => {
    const split = document.querySelector("#split");
    if(split) {
      if((split.getAttribute("draggingState") || "false") !== "false") {
        setDraggigState(event, false);
        const newSize = parseInt(split.getAttribute("eventdifference") || "0");
        store.dispach({
          name: ACTION_NAMES.app_setsidebarSectionHeight,
          payload: newSize
        });
      }
    }
  };
  return (<SplitStyle 
    id="split" 
    style={({"--split-size": (store.state.sidebarSectionHeight + "px")} as React.CSSProperties)}
    property={store.state.sidebarSectionHeight + ""}
  >
    {children && (
      <>
        <UpperStyle>{children[0]}</UpperStyle>
        <GutterStyle
          className="gutter"
          onMouseDown={(event) => { handleMouseDown(event as React.MouseEvent); }}
        ></GutterStyle>
        <LowerStyle>{children[1]}</LowerStyle>
      </>
    )}
  </SplitStyle>);
};

export default Split;