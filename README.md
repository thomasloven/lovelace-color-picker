# color-picker

A lovelace card with a color picker wheel. That's all.
Really really simple, for now.

![color-picker](https://user-images.githubusercontent.com/1299821/51713377-01abca00-2032-11e9-97b3-79f494c34f8e.png)


This card requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:color-picker`
| entity | string | **Required** | Entity id of light
| name | string | `friendly_name` | Name to display
| show\_header | boolean | true | Display header
