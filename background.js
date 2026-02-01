let currentSite = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  handleTab(tab);
});

chrome.tabs.onUpdated.addListener((_, __, tab) => {
  if (tab.active) handleTab(tab);
});

function handleTab(tab) {
  if (!tab.url) return;

  const site =
    tab.url.includes("youtube.com")
      ? "youtube"
      : tab.url.includes("instagram.com")
      ? "instagram"
      : null;

  const now = Date.now();

  if (currentSite && startTime) {
    saveTime(currentSite, now - startTime);
  }

  currentSite = site;
  startTime = site ? now : null;
}

function saveTime(site, duration) {
  chrome.storage.local.get([site], (data) => {
    const total = (data[site] || 0) + duration;
    chrome.storage.local.set({ [site]: total });
  });
}
