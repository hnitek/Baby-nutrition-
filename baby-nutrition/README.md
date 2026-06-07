# Dzienniczek żywieniowy dla niemowlaka 🍼

Aplikacja React do śledzenia diety 15-miesięcznego dziecka z analizą AI (Claude Haiku).

## Funkcje

- Dodawanie posiłków opisem naturalnym (np. "jajecznica z 3 jajek ze szpinakiem")
- Automatyczna analiza wartości odżywczych przez AI
- Paski postępu z normami dziennymi dla 15-miesięcznika
- Ocena całodniowej diety przez AI
- Podsumowanie tygodniowe
- Historia posiłków w localStorage

---

## Wdrożenie krok po kroku

### 1. Cloudflare Worker (proxy do Anthropic API)

Worker chroni Twój klucz API — przeglądarka nigdy go nie widzi.

**a) Utwórz konto na [cloudflare.com](https://cloudflare.com) (bezpłatne)**

**b) Zainstaluj Wrangler CLI:**
```bash
npm install -g wrangler
wrangler login
```

**c) Utwórz nowy Worker:**
```bash
cd baby-nutrition/worker
wrangler init baby-nutrition-proxy --no-delegate-c3
```
Skopiuj zawartość `worker/index.js` do wygenerowanego pliku.

**d) Dodaj sekret z kluczem Anthropic:**
```bash
wrangler secret put ANTHROPIC_API_KEY
# wpisz swój klucz gdy zapyta: sk-ant-...
```

**e) Wdróż Worker:**
```bash
wrangler deploy
```

Zapisz URL Workera, np. `https://baby-nutrition-proxy.TWOJA-SUBDOMENA.workers.dev`

---

### 2. GitHub Secrets

W swoim repozytorium na GitHub:

1. Przejdź do **Settings → Secrets and variables → Actions**
2. Kliknij **New repository secret**
3. Dodaj sekret:
   - **Name:** `VITE_WORKER_URL`
   - **Value:** URL Twojego Cloudflare Workera (z kroku 1e)

---

### 3. GitHub Pages

1. Przejdź do **Settings → Pages**
2. W sekcji **Source** wybierz: **GitHub Actions**
3. Zapisz ustawienia

Przy następnym push do brancha `main` w folderze `baby-nutrition/` automatycznie uruchomi się build i deploy.

Aplikacja będzie dostępna pod adresem:
`https://TWOJA-NAZWA.github.io/NAZWA-REPO/baby-nutrition/`

---

### 4. Uruchomienie lokalne (opcjonalne)

```bash
cd baby-nutrition
echo "VITE_WORKER_URL=https://twoj-worker.workers.dev" > .env.local
npm install
npm run dev
```

---

## Normy żywieniowe dla 15-miesięcznika

| Składnik    | Norma dzienna |
|-------------|--------------|
| Kalorie     | 1000–1300 kcal |
| Białko      | 13–16 g       |
| Żelazo      | 7 mg          |
| Wapń        | 700 mg        |
| Witamina D  | 15 mcg        |
| Witamina C  | 40 mg         |
| Cynk        | 3 mg          |

---

## Struktura plików

```
baby-nutrition/
├── src/
│   ├── main.jsx      # punkt wejścia React
│   ├── App.jsx       # główny komponent
│   └── api.js        # komunikacja z Cloudflare Worker
├── worker/
│   └── index.js      # Cloudflare Worker (proxy API)
├── index.html
├── vite.config.js
└── package.json

.github/
└── workflows/
    └── deploy.yml    # CI/CD → GitHub Pages
```
