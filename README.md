# SayaxTask Frontend

React + TypeScript ile geliştirilmiş bir arayüzdür.  
Backend API’den alınan faturaları listeler ve her sayaç tipi için kullanılan hesaplama formüllerini gösterir.

---

## Kurulum ve Çalıştırma

### 1. Bağımlılıkları yükle
```bash
  npm install
```
```bash
  npm run dev
```

Uygulama varsayılan olarak http://localhost:5183 adresinde çalışır.

Not: .env dosyasında bulunan VITE_API_BASE değişkeni ile backend portu değiştirilebilir.

## Özellikler
- Fatura Listesi: Sayaç bazlı faturaları tabloda gösterir. 
- Formül Özeti: Tablo altında S1, S2 ve S3 sayaç tiplerinin hesaplama adımlarını açıklar.
- Belediyelere ödenen BTV tutarlarını gösterir.
- Hata / Yükleniyor Ekranı: API erişiminde durum bilgisi verir.

## Endpoint'ler
- http://localhost:5173/invoices
- http://localhost:5173/municipalities