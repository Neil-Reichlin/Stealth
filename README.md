[![.github/workflows/build.yml](https://github.com/Neil-Reichlin/split-kb/actions/workflows/build.yml/badge.svg)](https://github.com/Neil-Reichlin/split-kb/actions/workflows/build.yml)


# Stealth
Stealth is a fully custom-built ergonomic split keyboard. This repository provides the adapted ZMK firmware.

![Image20241230111320](https://github.com/user-attachments/assets/ab5ef651-aeae-4d9f-bc3f-bb629c229a5b)


## Usage 
ZMK provides US keycodes by default, and firmware/config is written in terms of them.
This keyboard's default layer instead uses the Swiss German character macros defined in
`include/locale/keys_de_swiss.h` (the `DE_*` codes below), which only produce the correct
character when **your OS's keyboard layout is set to Swiss German** - each macro sends the
raw physical-key code for wherever that character sits on a real Swiss keyboard, and it's
your OS's layout setting that turns that into the right character. If your OS is set to a
plain US layout instead, these keys will type their *US* character (e.g. `DE_MINUS` would
type `/` instead of `-`).

Note that `code_layer` and `bt_layer` in `stealth.keymap` currently use plain US `&kp` codes
(e.g. `&kp AT_SIGN`) rather than the `DE_*` macros, so those two layers assume a US layout and
won't produce the labeled character under a Swiss OS layout.

### Swiss character reference

Use these instead of the plain US `&kp` codes whenever you want the printed Swiss/German
character (with your OS set to a Swiss German layout). Full list in
[`include/locale/keys_de_swiss.h`](include/locale/keys_de_swiss.h).

| Character | ZMK code |
|---|---|
| `ä` | `DE_A_UMLAUT` |
| `ö` | `DE_O_UMLAUT` |
| `ü` | `DE_U_UMLAUT` |
| `à` | `DE_A_GRAVE` |
| `è` | `DE_E_GRAVE` |
| `é` | `DE_E_ACUTE` |
| `ç` | `DE_C_CEDILLA` |
| `¨` (diaeresis) | `DE_UMLAUT` |
| `´` (acute accent) | `DE_ACUTE` |
| `°` | `DE_DEGREE` / `DE_DEG` |
| `§` | `DE_SECTION` / `DE_SECT` |
| `€` | `DE_EURO` |
| `£` | `DE_POUND_SIGN` |
| `¢` | `DE_CENT` |
| `¦` | `DE_BROKEN_BAR` |
| `¬` | `DE_NOT` |
| `~` | `DE_TILDE` |
| `` ` `` | `DE_GRAVE` |
| `^` | `DE_CARET` |
| `\` | `DE_BACKSLASH` / `DE_BSLH` |
| `\|` | `DE_PIPE` |
| `[` | `DE_LEFT_BRACKET` / `DE_LBKT` |
| `]` | `DE_RIGHT_BRACKET` / `DE_RBKT` |
| `{` | `DE_LEFT_BRACE` / `DE_LBRC` |
| `}` | `DE_RIGHT_BRACE` / `DE_RBRC` |
| `@` | `DE_AT_SIGN` / `DE_AT` |
| `#` | `DE_HASH` / `DE_POUND` |
| `$` | `DE_DOLLAR` / `DE_DLLR` |
| `%` | `DE_PERCENT` / `DE_PRCNT` |
| `&` | `DE_AMPERSAND` / `DE_AMPS` |
| `*` | `DE_ASTERISK` / `DE_ASTRK` / `DE_STAR` |
| `+` | `DE_PLUS` |
| `-` | `DE_MINUS` |
| `_` | `DE_UNDERSCORE` / `DE_UNDER` |
| `=` | `DE_EQUAL` |
| `/` | `DE_SLASH` / `DE_FSLH` |
| `!` | `DE_EXCLAMATION` / `DE_EXCL` |
| `?` | `DE_QUESTION` / `DE_QMARK` |
| `"` | `DE_DOUBLE_QUOTES` / `DE_DQT` |
| `'` | `DE_SINGLE_QUOTE` / `DE_SQT` / `DE_APOS` |
| `,` | `DE_COMMA` |
| `.` | `DE_PERIOD` / `DE_DOT` |
| `:` | `DE_COLON` |
| `;` | `DE_SEMICOLON` / `DE_SEMI` |
| `<` | `DE_LESS_THAN` / `DE_LT` |
| `>` | `DE_GREATER_THAN` / `DE_GT` |
| `(` | `DE_LEFT_PARENTHESIS` / `DE_LPAR` |
| `)` | `DE_RIGHT_PARENTHESIS` / `DE_RPAR` |
| `0`-`9` | `DE_N0`-`DE_N9` |
| `a`-`z` | `DE_A`-`DE_Z` (note: `DE_Y`/`DE_Z` are swapped to match QWERTZ) |
| Space | `DE_SPACE` |

So for a backslash, use `&kp DE_BACKSLASH` (or the shorter alias `&kp DE_BSLH`) in place of
`&kp BSLH` - on a Swiss keyboard that's AltGr + the key next to left Shift, and `DE_BACKSLASH`
sends exactly that physical combination.

## Flashing

Every push builds both halves' firmware via GitHub Actions. Open the latest
run under the *Actions* tab, download the `firmware` artifact, and unzip it -
you'll get one `.uf2` file per shield (`stealth_left-nice_nano__zmk-zmk.uf2`
and `stealth_right-nice_nano__zmk-zmk.uf2`).

To flash a half: double-tap its reset button to put it into bootloader mode
(it shows up as a USB drive named `NICENANO`), then drag the matching
`.uf2` file onto that drive. It flashes and reboots automatically.

## Editing the layout live with ZMK Studio

The left/central half is built with [ZMK Studio](https://zmk.studio) support,
so you can remap keys without rebuilding or reflashing firmware:

1. Flash the current firmware to both halves (see above) at least once -
   Studio only changes the keymap that's already on the device, it doesn't
   install new firmware.
2. Connect the **left** half to your computer with a USB cable (the right
   half doesn't need Studio and isn't reachable this way).
3. Open [studio.zmk.dev](https://studio.zmk.dev) in Chrome (or the ZMK
   Studio desktop app) and connect to the keyboard - it should be detected
   automatically over the USB serial connection.
4. Edit key bindings, layers, etc. in the visual editor. Changes are pushed
   to the keyboard live and are saved to flash, so they persist across
   power cycles - no rebuild/reflash needed.

Changes made in Studio live only on the physical keyboard, not in this repo.
If you want a change to stick around permanently (e.g. survive a factory
reset, or apply after reflashing from a fresh build), port it back into
`boards/shields/stealth/stealth.keymap` by hand.
