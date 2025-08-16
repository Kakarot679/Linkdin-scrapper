// Wait 2 seconds to ensure the page is loaded
setTimeout(() => {
  (function() {
    if (!window.location.pathname.startsWith('/in/')) return;

    function getText(selector) {
      const el = document.querySelector(selector);
      return el ? el.innerText.trim() : '';
    }

    // Name
    const name = getText('.text-heading-xlarge') || getText('h1');
    // Location
    const location = getText('.text-body-small.inline.t-black--light.break-words');
    // About (robust: try specific and fallback selectors)
    let about = '';
    const aboutEl = document.querySelector('div.VPGUjaITAfMNgcQBzuQAgrmEYQRKhjcRZzE span[aria-hidden="true"]');
    if (aboutEl) {
      about = aboutEl.innerText.trim();
    } else {
      const aboutSection = Array.from(document.querySelectorAll('section'))
        .find(sec => sec.id && sec.id.toLowerCase().includes('about'));
      if (aboutSection) {
        const aboutSpan = aboutSection.querySelector('span[aria-hidden="true"]');
        if (aboutSpan) {
          about = aboutSpan.innerText.trim();
        } else {
          about = aboutSection.innerText.trim();
        }
      }
    }
    // Bio (summary headline)
    const bio = getText('.text-body-medium.break-words');
    // Follower count (precise selector, fallback to any element with 'follower')
    let followerCount = '';
    const followerLi = document.querySelector('li.text-body-small.t-black--light.inline-block');
    if (followerLi && followerLi.innerText.toLowerCase().includes('follower')) {
      const match = followerLi.innerText.match(/\d+[\d,\+]*\s*followers?/i);
      followerCount = match ? match[0] : followerLi.innerText.trim();
    } else {
      // fallback: look for any element with 'followers'
      const fallback = Array.from(document.querySelectorAll('*')).find(el =>
        el.innerText && el.innerText.toLowerCase().includes('follower')
      );
      if (fallback) {
        const match = fallback.innerText.match(/\d+[\d,\+]*\s*followers?/i);
        followerCount = match ? match[0] : fallback.innerText.trim();
      }
    }
    // Connection count (precise selector, fallback to any element with 'connection')
    let connectionCount = '';
    const connectionSpan = document.querySelector('span[aria-label*="connections"]');
    if (connectionSpan) {
      connectionCount = connectionSpan.innerText.trim();
    } else {
      // fallback: look for any element with 'connections'
      const fallback = Array.from(document.querySelectorAll('*')).find(el =>
        el.innerText && el.innerText.toLowerCase().includes('connection')
      );
      if (fallback) {
        const match = fallback.innerText.match(/\d+[\d,\+]*\s*connections?/i);
        connectionCount = match ? match[0] : fallback.innerText.trim();
      }
    }
    // Bio line (headline under name)
    const bioLine = bio;
    const url = window.location.href;

    // Log scraped data for demo
    console.log('Scraped:', { name, url, about, bio, location, followerCount, connectionCount, bioLine });

    // Only send if name and url are present
    if (!name || !url) return;

    // Send data to backend
    fetch('http://localhost:3001/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url, about, bio, location, followerCount, connectionCount, bioLine })
    });
  })();
}, 2000);
