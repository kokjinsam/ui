import fs from "fs"
import path from "path"
import plugin from "tailwindcss/plugin"
import svgo from "svgo"

module.exports = plugin(({ matchComponents }) => {
  const iconsDir = path.join(__dirname, "./node_modules/lucide-static/icons")

  let values = {}

  fs.readdirSync(iconsDir).map((file) => {
    if (path.extname(file) == ".svg") {
      const name = path.basename(file, ".svg")
      const fullPath = path.join(iconsDir, file)

      // TODO: for now we don't provide option to configure stroke width.
      values[`${name}-light`] = {
        name,
        fullPath,
        strokeWidth: 1.5,
        absoluteStrokeWidth: true
      }
      values[name] = {
        name,
        fullPath,
        strokeWidth: 1.8,
        absoluteStrokeWidth: true
      }
      values[`${name}-medium`] = {
        name,
        fullPath,
        strokeWidth: 2,
        absoluteStrokeWidth: true
      }
    }
  })

  matchComponents(
    {
      lucide: ({ fullPath, strokeWidth, absoluteStrokeWidth }) => {
        const content = fs.readFileSync(fullPath).toString()
        const size = 24
        const calculatedStrokeWidth = absoluteStrokeWidth
          ? (strokeWidth * 24) / size
          : strokeWidth

        const result = svgo.optimize(content, {
          multipass: true,
          plugins: [
            {
              name: "removeAttrs",
              params: {
                attrs: "svg:(width|height|stroke-width)"
              }
            },
            {
              name: "addAttributesToSVGElement",
              params: {
                attributes: [`stroke-width="${calculatedStrokeWidth}"`]
              }
            }
          ]
        })

        const markup = result.data

        return {
          "--lucide-svg": `url('data:image/svg+xml;utf8,${markup}')`,
          "-webkit-mask": `var(--lucide-svg)`,
          "mask": `var(--lucide-svg)`,
          "mask-repeat": "no-repeat",
          "background-color": "currentColor",
          "display": "inline-block",
          "width": `${size}px`,
          "height": `${size}px`
        }
      }
    },
    { values }
  )
})
