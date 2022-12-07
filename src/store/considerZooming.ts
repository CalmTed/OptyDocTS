
const considerZooming: (str: string) => string = (value) => {
  //does not replaces %, b.c % are scalable on it own
  const mask = /\d{1,}(mm|cm|in|pt|px)/g;
  const newValue = value.replace(mask, (str) => {
    return `calc( var(--zoom) * ${str})`;
  });
  return newValue;
};

export default considerZooming;