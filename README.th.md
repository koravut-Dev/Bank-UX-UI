<div align="center">

<img src="assets/banner.svg" alt="Bank-UX-UI" width="100%">

<br><br>

<img alt="Agent Skills" src="https://img.shields.io/badge/AGENT%20SKILLS-COMPATIBLE-a855f7?style=for-the-badge&labelColor=0a0a1f">
<img alt="License" src="https://img.shields.io/badge/LICENSE-MIT-22d3ee?style=for-the-badge&labelColor=0a0a1f">
<img alt="Skills" src="https://img.shields.io/badge/SKILLS-1-f472b6?style=for-the-badge&labelColor=0a0a1f">
<img alt="Dependencies" src="https://img.shields.io/badge/DEPENDENCIES-0-34d399?style=for-the-badge&labelColor=0a0a1f">
<a href="https://github.com/koravut-Dev/Bank-UX-UI/tags"><img alt="Version" src="https://img.shields.io/github/v/tag/koravut-Dev/Bank-UX-UI?style=for-the-badge&labelColor=0a0a1f&label=VERSION&color=22d3ee"></a>
<a href="https://github.com/koravut-Dev/Bank-UX-UI"><img alt="Stars" src="https://img.shields.io/github/stars/koravut-Dev/Bank-UX-UI?style=for-the-badge&labelColor=0a0a1f&logo=github&color=a855f7"></a>

<br>

[English](README.md) &nbsp;·&nbsp; **ไทย**

**[สกิล](#skills)** &nbsp;·&nbsp; **[ติดตั้ง](#install)** &nbsp;·&nbsp; **[ทำงานอย่างไร](#how-it-works)** &nbsp;·&nbsp; **[โครงสร้าง](#repo-layout)** &nbsp;·&nbsp; **[ร่วมพัฒนา](#contributing)**

<br>

```bash
npx skills add koravut-Dev/Bank-UX-UI
```

</div>

<!-- skills:start -->
<!-- skills:lang=th -->
<a id="skills"></a>

## สกิล

<table>
<tr>
<td colspan="2" valign="top">

#### bank-ux-ui

Design and review web UI/UX against named rules (Nielsen heuristics, Laws of UX, Norman, Shneiderman, WCAG 2.2, Gestalt, Apple HIG / Material, Core Web Vitals). Applies the auth...

<sub>ลองพิมพ์: <code>Bank</code> · <code>Designed by Bank</code> · <code>ออกแบบ UI</code> · <code>ทำหน้าเว็บ</code></sub>

```bash
npx skills add koravut-Dev/Bank-UX-UI --skill bank-ux-ui
```

</td>
</tr>
</table>

<a id="install"></a>

## ติดตั้ง

> [!TIP]
> คำสั่งเดียวติดตั้งทุกสกิลใน repo นี้ให้ทุก agent ที่ตรวจพบในเครื่อง

```bash
# ทุกสกิลใน repo นี้
npx skills add koravut-Dev/Bank-UX-UI

# เฉพาะสกิลเดียว
npx skills add koravut-Dev/Bank-UX-UI --skill bank-ux-ui
```

<details>
<summary><b>คัดลอกเอง</b></summary>

```bash
git clone https://github.com/koravut-Dev/Bank-UX-UI.git
cp -r Bank-UX-UI/skills/bank-ux-ui ~/.claude/skills/
```

```powershell
Copy-Item -Recurse Bank-UX-UI\skills\bank-ux-ui "$HOME\.claude\skills\"
```

| Agent | ส่วนตัว | ในโปรเจกต์ |
|---|---|---|
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| Codex CLI | `~/.codex/skills/` | `.agents/skills/` |
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Gemini CLI | `~/.gemini/skills/` | `.gemini/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| OpenCode | `~/.config/opencode/skills/` | `.opencode/skills/` |
| อื่นๆ | ดูเอกสารของเครื่องมือ | ดูเอกสารของเครื่องมือ |

</details>

> [!IMPORTANT]
> สกิลทำงานด้วยสิทธิ์เต็มของ agent อ่านสกิลก่อนติดตั้งทุกครั้ง ตำแหน่งโฟลเดอร์และ flag ของ CLI เปลี่ยนได้ตามเวลา ให้ตรวจกับเอกสารล่าสุดของแต่ละเครื่องมือ

<a id="how-it-works"></a>

## ทำงานอย่างไร

```mermaid
flowchart LR
    A[npx skills add] --> B[Clone repo]
    B --> C[Find SKILL.md files]
    C --> D[Install for each agent]
    D --> E[Claude Code]
    D --> F[Codex]
    D --> G[Cursor]
    D --> H[Gemini CLI]
```

<a id="repo-layout"></a>

## โครงสร้าง repo

```text
Bank-UX-UI/
├── README.md
├── README.th.md
├── LICENSE
├── assets/
│   └── banner.svg
└── skills/
    └── bank-ux-ui/SKILL.md
```

ชื่อโฟลเดอร์ของแต่ละสกิลต้องตรงกับ `name` ใน frontmatter ของ `SKILL.md` ตามมาตรฐาน Agent Skills

<a id="contributing"></a>

## ร่วมพัฒนา

1. เพิ่มหรือแก้สกิลใต้ `skills/<name>/SKILL.md`
2. ต้องมี `name` (ตัวพิมพ์เล็กคั่นด้วยขีด และตรงกับชื่อโฟลเดอร์) กับ `description` ใน frontmatter
3. ห้าม commit secret สคริปต์ publish จะสแกนหาให้
4. เปิด pull request
<!-- skills:end -->

<div align="center">

<sub>สร้างด้วยสกิล <code>publish-skill</code> &nbsp;·&nbsp; <a href="#">กลับขึ้นบน ↑</a></sub>

</div>
