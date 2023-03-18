export default function getParamsFromUrl(url) {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};
  params.forEach((value, key) => {
    if (!result[key]) {
      result[key] = value;
    } else if (Array.isArray(result[key])) {
      result[key].push(value);
    } else {
      result[key] = [result[key], value];
    }
  });
  return result;
}
