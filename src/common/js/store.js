export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    } else {
      seller[id][key] = value;
    }
  }
  localStorage.__seller__ = JSON.stringify(seller);
};
export function loadFromLocal(id, key, def) {
 let seller = window.localStorage.__seller__;
 if (!seller) {
   return def;
 } else {
   seller = JSON.parse(seller)[id];
   if (!seller) {
     return def;
   } else {
     console.log('sellerkey' + seller[key]);
     return seller[key] || def;
   }
 }
};
