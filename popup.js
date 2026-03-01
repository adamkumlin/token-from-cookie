
function renderCookieValues(cookieValues) {
  const authTokenContainer = document.getElementById("auth-token-value-container");
  const userIdContainer = document.getElementById("userid-value-container");
  if (!authTokenContainer || !userIdContainer) {
    return
  };

  authTokenContainer.value = cookieValues.authToken;
  userIdContainer.value = cookieValues.userId;
}

function renderLocalStorageValues(localStorageValues) {
  const projectIdContainer = document.getElementById("projectid-value-container");
  if (!projectIdContainer) {
    return
  };

  projectIdContainer.value = localStorageValues.projectId || '(inget projekt valt)';
}

async function copyValueToClipboard(value) {
  if (!value) {
    return;
  }
  
  const clipboard = navigator.clipboard;
  await clipboard.writeText(value)
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ cmd: 'getCookies' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error: ", chrome.runtime.lastError);
      return;
    }

    renderCookieValues(response.value);
  });

  chrome.runtime.sendMessage({ cmd: "getLocalStorage" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error: ", chrome.runtime.lastError);
      return;
    }

    renderLocalStorageValues(response.value);
  });
});

const copyAuthTokenButton = document.getElementById('copy-auth-token-button');
if (copyAuthTokenButton) {
  copyAuthTokenButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ cmd: 'copyAuthToken' }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error: ", chrome.runtime.lastError);
        return;
      }

      await copyValueToClipboard(response.value);
    });
  });
}

const copyUserIdButton = document.getElementById('copy-userid-button');
if (copyUserIdButton) {
  copyUserIdButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ cmd: 'copyUserId' }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error: ", chrome.runtime.lastError);
        return;
      }

      await copyValueToClipboard(response.value);
    });
  });
}

const copyProjectIdButton = document.getElementById('copy-projectid-button');
if (copyAuthTokenButton) {
  copyProjectIdButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ cmd: 'copyProjectId' }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error: ", chrome.runtime.lastError);
        return;
      }

      await copyValueToClipboard(response.value);
    });
  });
}