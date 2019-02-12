customElements.whenDefined('card-tools').then(() => {
class ColorPicker extends cardTools.litElement() {

  setConfig(config) {
    this._config = config
    this.colorPickerColor = {
      h: 25,
      s: 10,
    };
    this.color = "";
  }

  render_style() {
    return cardTools.litHtml()`
    <style>
    ha-card {
      padding: 16px;
    }
    .header {
      @apply --paper-font-headline;
      line-height: 40px;
      color: var(--primary-text-color);
      padding: 4px 0 12px;
    }
    .header .name {
      @apply --paper-font-common-nowrap;
    }
    ha-color-picker {
      display: block;
      width: 100%;
      --ha-color-picker-wheel-borderwidth: 5;
      --ha-color-picker-wheel-bordercolor: white;
      --ha-color-picker-wheel-shadow: none;
      --ha-color-picker-marker-borderwidth: 2;
      --ha-color-picker-marker-bordercolor: white;
    }
    .notfound {
      background-color: yellow;
      padding: 8px;
    }
    </style>
    `;
  }

  render() {
    const html = cardTools.litHtml();
    const name = this._config.name || (this.stateObj?this.stateObj.attributes.friendly_name:null) || this._config.entity;
    return html`
      ${this.render_style()}
      <ha-card>
        ${ this._config.show_header !== false ? html`
          <div class="header">
            <div class="name">
              ${name}
            </div>
          </div>
          ` : ``}
        ${ this.stateObj ? html`
        ${ this.stateObj.attributes.supported_features & 16 ? html`
        <center>
        <ha-color-picker
          class="control color"
          @colorselected="${this.colorPicked}"
          throttle="500"
          hue-segments="24"
          saturation-segments="8"
        >
        </ha-color-picker>
        </center>
        `: ``}
        ` : html`
          <div class=notfound>
            Entity not available: ${this._config.entity}
          </div>
        `}
      </ha-card>
    `;
  }

  setColor() {
    let color = {h: 0, s: 0};
    if(this.stateObj && this.stateObj.attributes.hs_color)
      color = {
        h: this.stateObj.attributes.hs_color[0],
        s: this.stateObj.attributes.hs_color[1]/100,
      };
    if(this.shadowRoot.querySelector("ha-card ha-color-picker"))
      this.shadowRoot.querySelector("ha-card ha-color-picker").desiredHsColor = color;
  }

  firstUpdated() {
    this.setColor();
  }

  set hass(hass) {
    this._hass = hass;
    this.stateObj = hass.states[this._config.entity];
    this.setColor();
    this.requestUpdate();
  }

  colorPicked(ev) {
    this._hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      hs_color: [ev.detail.hs.h, ev.detail.hs.s*100],
    });
  }
}
customElements.define('color-picker', ColorPicker);
});

window.setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('color-picker', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);
