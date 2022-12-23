import { sizeMask } from "src/models/constants";

const considerZooming: (str: string) => string = (value) => {
  //for background images, so it would not try to convert base64 code
  const maxSizeToTranslate = 2000;
  if(value.length > maxSizeToTranslate) {
    return value;
  }
  //does not replaces %, b.c % are scalable on it own
  const newValue = value.replace(sizeMask, (str) => {
    if(str.includes("%")) {
      return str;
    }
    return ` calc( var(--zoom) * ${str}) `;
  });
  return newValue;
};

export default considerZooming;