# kamilfraczek
Odzyskana wersja projektu ze snapshotu deploymentu Vercel.
## Uruchomienie lokalne
python3 -m http.server 8080
Następnie otwórz `http://127.0.0.1:8080`.

Co zrobiłem

Wygenerowałem projekt Payload i uruchamia się lokalnie na http://localhost:3000 (npm run dev).
Przełączyłem bazę na lokalne SQLite (bez kont klienta i bez chmury) w payload.config.ts.
Dodałem kolekcję stron do migracji treści: Pages.ts.
Dodałem globalne ustawienia strony: SiteSettings.ts.
Ujednoliciłem env pod SQLite: .env i .env.example.
Dopisałem szybki start w README.md.
Jak uruchomić

cd /Users/adamkrukowski/Desktop/WEB/KAMIL/cms
npm run dev
Otwórz http://localhost:3000/admin i utwórz pierwszego admina.
Chcesz, żebym teraz zrobił krok 2: podpięcie Twojego obecnego index.html/portfolio do danych z kolekcji pages (pierwszy ekran migracji)?


