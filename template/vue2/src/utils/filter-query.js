function filterQuery(obj) {
  let nobj = JSON.parse(JSON.stringify(obj));
  for (let key in nobj) {
    if (nobj[key] === undefined || nobj[key] === null || nobj[key] === '') {
      delete nobj[key];
    }
  }
  return nobj;
}
export default filterQuery;
