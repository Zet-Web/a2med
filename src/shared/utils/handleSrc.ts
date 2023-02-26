import { ImageProps } from 'next/image'
import { BASE_DOMAIN } from 'shared/api'

export const withDomain = (
  image?: ImageProps['src'] | null
): ImageProps['src'] => {
  if (!image) return ''

  // if (typeof image == 'object')
  //   return [BASE_DOMAIN, image].join(image.image[0] === '/' ? '' : '/')

  if (typeof image !== 'string' || image.includes(BASE_DOMAIN))
    return image

  


  return [BASE_DOMAIN, image].join(image[0] === '/' ? '' : '/')
}
