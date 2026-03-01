async function getCookieValues() {
  const authToken = await chrome.cookies.get({
    name: "s2_utoken",
    url: "https://app.salesys.se/"
  });

  const userId = await chrome.cookies.get({
    name: "s2_uid",
    url: "https://app.salesys.se/"
  });

  return {
    authToken: authToken ? `Bearer ${authToken.value}` : null,
    userId: userId.value
  };
}

let organizationId = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.cmd === 'getCookies') {
    getCookieValues()
      .then(value => sendResponse({ value }))
      .catch(err => {
        console.error('Error getting cookie: ', err);
        sendResponse({ value: null });
      });

    return true;
  }

  if (msg && msg.cmd === 'getLocalStorage') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs) {
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => localStorage.getItem("currentProjectId")
      }).then((results) => {
        const projectId = results[0].result;
        sendResponse({
          value: {
            projectId
          }
        });
      }).catch(err => {
        console.error("Error reading localStorage value:", err);
        sendResponse({ value: null });
      });
    });

    return true;
  }

  if (msg && msg.cmd === 'copyProjectId') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs) {
        sendResponse({ value: null });
        return;
      }
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => localStorage.getItem("currentProjectId")
      }).then((results) => {
        const projectId = results[0].result;
        sendResponse({
          value: projectId
        });
      }).catch(err => {
        console.error("Error reading localStorage value:", err);
        sendResponse({ value: null });
      });
    });

    return true;
  }

  if (msg && msg.cmd === 'copyAuthToken') {
    getCookieValues()
      .then(value => sendResponse({ value: value.authToken }))
      .catch(err => {
        console.error('Error copying cookie: ', err);
        sendResponse({ value: null });
      });

    return true;
  }

  if (msg && msg.cmd === 'copyUserId') {
    getCookieValues()
      .then(value => sendResponse({ value: value.userId }))
      .catch(err => {
        console.error('Error copying cookie: ', err);
        sendResponse({ value: null });
      });

    return true;
  }

  if (msg.cmd === 'setOrganizationId') {
    organizationId = msg.data;
    sendResponse(null);
  }

  if (msg.cmd === 'getOrganizationId') {
    sendResponse({ value: organizationId.data });
    return true;
  }
});