import type { EditorComponentOptions } from 'netlify-cms-core'

import { videoProviders } from '@/cms/components/Video'

/**
 * Netlify CMS richtext editor widget for Video component.
 */
export const videoEditorWidget: EditorComponentOptions = {
  id: 'Video',
  label: 'Video',
  fields: [
    {
      name: 'provider',
      label: 'Provider',
      widget: 'select',
      // @ts-expect-error Missing in upstream type.
      options: Object.entries(videoProviders).map(([value, label]) => {
        return { value, label }
      }),
      default: 'youtube',
    },
    { name: 'id', label: 'Video ID', widget: 'string' },
    {
      name: 'caption',
      label: 'Caption',
      widget: 'string',
      // @ts-expect-error Missing in upstream type.
      required: false,
    },
    {
      name: 'autoPlay',
      label: 'Autoplay',
      widget: 'boolean',
      // @ts-expect-error Missing in upstream type.
      required: false,
    },
    {
      name: 'startTime',
      label: 'Start time',
      // @ts-expect-error Missing in upstream type.
      hint: 'In seconds',
      widget: 'number',
      required: false,
    },
  ],
  pattern: /^<Video([^]*?)\/>/,
  fromBlock(match) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const attrs = match[1]!

    const provider = /provider="([^"]*)"/.exec(attrs)
    const id = /id="([^"]*)"/.exec(attrs)

    const caption = /caption="([^"]*)"/.exec(attrs)
    const autoPlay = / autoPlay /.exec(attrs)
    const startTime = /startTime="([^"]*)"/.exec(attrs)

    return {
      provider: provider ? provider[1] : undefined,
      id: id ? id[1] : undefined,
      caption: caption ? caption[1] : undefined,
      autoPlay: autoPlay ? true : undefined,
      startTime: startTime ? startTime[1] : undefined,
    }
  },
  toBlock(data) {
    let attrs = ''

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data.provider) attrs += ` provider="${data.provider}"`
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data.id) attrs += ` id="${data.id}"`

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data.caption) attrs += ` caption="${data.caption}"`
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data.autoPlay) attrs += ` autoPlay`
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data.startTime) attrs += ` startTime="${data.startTime}"`

    return `<Video${attrs} />`
  },
  /**
   * This is only used in `getWidgetFor` (which we don't use).
   */
  toPreview() {
    return `Video`
  },
}
