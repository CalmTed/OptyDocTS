import { useEffect, useState } from "react";
import { ToastTime } from "src/models/constants";
import { StoreModel } from "src/models/types";

const useUI = () => {
  
  //                         ---------------------------TOAST HOOK---------------------------
  const [toast, setToast] = useState({
    text: "",
    isShown: false,
    lastUpdateTime: -1
  });
  const hideToast = () => {
    setToast({
      text: toast.text,
      isShown: false,
      lastUpdateTime: toast.lastUpdateTime
    });
  };
  const showToast: StoreModel["showToast"] = (textToShow) => {
    setToast({
      text: textToShow,
      isShown: true,
      lastUpdateTime: new Date().getTime()
    });
  };
  useEffect(() => {
    const hideToastTimeout = setTimeout(() => {
      if(toast.isShown && toast.lastUpdateTime < new Date().getTime() - ToastTime) {
        hideToast();
      }
    },  ToastTime);
    return () => {
      clearTimeout(hideToastTimeout);
    };
  }, [toast.lastUpdateTime]);
  //END TOAST HOOK

  //                         ---------------------------PROMPT HOOK---------------------------
  const [prompt, setPrompt] = useState({
    header: "",
    text: "",
    type: "alert" as "alert" | "confirm" | "prompt",
    isShown: false,
    lastUpdateTime: -1,
    onCancel: () => { hidePrompt(); },
    onConfirm: () => { hidePrompt(); },
    onProceed: (arg: string) => { hidePrompt(); arg; }
  });
  const hidePrompt = () => {
    setPrompt({
      header: prompt.header,
      text: prompt.text,
      type: prompt.type,
      isShown: false,
      lastUpdateTime: new Date().getTime(),
      onCancel: prompt.onCancel,
      onConfirm: prompt.onConfirm,
      onProceed: prompt.onProceed
    });
  };
  const showAlert: StoreModel["showAlert"] = (header, text, onCancel) => {
    setPrompt({
      header: header,
      text: text,
      type: "alert",
      isShown: true,
      lastUpdateTime: new Date().getTime(),
      onCancel: () => {
        hidePrompt();
        onCancel ? onCancel() : null;
      },
      onConfirm: prompt.onConfirm,
      onProceed: prompt.onProceed
    });
  };
  const showConfirm: StoreModel["showConfirm"] = (header, text, onConfirm, onCancel) => {
    console.log(header, text, onConfirm);
    setPrompt({
      header: header,
      text: text,
      type: "confirm",
      isShown: true,
      lastUpdateTime: new Date().getTime(),
      onCancel: () => {
        hidePrompt();
        onCancel ? onCancel() : null;
      },
      onConfirm: () => {
        hidePrompt();
        onConfirm();
      },
      onProceed: prompt.onProceed
    });
  };
  const showPrompt: StoreModel["showPrompt"] = (header, text, onProceed, onCancel) => {
    setPrompt({
      header: header,
      text: text,
      type: "prompt",
      isShown: true,
      lastUpdateTime: new Date().getTime(),
      onCancel: () => {
        hidePrompt();
        onCancel ? onCancel() : null;
      },
      onConfirm: prompt.onConfirm,
      onProceed: (result) => {
        hidePrompt();
        onProceed(result);
      }
    });
  };
  //END PROMPT HOOK

  return {
    toast,
    prompt,
    showToast,
    showAlert,
    showConfirm,
    showPrompt
  };
};

export default useUI;