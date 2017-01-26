export const saveDataToStorage = (data) => {
  localStorage.setItem('recipe-book-data',JSON.stringify(data));
};

export const getDataFromStorage = (arr) => {
  var storageData = JSON.parse(localStorage.getItem('recipe-book-data'));
  if(storageData!==null && storageData.length >0){
    return storageData;
  }
  return arr.route.data;
};
