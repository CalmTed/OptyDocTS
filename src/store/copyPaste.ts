import { Version } from "src/models/constants";
import { BlockModel } from "src/models/types";

const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement("textarea") as HTMLTextAreaElement;
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};
export const copyTextToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    null;
  }, (err) => {
    console.error("Async: Could not copy text: ", err);
  });
};

interface encodingPayloadModel{
  version: string,
  uuid: string,
  block: BlockModel,
  children: BlockModel[]
}

export const encodeBlock:(block: BlockModel, children: BlockModel[])=>string = (block, children) => {
  const payload:encodingPayloadModel = {
    version: Version,
    uuid: block.uuid,
    block,
    children
  };
  const encodedString = encodeURI(JSON.stringify(payload));
  return `${btoa(encodedString).replace(/i/g, "_").replace(/ab/g, "i").replace(/_/g, "ab")}`;
};

interface decodingBlockOutput{
  result: boolean
  block: BlockModel | null
  children: BlockModel[]
}

export const decodeBlock:(string: string)=>decodingBlockOutput = (string) => {
  const ret:decodingBlockOutput = {
    result: false,
    block: null,
    children: [] 
  };
  try{
    const decodedString = atob(string.replace(/ab/g, "_").replace(/i/g, "ab").replace(/_/g, "i"));
    const posibleBlock:encodingPayloadModel = JSON.parse(decodeURI(decodedString));
    if(JSON.stringify(Object.keys(posibleBlock)) !== "[\"version\",\"uuid\",\"block\",\"children\"]") {
      console.error("DECODING: payload keys are wrong", JSON.stringify(Object.keys(posibleBlock)));
      return ret;
    }
    if(posibleBlock.version !== Version) {
      console.error("DECODING: version is wrong");
      return ret;
    }
    return {
      result: true,
      block: posibleBlock.block,
      children: posibleBlock.children
    };
  }catch (e) {
    console.error(e);
    return ret;
  }
};