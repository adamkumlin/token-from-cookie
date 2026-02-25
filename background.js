async function getCookieValue() {
  const cookie = await chrome.cookies.get({
    name: "s2_utoken",
    url: "https://app.salesys.se/"
  });

  return cookie?.value ? `Bearer ${cookie.value}` : null;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.cmd === 'getCookie') {
    getCookieValue()
      .then(value => sendResponse({ value }))
      .catch(err => {
        console.error('Error getting cookie: ', err);
        sendResponse({ value: null });
      });

    return true;
  }

  if (msg && msg.cmd === 'copyCookie') {
    getCookieValue()
      .then(value => sendResponse({ value }))
      .catch(err => {
        console.error('Error copying cookie: ', err);
        sendResponse({ value: null });
      });

    return true;
  }
});