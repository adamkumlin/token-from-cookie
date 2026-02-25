
function renderCookieValue(cookieValue) {
  const container = document.getElementById("cookie-value-container");
  if (!container) {
    return
  };

  container.value = cookieValue;
}

async function copyCookieValueToClipboard(cookieValue) {
  if (!cookieValue) {
    return;
  }

  const clipboard = navigator.clipboard;

  await clipboard.writeText(cookieValue)
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ cmd: 'getCookie' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error: ", chrome.runtime.lastError);
      return;
    }

    renderCookieValue(response.value);
  });
});

const copyButton = document.getElementById('copy-button');
if (copyButton) {
  copyButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ cmd: 'copyCookie' }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error: ", chrome.runtime.lastError);
        return;
      }

      await copyCookieValueToClipboard(response.value);
    });
  });
}