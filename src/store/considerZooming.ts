import { sizeMask } from "src/models/constants";

const considerZooming: (str: string) => string = (value) => {
  //does not replaces %, b.c % are scalable on it own
  const newValue = value.replace(sizeMask, (str) => {
    if(str.includes("%")) {
      return str;
    }
    return `calc( var(--zoom) * ${str})`;
  });
  return newValue;
};

export default considerZooming;