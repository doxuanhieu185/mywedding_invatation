# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page wedding invitation site (Vietnamese, "Xuân Hiểu & Quỳnh Trang"), deployed at https://xuanhieu-quynhtrang.huahua.id.vn/. No build system, package manager, linter, or tests — open `index.html` directly or serve the folder with any static server (e.g. `python -m http.server`).

## Architecture

- `index.html` — the whole page, plus an inline `<script>` at the bottom (~line 202+) for page-specific behavior (music/interaction). Layout is a stack of sections built from layered images.
- `style3.css` — red wedding theme (tokens, cover/door-opening intro, petals, reveal animations); loaded last, overrides the two below. Guest name comes from `?ten=` (also `name`, `to`, `guest`, `khach`) via `js.js` and fills every `[data-guest]`.
- `style.css` / `style2.css` — both are loaded; split by section (`style2.css` holds the invitation/album classes like `.moi_*`, `.img_big`, `.img_small`).
- `js.js` — scroll animations only: IntersectionObserver adds `.show` to `.gt_img` / `.cf_container`; scroll handlers remove `js_left` / `js_right` / `js_center` classes from album images when they enter the viewport (the CSS defines the offscreen start state via those classes).
- `source/` — all assets. `source/img/` = optimized JPG photos (max 1400px, hero/thank-you 1800px, ~100-270KB each), `source/ngang/` = QR codes (`qr_nam.png`, `qr_nu.png`, shown in the `#qrPop` popup), plus `music.mp3`, `meta.jpg`, `favicon.png`, map pins.
- Cache busting is manual: `index.html` references `style.css?v=…`, `style2.css?v=…`, `js.js?v=…`. Bump the version when changing those files.

## Images

Photos are plain JPGs in `source/img/`, referenced directly by `<img>` / CSS `url()`. Keep every photo small (≈1400px longest side, quality ~80): the page used to embed 6-21MB base64 SVGs (351MB total) and failed to load on phones. Do not put original camera JPGs in `source/`. The four landscape album slots all use the same `ngang.jpg` (the originals were duplicates of one photo).

## Repo hygiene

`Anhcuoi_final-…zip` and its extracted folder (~300MB of source photos) are untracked working material, not part of the site — don't commit them or read through them.
