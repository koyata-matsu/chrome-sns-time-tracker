chrome.storage.local.get(["youtube", "instagram"], (data) => {
  document.getElementById("youtube").textContent = Math.floor(
    (data.youtube || 0) / 60000
  );
  document.getElementById("instagram").textContent = Math.floor(
    (data.instagram || 0) / 60000
  );
});
