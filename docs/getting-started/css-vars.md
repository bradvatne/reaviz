# CSS Variables

To customize various elements in the charts,
we use [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).
This gives you fine grain control over the styles
that is native to the browser. The color variables are:

- `--color-background`
- `--color-on-background`
- `--color-layer-transparent`
- `--color-surface`
- `--color-primary`
- `--color-on-primary`

These names are based on the Google Material design spec. These variables
are not setup when you install the project automatically but if you want
some sensible defaults here is what we use in the Storybook demo:

```html
<style>
  body {
    --color-background:#22272b;
    --color-on-background:#fff;
    --color-layer-transparent:rgba(0,5,11,0.9);
    --color-surface:#2c343a;
    --color-primary:#67c2e4;
    --color-on-primary:#fff;
  }
</style>
```
