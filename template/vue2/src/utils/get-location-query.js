import qs from 'qs';
export default function getLocationQuery() {
  const url = decodeURIComponent(window.location);
  return qs.parse(url.split('?')[1]);
}
