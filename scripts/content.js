window.addEventListener('message', (event) => {
  if (event.data?.cmd === 'organizationId') {
    chrome.runtime.sendMessage({ cmd: 'setOrganizationId', data: event.data });
  }
});