import { FC, useState, useEffect } from 'react'
import { Map, Placemark } from '@pbe/react-yandex-maps'
import cn from 'classnames'

import s from './map.module.scss'

type Coords = [number, number]

interface MapProps {
  address: string
  hideMarker?: boolean
  className?: string
}

const CustomMap: FC<MapProps> = ({
  address,
  hideMarker = false,
  className,
}) => {
  const [api, setApi] = useState<{ geocode: any } | null>(null)
  const [coords, setCoords] = useState<Coords>([55.7515, 37.5738])

  useEffect(() => {
    if (!api) return

    api.geocode(address).then((res: any) => {
      const newCoords = res.geoObjects
        .get(0)
        .geometry.getCoordinates()
      setCoords(newCoords)
    })
  }, [api, address])

  return (
    <div className={cn(s.map, className)}>
      <Map
        modules={['geocode']}
        onLoad={(ymaps: any) => setApi(ymaps)}
        state={{
          center: coords,
          zoom: 14,
          controls: [],
        }}
        width='100%'
        height='100%'
      >
        {!hideMarker && (
          <Placemark
            geometry={coords}
            options={{
              iconLayout: 'default#image',
              iconImageHref: '/assets/icons/marker.svg',
              iconImageSize: [60, 68],
              iconImageOffset: [-26, -64],
            }}
          />
        )}
      </Map>
    </div>
  )
}

export default CustomMap
