document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startBtn');
  const linksInput = document.getElementById('linksInput');
  const statusDiv = document.getElementById('status');

  startBtn.addEventListener('click', async function() {
    const links = linksInput.value
      .split('\n')
      .map(link => link.trim())
      .filter(link => link.length > 0);
    if (links.length < 3) {
      statusDiv.textContent = 'Please enter at least 3 LinkedIn profile links.';
      return;
    }
    statusDiv.textContent = 'Opening profiles...';
    for (let i = 0; i < links.length; i++) {
      statusDiv.textContent = `Opening profile ${i+1} of ${links.length}`;
      chrome.tabs.create({ url: links[i], active: true });
      // Wait a bit before opening the next tab (so user can see)
      await new Promise(res => setTimeout(res, 2000));
    }
    statusDiv.textContent = 'All profiles opened! Please wait for data to be scraped.';
  });
});
