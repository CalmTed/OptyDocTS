import { Version } from "src/models/constants";
import { TemplateModel } from "src/models/types";

interface encodingPayloadModel{
  version: string,
  uuid: string,
  template: TemplateModel
}

const encodeTemplate:(template: TemplateModel)=>string = (template) => {
  const payload:encodingPayloadModel = {
    version: Version,
    uuid: template.uuid,
    template
  };
  const encodedString = JSON.stringify(payload);
  return `${btoa(encodedString).replace(/i/g, "_").replace(/ab/g, "i").replace(/_/g, "ab")}`;
};

interface decodingBlockOutput{
  result: boolean
  template: TemplateModel | null
}

const decodeTemplate:(string: string)=>decodingBlockOutput = (string) => {
  const ret:decodingBlockOutput = {
    result: false,
    template: null
  };
  try{
    const decodedString = atob(string.replace(/ab/g, "_").replace(/i/g, "ab").replace(/_/g, "i"));
    const posibleTemplate:encodingPayloadModel = JSON.parse(decodedString);
    if(JSON.stringify(Object.keys(posibleTemplate)) !== "[\"version\",\"uuid\",\"template\"]") {
      console.error("DECODING: payload keys are wrong", JSON.stringify(Object.keys(posibleTemplate)));
      return ret;
    }
    if(posibleTemplate.version !== Version) {
      console.error("DECODING: version is wrong");
      return ret;
    }
    return {
      result: true,
      template: posibleTemplate.template
    };
  }catch (e) {
    console.error(e);
    return ret;
  }
};


export const exportTemplate = (template: TemplateModel, callBack: () => void) => {
  //saving file as template [name][version].optydoc
  const encodedTemplate = encodeTemplate(template);
  const saveFile = (textToSave: string, fileName: string, callBack: () => void) => {
    const link = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(link);
    link.setAttribute("style", "display: none");
    const url = "data:application/json;charset=utf-8,%EF%BB%BF" + encodeURI(textToSave);
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
    callBack();
  };
  saveFile(encodedTemplate, `${template.name} ${Version}.optydoc`, () => {
    callBack();
  });
  return;
};


export const importTemplate: (file: Blob, callBack: (result: TemplateModel | null) => void) => void = (file, callBack) => {
  const fr = new FileReader();
  fr.onloadend = () => {
    const fileText = fr.result as string;
    const decodedTemplate = decodeTemplate(fileText);
    callBack(decodedTemplate.template);
  };
  fr.readAsText(file);
};