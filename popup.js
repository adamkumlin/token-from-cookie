function renderValue(value, containerSelector) {
  if (!value) {
    return;
  }

  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.value = value;
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

    renderValue(response.value.authToken, "#auth-token-value-container");
    renderValue(response.value.userId, "#userid-value-container");
  });

  chrome.runtime.sendMessage({ cmd: "getLocalStorage" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error: ", chrome.runtime.lastError);
      return;
    }

    renderValue(response.value.projectId, "#projectid-value-container");
  });

  chrome.runtime.sendMessage({ cmd: 'getOrganizationId' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error: ", chrome.runtime.lastError);
      return;
    }

    renderValue(response.value, "#organizationid-value-container");
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