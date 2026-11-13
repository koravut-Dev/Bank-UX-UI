# Extra styles

Each style here is its **own** style. The Bank style (`../identity.css`) is untouched and is only the default when nobody asks for another look.
These files sit on `base.css`, a **neutral** base with no Bank signature: no lime accent, no Space Grotesk/IBM Plex, no hard-offset shadow,
no sink-into-shadow press, no highlighter band, no `.id-*` classes. Only the **locked rules** are built in. Everything that gives a look
(palette, fonts, shape, shadow, button motion, how one word is emphasised) is declared by the style file itself.

## How to use

1. Copy `base.css` and the chosen `<style>.css` into the project (base first, style second). Classes: `.ui-btn`, `.ui-btn--primary`, `.ui-card`, `.ui-input`, `.ui-mark`, `.ui-credit`.
2. Load the fonts with the ready-made "Font link" at the top of the style file (all Thai-capable for body and display unless the caution says otherwise). Copy it as it is: it requests only the weights each family has.
3. Run `node <skill-folder>/scripts/check-theme.mjs <path of your copy of the style file>`. The copy can sit in any folder; the checker recognises a style by its `--mark-kind` token and uses the skill's `base.css`. It must print "all locked rules pass". If it fails, fix the tokens in your copy of the style file, never in `base.css` or the skill's own assets, rerun, and tell the user what changed.
4. Say in the answer which style was used and note its caution line. These are token approximations that stay accessible, not exact copies of the originals
   (for example neumorphism gets a thin visible border).

## The Bank layer (optional add-on, `bank-layer.css`)

