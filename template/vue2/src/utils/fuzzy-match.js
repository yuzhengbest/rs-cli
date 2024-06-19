import pinyin from 'pinyin';
export function fuzzyMatch(key = 'label', value = '', data = {}) {
  if (!value) return true;
  const _data = data[key] || '';
  const _pinyin =
    pinyin(_data, {
      style: pinyin.STYLE_NORMAL,
    }) + '';
  const _lowerValue = value.toLocaleLowerCase();
  return (
    !!~_data.toLocaleLowerCase().indexOf(_lowerValue) || // 忽略大小写
    !!~_pinyin.replace(/,/g, '').indexOf(_lowerValue)
  );
}

/*
 * 过滤树节点
 */
export function getFilterNodeMethods(key = 'label') {
  return function (value, data, node) {
    const { parent } = node || {};
    return fuzzyMatch(key, value, data) || fuzzyMatch(key, value, parent?.data);
  };
}
