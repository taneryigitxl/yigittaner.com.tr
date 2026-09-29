# Bizim Hikâyemiz

GitHub Pages üzerinde çalışan, tamamen statik bir anı sitesi. Başlangıç tarihi **07.02.2024**. Yayın adresi `yigittaner.com.tr` (`CNAME` dosyası hazırdır).

## Düzenleme rehberi

- **Fotoğraflar:** Dosyalar `assets/photos/` içinde. Galerinin sırası, açıklamaları ve erişilebilirlik metinleri `js/main.js` içindeki `photos` dizisinde. Her fotoğrafa isteğe bağlı `date`, `location` ve `note` alanları eklenebilir; bilinmeyen tarihler boş bırakılmıştır. Geniş açılış fotoğrafı `css/style.css` içindeki `.hero-photo`, final fotoğrafı `.final-section` arka planından değiştirilebilir. Sayfa içindeki özel fotoğraflar `index.html` içinde seçilmiştir.
- **Mektup metni:** `index.html` içinde `<!-- MEKTUP METNİNİ BURADAN DEĞİŞTİR -->` yorumunu bulun.
- **Timeline / anılar:** `js/main.js` içindeki `timelineEvents` dizisine `{ date, title, description, photo }` nesnesi ekleyin. `photo` isteğe bağlıdır.
- **Başlangıç tarihi:** 07 Şubat 2024, İstanbul saatiyle 00:00:00. `js/main.js` içindeki `START_DATE` giriş cevabı, canlı sayaç, tamamlanan gün sayısı ve gün sırasının kaynağıdır. Sayfada ve sosyal paylaşım verilerinde görünen tarih de 07.02.2024'tür.
- **Müzik:** İsteğe bağlı müzik dosyasını `assets/audio/` içine koyup `js/main.js` içindeki `MUSIC_SRC` değerine yolunu yazın. Dosya tanımlanınca müzik butonu görünür; ses yalnızca dokunma veya tıklamayla başlar.
- **Giriş durumunu hatırlama:** Giriş mektubu her ziyarette yeniden görünür (`REMEMBER_ENTRY = false`). Bir kez açıldıktan sonra sonraki ziyaretlerde doğrudan siteye geçilmesini isterseniz bu değeri `true` yapın.
- **Ana metinler:** `index.html` içindeki `<!-- ANA METİNLERİ BURADAN DEĞİŞTİR -->` yorumundan başlayın.

## Fotoğraf eşlemesi

`ani-01.jpeg`–`ani-20.jpeg`, kullanıcı tarafından sağlanan fotoğrafların mesajdaki sırasıyla kopyalarıdır. Yeni fotoğraf eklerken dosyayı `assets/photos/` içine koyup `photos` dizisine eklemek yeterlidir; kaydırılabilir film şeridi ve tam ekran görüntüleyici otomatik güncellenir.

## Yerelde açma

`index.html` dosyasını tarayıcıda açın. GitHub Pages için ek derleme veya backend gerekmez.

Tarih ekranı yalnızca sürpriz amaçlıdır; tarayıcı tarafında çalıştığından güvenlik veya erişim kontrolü sağlamaz.