The 38 styles are the universal, named styles. The Bank look is **not** a style here: it is a small add-on that goes on top of any of them to show
"this is our site/system" while the page keeps the style's own look. Load order: `base.css`, one style, then `bank-layer.css`.
Use it only when the user asks for Bank branding (or their own system's branding) on a named style; never add it by default.
"Bank branding", "Bank signature" or "ลายเซ็น Bank" means this layer, not the credit.
It only adds: the brand accent on text selection and the credit logo, `.bank-mark` (the Bank highlighter for the one emphasis word; when the layer is loaded use it instead of `.ui-mark`), `.bank-stripe` (thin bar at the very top of the page, added by default when the layer is loaded) and `.bank-tag` (small chip, only next to a logo or system name; Latin text only). Check your copy of `bank-layer.css` with `check-theme.mjs` as well.
It never touches fonts, shapes, shadows or motion, and it does not restyle `.ui-mark`; `.bank-mark` replaces its use. The Bank-only parts (hard-offset shadow, sink-into-shadow press, Space Grotesk/IBM Plex) stay in `../identity.css`.
To brand another system change the 3 tokens at the top of `bank-layer.css`; the checker verifies the brand pair. The "Designed by Bank" credit and `<meta name="author" content="Bank">` are added only when the user asks for them; without this layer the credit logo takes the style's own accent.

## What every style declares for itself

- **Palette** for light and dark (own accent, own neutrals) and a `--mark-kind` word emphasis (`band | block | brush | thick | wavy | double | outline | circle | pill | color | gradient | serif | bold`)
- **Fonts**: display, body and mono, with a Thai-capable face for body and display
- **Shape and shadow**: radius, border width, full box-shadow values, and the button motion (sink / lift / tint / own)

## What is locked in every style

Checked by the script: contrast (text 4.5:1, borders/focus 3:1, the emphasis kind's own pairs), targets >= 44px, a real dark theme with both dark blocks identical.
Locked but not checked by the script (check by eye): the focus ring stays 3px with 3px offset, one dominant primary action, meaning never by color alone, `prefers-reduced-motion` respected. See `../../references/identity.md` ("Customizing the style").

## Catalogue (41 entries: the 38 universal styles plus the Bank identity and its two themes)

File paths are relative to this folder; the three `../` entries are the Bank identity and its themes, which use `../identity.css` as their base, not `base.css`.

### สไตล์ UI/เว็บ

| File | Style | Look | Word emphasis | Button motion | Covers | You still add | Caution |
|---|---|---|---|---|---|---|---|
| `../identity.css` | **Neo-brutalism** (สไตล์ Bank ดั้งเดิม) | ขอบหนาสีหมึก เงาแข็งออฟเซ็ต สีเลมอนบนกระดาษอุ่น กดแล้วจมลงเงา | แบบ Bank | แบบ Bank | สไตล์เริ่มต้นของสกิล ใช้ไฟล์ assets/identity.css ได้เลย ไม่ต้องมีไฟล์ธีมเพิ่ม | ไม่ต้องเพิ่ม | งานธนาคาร การเงิน การแพทย์ หรือกฎหมาย ให้ใช้ corporate-calm แทน |
| `../themes/sunset.css` | **Sunset** (พระอาทิตย์ตก (ตัวอย่างสลับพาเลตต์)) | โครงสไตล์ Bank เต็มรูปแบบ เปลี่ยนเป็นพาเลตต์ส้มอุ่นบนครีม | แบบ Bank | แบบ Bank | ตัวอย่างการสลับพาเลตต์โดยคงเงาแข็งและการกดจมลง | ไม่ต้องเพิ่ม | ไม่ใช่สไตล์ที่มีชื่อในวงการ เป็นธีมตัวอย่างที่ทำไว้ก่อนหน้า |
| `minimalism.css` | **Minimalism** (มินิมอล) | ขาว-ดำ เส้นบาง ว่างมาก ไม่มีเงา ตัดทุกอย่างที่ไม่จำเป็น | thick | ปรับความสว่างเบา ๆ | พื้นขาว ปุ่มดำล้วน ขอบ 1px ไม่มีเงา น้ำหนักหัวข้อ 600 | ต้องจัดหน้าให้มีพื้นที่ว่างมากเอง (ธีมคุมแค่โทเคน) | ขอบสีเทากลาง 3:1 ซึ่งเข้มกว่าแนวมินิมอลปกติที่ใช้ขอบจางมาก เพราะกฎ WCAG 1.4.11 |
| `flat.css` | **Flat design** (แฟลต) | สีทึบ ไม่มีเงาและมิติ ขอบบาง ปุ่มสีน้ำเงินสด | color | ปรับความสว่างเบา ๆ | สีทึบ มุม 4px ขอบ 1px ไม่มีเงา ปุ่มหลักน้ำเงิน | ไม่ต้องเพิ่ม | ไม่มี |
| `material.css` | **Material Design** (แมทีเรียล) | ชั้นและเงานุ่มแบบ Google สีม่วงอ่อน มุมโค้งกลาง ปุ่มยกขึ้นเมื่อ hover | pill | ยกขึ้นเมื่อ hover | เงาหลายชั้น มุม 12px พาเลตต์ม่วง ไม่มีเงาแข็ง | state layer และ ripple ต้องเขียนเอง | ธีมนี้ลอกลักษณะ ไม่ใช่ Material 3 เต็มรูปแบบ |
| `skeuomorphism.css` | **Skeuomorphism** (สเกอูมอร์ฟิซึม) | เลียนของจริง ปุ่มนูนไล่สี เงาซ้อน พื้นกระดาษหนัง | block | แบบเฉพาะสไตล์ (เงานูน/จม) | ไล่สีปุ่มและการ์ด เงานูน (inset highlight) โทนหนังและทอง | พื้นผิวภาพ (หนัง ไม้ โลหะ) ต้องใส่เป็นรูปเอง | ไล่สีทุกจุดต้องผ่านคอนทราสต์ ตัวตรวจเช็กทุกสีหยุดของการไล่สี |
| `neumorphism.css` | **Neumorphism (Soft UI)** (นิวมอร์ฟิซึม) | องค์ประกอบนูนและจมจากพื้นสีเดียวกัน เงาสองด้านสว่างกับมืด | bold | แบบเฉพาะสไตล์ (เงานูน/จม) | เงาคู่สว่าง/มืด พื้นและการ์ดสีเดียวกัน กดแล้วจมเข้าไป | ไม่ต้องเพิ่ม | สไตล์นี้ปกติคอนทราสต์ต่ำมาก ธีมนี้เพิ่มขอบบาง 1px ที่ผ่าน 3:1 เพื่อให้เห็นขอบองค์ประกอบ จึงดูไม่เนียนเท่าของจริง |
| `glassmorphism.css` | **Glassmorphism** (กลาสมอร์ฟิซึม) | กระจกฝ้าโปร่งแสงเหนือพื้นหลังไล่สี เบลอฉากหลัง ขอบบางสว่าง | gradient | ยกขึ้นเมื่อ hover | การ์ด/ปุ่มโปร่งแสง backdrop blur พื้นหลังไล่สีหลายจุด | ฉากหลังต้องมีสีหรือภาพให้เบลอ ถ้าพื้นเรียบจะดูเหมือนการ์ดธรรมดา | โปร่งแสงทำให้คอนทราสต์ผันผวนตามฉากหลัง ตัวตรวจเช็กเฉพาะสีพื้นหลังเลวร้ายที่สุดที่ประกาศไว้ใน --surface |
| `claymorphism.css` | **Claymorphism** (เคลย์มอร์ฟิซึม) | ก้อนดินเหนียวสามมิติ มุมกลมมาก เงาในและนอกนุ่ม สีพาสเทล | wavy | แบบเฉพาะสไตล์ (เงานูน/จม) | เงาใน-นอกซ้อน มุม 24px สีชมพูพาสเทล | ไอคอนหรือภาพ 3 มิติแบบดินเหนียวต้องใส่เอง | ไม่มี |
| `bento.css` | **Bento grid** (เบนโตะกริด) | การ์ดสี่เหลี่ยมมุมโค้งมากหลายขนาดเรียงเหมือนกล่องเบนโตะ ไม่มีเงา ขอบบาง | pill | ปรับความสว่างเบา ๆ | มุม 24px ขอบ 1px ไม่มีเงา สีเขียวมรกต | ต้องจัดเลย์เอาต์ grid แบบช่องขนาดต่างกันเอง ธีมคุมแค่โทเคน | ไม่มี |
| `oled-dark.css` | **Dark mode / OLED** (โหมดมืดดำสนิท) | พื้นดำสนิทประหยัดจอ OLED ตัวอักษรขาว สีเน้นเขียวสว่าง | color | ปรับความสว่างเบา ๆ | โหมดมืดพื้น #000000 โหมดสว่างแบบกลาง ๆ คู่กัน | ไม่ต้องเพิ่ม | ดำสนิทกับขาวสนิทอาจแสบตา ถ้าใช้นานควรลดความสว่างตัวอักษร |
| `aurora.css` | **Gradient / Aurora / Mesh** (ไล่สีออโรรา) | พื้นหลังไล่สีหลายจุดคล้ายแสงเหนือ ปุ่มหลักไล่สีม่วง-น้ำเงิน | gradient | ยกขึ้นเมื่อ hover | พื้นหลัง mesh gradient ปุ่มหลักไล่สี มุม 16px | ไม่ต้องเพิ่ม | ตัวอักษรต้องผ่านคอนทราสต์บนทุกสีหยุดของไล่สี ตัวตรวจเช็กให้ |
| `isometric.css` | **Isometric** (ไอโซเมตริก) | องค์ประกอบดูหนาเป็นแท่ง เงาเป็นขั้นบันไดทแยงให้ความรู้สึกสามมิติเทียม | block | แบบเฉพาะสไตล์ (เงานูน/จม) | เงาซ้อนหลายชั้นทแยงเหมือนความหนา กดแล้วยุบลงชั้นเดียว | ภาพประกอบไอโซเมตริกต้องวาดหรือใส่เอง | ไม่มี |
| `spatial.css` | **Spatial / 3D (visionOS)** (สเปเชียล) | แผงกระจกโค้งมนมากลอยเหนือฉากหลัง เงาลึกนุ่ม แสงขอบด้านบน | color | แบบเฉพาะสไตล์ (เงานูน/จม) | มุม 28px กระจกฝ้า เงาลึก แสงขอบบน ฟอนต์ Noto Sans Thai | ฉากหลัง 3 มิติและการเคลื่อนไหวเชิงลึกต้องทำเอง | เหมือน glassmorphism: ตัวตรวจเช็กเฉพาะสีพื้นเลวร้ายที่สุดใน --surface |
| `typography-led.css` | **Typography-led / Kinetic type** (ตัวอักษรเป็นพระเอก) | ขาว-ดำคมชัด หัวข้อใหญ่หนาตัวพิมพ์ใหญ่ สีเน้นส้มแดงจุดเดียว | block | ปรับความสว่างเบา ๆ | หัวข้อตัวหนาพิเศษพิมพ์ใหญ่ ขอบ 2px ไม่มีมุมโค้ง ไม่มีเงา | การเคลื่อนไหวของตัวอักษร (kinetic) ต้องเขียน animation เอง และต้องเคารพ prefers-reduced-motion | พิมพ์ใหญ่มีผลกับตัวอักษรละติน ภาษาไทยไม่มีตัวพิมพ์ใหญ่ ฟอนต์หัวข้อ Anton ไม่มีอักษรไทย จะใช้ Kanit แทน |
| `line-art.css` | **Line art / Outline** (ลายเส้น) | เส้นขอบเป็นพระเอก พื้นโปร่ง ไม่มีเงา ใช้สีเหลืองเป็นจุดเน้น | outline | ปรับความสว่างเบา ๆ | ขอบ 2px มุมกลม ไม่มีเงา พื้นครีม | ไอคอนและภาพประกอบแบบเส้นต้องใส่เอง | ไม่มี |
| `hand-drawn.css` | **Hand-drawn / Organic** (วาดมือและออร์แกนิก) | มุมไม่สมมาตรเหมือนวาดมือ เงาเอียงเล็กน้อย โทนกระดาษและเขียวอ่อน | circle | กดจมลงเงาแข็ง | มุมโค้งไม่เท่ากัน ฟอนต์หัวข้อลายมือที่มีอักษรไทย (Itim) เงา 3px | ภาพวาดมือและลายเส้นไม่เรียบต้องใส่เอง | ไม่มี |
| `playful.css` | **Playful / Cartoon** (สนุกสนานแบบการ์ตูน) | ขอบหนา 3px เงาแข็งสีเด่น สีชมพูสด ฟอนต์กลมน่ารัก | wavy | กดจมลงเงาแข็ง | ขอบหนา เงา 5px มุม 20px สีชมพูบนครีม | ตัวการ์ตูนและภาพประกอบต้องใส่เอง | คล้าย neo-brutalism แต่โค้งและสดกว่า |

### ย้อนยุคและ subculture

| File | Style | Look | Word emphasis | Button motion | Covers | You still add | Caution |
|---|---|---|---|---|---|---|---|
| `y2k.css` | **Y2K / Frutiger Aero** (วายทูเค) | ปี 2000 พื้นฟ้าใส ปุ่มแวววาวไล่สี มุมกลมมาก เงาสะท้อนแสง | gradient | แบบเฉพาะสไตล์ (เงานูน/จม) | ปุ่มไล่สีมันวาว พื้นหลังท้องฟ้า เงาฟ้า | ฟองอากาศ ใบหญ้า ภาพถ่ายธรรมชาติแบบ Aero ต้องใส่เอง | ปุ่มมันวาวต้องผ่านคอนทราสต์ทุกสีหยุด ซึ่งจำกัดให้ใช้ฟ้าอ่อนเท่านั้น |
| `synthwave.css` | **Retro / Vaporwave / Synthwave** (ซินธ์เวฟ) | นีออนชมพู-ฟ้าอมเขียวยุค 80 เงาแข็งสีชมพู ตัวพิมพ์ใหญ่ | outline | กดจมลงเงาแข็ง | พาเลตต์ vaporwave โหมดสว่าง และ synthwave โหมดมืด เงาแข็งชมพู | ตารางเส้นพื้น พระอาทิตย์ และกริดนีออนต้องทำเอง | ฟอนต์หัวข้อ Orbitron ไม่มีอักษรไทย ภาษาไทยใช้ Chakra Petch แทน |
| `cyberpunk.css` | **Cyberpunk** (ไซเบอร์พังก์) | พื้นดำน้ำเงินเข้ม นีออนเหลืองกับชมพู มุมเหลี่ยม เงาแข็งสีฟ้านีออน | block | กดจมลงเงาแข็ง | พาเลตต์นีออนบนพื้นมืด ขอบ 2px เหลี่ยม ตัวพิมพ์ใหญ่ | เอฟเฟกต์ glitch และสแกนไลน์ต้องทำเอง | เอฟเฟกต์กะพริบต้องไม่เกิน 3 ครั้งต่อวินาที (WCAG 2.3.1) |
| `terminal.css` | **Terminal (hacker)** (เทอร์มินัล) | ตัวอักษรเขียวบนพื้นดำ ฟอนต์โมโนสเปซ ไม่มีมุมโค้ง ไม่มีเงา | block | ปรับความสว่างเบา ๆ | ฟอนต์โมโนสเปซทั้งหน้า สีเขียวเทอร์มินัลโหมดมืด และกระดาษเขียวอ่อนโหมดสว่าง | เคอร์เซอร์กะพริบและเอฟเฟกต์พิมพ์ทีละตัวต้องทำเอง | ฟอนต์โมโนที่เลือกไม่มีอักษรไทย ภาษาไทยใช้ Sarabun แทน |
| `pixel.css` | **Pixel art / 8-bit** (พิกเซล 8 บิต) | ขอบหนา 4px มุมเหลี่ยม เงาแข็ง ฟอนต์พิกเซล สีเหลืองเกม | block | กดจมลงเงาแข็ง | ขอบ 4px เงา 4px เหลี่ยม ฟอนต์หัวข้อพิกเซล | สไปรต์ ไอคอนพิกเซล และ image-rendering: pixelated ต้องใส่เอง | ฟอนต์ Press Start 2P ไม่มีอักษรไทยและอ่านยากเมื่อตัวเล็ก ใช้กับหัวข้อสั้นเท่านั้น |
| `memphis.css` | **Memphis** (เมมฟิส) | สีสดจัดจ้าน ลายจุด เงาแข็งสีเขียวน้ำทะเล ขอบหนา | brush | กดจมลงเงาแข็ง | ขอบ 3px เงาเขียวทีล พื้นลายจุดอ่อน สีชมพูสด | รูปทรงเรขาคณิตลอยและลายซิกแซกต้องใส่เอง | ลายจุดต้องจางเพียงพอไม่รบกวนการอ่าน ธีมนี้ใช้จุดสีส้มอ่อนมาก |
| `anti-design.css` | **Anti-design** (แอนตี้ดีไซน์) | ดิบ จงใจฝืนกฎความสวย เหลืองกับชมพูแสบตา ฟอนต์มีเชิงปนโมโน ขอบหนา | double | ปรับความสว่างเบา ๆ | สีขัดกันแต่ยังผ่านคอนทราสต์ ขอบ 3px เหลี่ยม ฟอนต์ Times กับ Space Mono | การจัดวางที่ผิดกริดโดยตั้งใจต้องทำเอง | แนวนี้ชอบฝืนกฎใช้งานง่าย ธีมนี้ฝืนได้แค่ด้านหน้าตา ส่วนคอนทราสต์ ขนาดเป้า และ focus ยังถูกล็อกไว้ |

### สไตล์เชิงองค์กร

| File | Style | Look | Word emphasis | Button motion | Covers | You still add | Caution |
|---|---|---|---|---|---|---|---|
| `../themes/corporate-calm.css` | **Corporate / Enterprise** (องค์กรเรียบนิ่ง) | โครงเดียวกับสไตล์ Bank แต่ไม่มีเงาแข็ง ขอบบาง สีน้ำเงินสงบ | บล็อกทึบ (.id-mark) | ยกขึ้นเมื่อ hover ไม่ขยับตอนกด | พาเลตต์น้ำเงิน-กรมท่า ขอบ 1px มุม 8px ไม่มีเงา โหมดมืดน้ำเงินเข้ม | ไม่ต้องเพิ่ม | สกิลใช้ธีมนี้กับงานธนาคาร การเงิน การแพทย์ และกฎหมาย (ไม่รวมเวลเนส ฟิตเนส ความงาม) |
| `swiss.css` | **Swiss / International Typographic** (สวิส) | ตารางเป๊ะ ตัวอักษรไร้เชิงหนา ขาว-ดำ เน้นสีแดงสวิสจุดเดียว ไม่มีเงา | block | ปรับความสว่างเบา ๆ | ขอบ 1px เหลี่ยม ไม่มีเงา แดงสวิสบนขาว | ต้องจัดหน้าตามกริดและจัดชิดซ้ายเอง | ไม่มี |
| `editorial.css` | **Editorial / Magazine** (บรรณาธิการ/นิตยสาร) | ฟอนต์มีเชิงสำหรับหัวข้อและเนื้อความ พื้นกระดาษอุ่น สีแดงอิฐ มุมแทบไม่โค้ง | serif | ปรับความสว่างเบา ๆ | ฟอนต์เซอริฟไทยและละติน พาเลตต์กระดาษและแดงอิฐ ไม่มีเงา | การจัดคอลัมน์ drop cap และภาพขนาดใหญ่ต้องทำเอง | ไม่มี |

### ขบวนการศิลปะและการออกแบบ

| File | Style | Look | Word emphasis | Button motion | Covers | You still add | Caution |
|---|---|---|---|---|---|---|---|
| `art-nouveau.css` | **Art Nouveau** (อาร์ตนูโว) | เส้นโค้งอ่อนช้อยแบบธรรมชาติ สีเขียวเสจกับทองน้ำตาล มุมโค้งสลับขนาด | serif | กดจมลงเงาแข็ง | มุมโค้งไม่สมมาตร เงาสีทองน้ำตาล พาเลตต์เสจและครีม ฟอนต์เซอริฟบาง | ลายเถาวัลย์และกรอบประดับต้องใส่เอง | ฟอนต์ Cormorant Garamond ไม่มีอักษรไทย ใช้ Taviraj แทน |
| `art-deco.css` | **Art Deco** (อาร์ตเดโค) | ดำกับทอง เรขาคณิตสมมาตร เส้นขอบซ้อนสองชั้น ตัวพิมพ์ใหญ่หรูหรา | double | แบบเฉพาะสไตล์ (เงานูน/จม) | เส้นขอบทองซ้อนสองชั้นแทนเงา ไม่มีมุมโค้ง ตัวพิมพ์ใหญ่ ฟอนต์ Cinzel | ลายพัด ลายแสงอาทิตย์ และกรอบมุมต้องใส่เอง | ฟอนต์ Cinzel ไม่มีอักษรไทย ใช้ Mitr แทน |
| `bauhaus.css` | **Bauhaus** (เบาเฮาส์) | สีปฐมภูมิ แดง-น้ำเงิน-เหลือง เรขาคณิตล้วน ขอบหนา เงาแข็งสีน้ำเงิน | block | กดจมลงเงาแข็ง | ปุ่มแดง เงาน้ำเงิน ขอบ 3px เหลี่ยม ฟอนต์เรขาคณิต | รูปทรงวงกลม สามเหลี่ยม สี่เหลี่ยม เป็นองค์ประกอบกราฟิกต้องใส่เอง | ไม่มี |
| `de-stijl.css` | **De Stijl** (เดอสไตล์) | เส้นดำหนาตั้งฉาก พื้นขาว สีปฐมภูมิน้ำเงินเป็นจุดเน้น ไม่มีเงาและมุมโค้ง | outline | ปรับความสว่างเบา ๆ | ขอบดำหนา 4px เหลี่ยม ไม่มีเงา ปุ่มน้ำเงินเข้ม | บล็อกสีแดง เหลือง น้ำเงินแบบ Mondrian เป็นกราฟิกต้องทำเอง | ไม่มี |
| `constructivism.css` | **Constructivism** (คอนสตรัคติวิสต์) | แดง-ดำ-ครีม เส้นหนาเด็ดขาด ตัวพิมพ์ใหญ่หนัก สไตล์โปสเตอร์โซเวียต | block | ปรับความสว่างเบา ๆ | ขอบหนา 3px เหลี่ยม ตัวพิมพ์ใหญ่หนัก ฟอนต์ Oswald | เส้นทแยงและรูปทรงเอียงเป็นกราฟิกต้องทำเอง | ฟอนต์ Oswald ไม่มีอักษรไทย ใช้ Mitr แทน |
| `modernism.css` | **Modernism** (โมเดิร์นนิสม์) | ใช้งานนำความงาม เทาอุ่นกับน้ำเงินใช้งาน เหลี่ยมนุ่ม ไม่ประดับ | thick | ปรับความสว่างเบา ๆ | ขอบบาง ไม่มีเงา น้ำเงินเข้มบนกระดาษอุ่น | ไม่ต้องเพิ่ม | ใกล้เคียง flat และ swiss แต่โทนอุ่นกว่า |
| `postmodernism.css` | **Postmodernism** (โพสต์โมเดิร์น) | ผสมสีและรูปทรงขัดกันอย่างตั้งใจ มุมสลับ เงาสีม่วง ฟอนต์หน้ากว้างหนา | brush | กดจมลงเงาแข็ง | มุมโค้งสลับเหลี่ยม เงาแข็งสีม่วง พื้นโทนครีมกับเขียวอมฟ้า | ลวดลายและวัสดุผสมต้องใส่เอง | ฟอนต์ Abril Fatface ไม่มีอักษรไทย ใช้ Mitr แทน |
| `mid-century.css` | **Mid-century modern** (มิดเซ็นจูรีโมเดิร์น) | ส้มไหม้กับทีลบนครีม มุมโค้งปานกลาง ฟอนต์เซอริฟหนาย้อนยุค | circle | กดจมลงเงาแข็ง | พาเลตต์ส้มไหม้-ทีล เงาทีล มุม 14px ฟอนต์ DM Serif Display | ลายบูมเมอแรงและรูปทรงอะตอมต้องใส่เอง | ฟอนต์ DM Serif Display ไม่มีอักษรไทย ใช้ Pridi แทน |
| `scandinavian.css` | **Scandinavian** (สแกนดิเนเวียน) | ขาวนวล เทาอุ่น เขียวทีลสงบ เงาเบามาก ไม่รก | color | ยกขึ้นเมื่อ hover | ขอบบาง เงาเบา สีเขียวทีลเข้มบนขาวนวล | ไม่ต้องเพิ่ม | ใกล้ minimalism แต่อุ่นและนุ่มกว่า |
| `japandi.css` | **Japandi** (จาปันดี) | ผสมความเรียบแบบญี่ปุ่นกับอบอุ่นแบบสแกนดิเนเวีย สีไม้ ครีม ฟอนต์เซอริฟบาง | thick | ปรับความสว่างเบา ๆ | โทนไม้และครีม มุมเล็ก ขอบบาง ฟอนต์เซอริฟไทย | ภาพวัสดุธรรมชาติต้องใส่เอง | ไม่มี |
| `wabi-sabi.css` | **Wabi-sabi** (วาบิซาบิ) | ความงามของความไม่สมบูรณ์ สีดินและกระดาษเก่า มุมไม่เท่ากัน เงาบางเหมือนรอยรอง | brush | แบบเฉพาะสไตล์ (เงานูน/จม) | มุมโค้งไม่สมมาตร เงาบาง สีน้ำตาลดินบนกระดาษเก่า | พื้นผิวกระดาษ รอยด่าง ต้องใส่เป็นรูปเอง | ไม่มี |
| `pop-art.css` | **Pop art** (ป๊อปอาร์ต) | ขอบดำหนา สีแดงเหลืองสด ลายจุดฮาล์ฟโทน เงาแข็งดำ ตัวพิมพ์ใหญ่หนัก | block | กดจมลงเงาแข็ง | ขอบ 4px เงา 6px พื้นเหลืองลายจุดชมพู ตัวพิมพ์ใหญ่ | ภาพฮาล์ฟโทนและกรอบคำพูดต้องใส่เอง | ฟอนต์ Bangers ไม่มีอักษรไทย ใช้ Mali แทน ลายจุดต้องจางไม่รบกวนการอ่าน |
| `surrealism.css` | **Surrealism** (เซอร์เรียลลิซึม) | พื้นหลังไล่สีเหมือนความฝัน มุมโค้งไม่สมมาตร ม่วงเข้มกับส้มพีช | gradient | กดจมลงเงาแข็ง | พื้นหลังไล่สีพีช-ลาเวนเดอร์-ฟ้า มุมแปลก เงาแข็งสีพีช ฟอนต์เซอริฟตัวหนา | ภาพตัดต่อแปลกตาและวัตถุลอยต้องใส่เอง | ฟอนต์ Playfair Display ไม่มีอักษรไทย ใช้ Maitree แทน |

Not tokens-only (needs real assets or motion, so the style files only give palette, shape, shadow, fonts and emphasis): Skeuomorphism textures, Isometric and Spatial/3D illustration,
Kinetic typography animation, Pixel-art sprites, Hand-drawn linework, Surreal imagery.
