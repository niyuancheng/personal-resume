import {
    defineConfig, 
    presetUno, 
    presetAttributify,
    presetIcons,
    presetWebFonts
} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetWebFonts({
            provider: 'google'
        })
    ]
})