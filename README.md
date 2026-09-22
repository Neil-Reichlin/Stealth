[![.github/workflows/build.yml](https://github.com/Neil-Reichlin/split-kb/actions/workflows/build.yml/badge.svg)](https://github.com/Neil-Reichlin/split-kb/actions/workflows/build.yml)


# Stealth
Stealth is a fully custom-built ergonomic split keyboard. This repository provides the adapted ZMK firmware.

![Image20241230111320](https://github.com/user-attachments/assets/ab5ef651-aeae-4d9f-bc3f-bb629c229a5b)


## Usage 
ZMK provides US keycodes by default and configuration is easiest with US keycodes.
Although this firmware implements a *Swiss* layout it should be used as a US keyboard in your OS.
Stealth implements custom behaviours to simulate a swiss keyboard.

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
