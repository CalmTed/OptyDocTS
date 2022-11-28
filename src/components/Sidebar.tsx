import React, { FC, useState } from "react";
import styled from "styled-components";
import { StoreModel } from "src/models/types";
import Tabs from "./Tabs";
import Split from "./ui/Split";
import Button from "./ui/Button";
import Select, { selectOption } from "./ui/Select";
import Textarea from "./ui/Textarea";

interface SidebarModel {
  store: StoreModel
}

const SidebarStyle = styled.div`
  background: var(--section-bg);
  position: fixed;
  width: var(--sidebar-width);
  left: 0px;
  height: 100vh;
`;


const Sidebar: FC<SidebarModel> = ({store}) => {

  const [option, setOption] = useState(1);

  return <SidebarStyle> 
    <Tabs store={store}></Tabs>
    <Split store={store}>
      <div>
        <p>123</p>
        <Button onClick={() => null}>123</Button>
        <Select 
          value={option}
          onChange={(newOption: selectOption) => { setOption(newOption.value as number); }}
          options={[
            {
              value: 1,
              label:"1"
            },
            {
              value: 2,
              label:"2"
            },
            {
              value: 3,
              label:"3"
            },
            {
              value: 4,
              label:"4"
            },
            {
              value: 5,
              label:"5"
            },
            {
              value: 6,
              label:"6"
            },
            {
              value: 7,
              label:"7"
            }
          ]}
        ></Select>
        <Textarea value="123" onChange={() => { null; }}></Textarea>
      </div>
      <div>Tree view</div>
    </Split>
  </SidebarStyle>;
};

export default Sidebar;