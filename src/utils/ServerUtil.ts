function getServerURL() {
  let proxyList = import.meta.env.VITE_PROXY;
  if (typeof proxyList === 'string') {
    proxyList = JSON.parse(proxyList);
  }
  const apiUrl = import.meta.env.VITE_GLOB_API_URL;
  for (const [prefix, target] of proxyList) {
    if (apiUrl === prefix) {
      return target;
    }
    throw new Error('服务器未找到');
  }
}
export const serverURL = getServerURL();
