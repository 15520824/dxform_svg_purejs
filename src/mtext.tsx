import { DxfRecordReadonly } from '@dxfom/dxf'
import { DxfMTextContentElement } from 'dxform_mtext_purejs'
import { $number, round } from './util'

export const MTEXT_attachmentPoint = (n: string | number | undefined) => {
  n = +n!
  let dominantBaseline: string | undefined
  let textAnchor: string | undefined
  switch (n) {
    case 1:
    case 2:
    case 3:
      dominantBaseline = 'text-before-edge'
      break
    case 4:
    case 5:
    case 6:
      dominantBaseline = 'central'
      break
    case 7:
    case 8:
    case 9:
      dominantBaseline = 'text-after-edge'
      break
  }
  switch (n % 3) {
    case 2:
      textAnchor = 'middle'
      break
    case 0:
      textAnchor = 'end'
      break
  }
  return { dominantBaseline, textAnchor }
}

const yx2angle = (y: number, x: number) => round(Math.atan2(y || 0, x || 0) * 180 / Math.PI, 5) || 0

export const MTEXT_angle = (mtext: DxfRecordReadonly): number => {
  for (let i = mtext.length - 1; i >= 0; i--) {
    switch (mtext[i][0]) {
      case 50:
        return round(+mtext[i][1], 5) || 0
      case 11:
        return yx2angle($number(mtext, 12), +mtext[i][1])
      case 21:
        return yx2angle(+mtext[i][1], $number(mtext, 11))
    }
  }
  return 0
}

export const MTEXT_contents = (contents: readonly DxfMTextContentElement[], i = 0): string => {
  if (contents.length <= i) {
    return ''
  }
  const restContents = MTEXT_contents(contents, i + 1)
  const content = contents[i]
  if (typeof content === 'string') {
    return content + restContents
  }
  if (Array.isArray(content)) {
    return MTEXT_contents(content) + restContents
  }
  if (content.S) {
    return (
      <tspan>
        <tspan dy='-.5em'>{content.S[0]}</tspan>
        <tspan dy='1em' dx={content.S[0].length / -2 + 'em'}>{content.S[2]}</tspan>
      </tspan>
    ) + restContents
  }
  if (content.f) {
    return (
      <tspan
        font-family={content.f}
        font-weight={content.b && 'bold'}
        font-style={content.i && 'italic'}
      >
        {restContents}
      </tspan>
    )
  }
  if (content.Q) {
    return <tspan font-style={`oblique ${content.Q}deg`}>{restContents}</tspan>
  }
  return restContents
}
