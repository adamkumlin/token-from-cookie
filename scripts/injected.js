const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const res = await originalFetch(...args);

  if (res.url === "https://app.salesys.se/api/users/organizations-v1/me") {
    const clone = res.clone();
    const data = await clone.json();
    window.postMessage({ cmd: 'organizationId', data: data.id }, '*');
  }

  return res;
}