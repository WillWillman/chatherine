const jsonMethod = (method: string, fallback?) => (value) => {
  try {
    return JSON[method](value) || fallback?.(value) || value;
  }
  catch (_e) {
    return fallback?.(value) || value;
  }
};

export const safeJSON = {
  parse: (str: string) => jsonMethod('parse')(str),
  stringify: (obj): string => jsonMethod('stringify', (v) => String(v))(obj),
};
