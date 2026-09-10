const form = document.querySelector('.iletisim-formu');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.innerText;
  
  btn.innerText = 'Gönderiliyor...';
  btn.disabled = true;

  const data = new FormData(form);
  
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.innerText = '✓ Mesajınız Başarıyla İletildi!';
      btn.style.backgroundColor = '#1b5e20';
      form.reset();
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Hata oluştu');
    }
  } catch (error) {
    btn.innerText = '❌ Hata Oluştu, Tekrar Deneyin';
    btn.disabled = false;
  }
});