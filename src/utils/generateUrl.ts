export const generateUrl = (name: string, id: number | string) => {
  return name.toLowerCase().split(" ").join("-") + "-" + id;
};
