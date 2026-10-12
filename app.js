// Service Worker kaydı
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ SW kayıtlı:', reg.scope))
      .catch(err => console.error('❌ SW hatası:', err));
  });
}

// Yükleme butonu (beforeinstallprompt)
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Kullanıcı seçimi:', outcome);
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

// Online/Offline durumu
const statusEl = document.getElementById('onlineStatus');
function updateStatus() {
  statusEl.textContent = navigator.onLine ? '🟢 Çevrimiçi' : '🔴 Çevrimdışı';
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();