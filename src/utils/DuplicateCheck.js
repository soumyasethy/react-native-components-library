export const DuplicateCheck = (value, array) => {
  return array.find(item => {
    return item.barcode === value;
  });
};
