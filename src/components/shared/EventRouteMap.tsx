'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface EventRouteMapProps {
  mode: 'cycling' | 'marathon' | 'walkathon'
  distance: number
}

// Stub route coordinates for Dar es Salaam, Masaki area (Police Officers Mess)
const STUB_ROUTES = {
  cycling: [
    [-6.7423, 39.2818],
    [-6.7351, 39.2842],
    [-6.7289, 39.2789],
    [-6.7214, 39.2721],
    [-6.7423, 39.2818],
  ] as [number, number][],
  marathon: [
    [-6.7423, 39.2818],
    [-6.7450, 39.2780],
    [-6.7480, 39.2830],
    [-6.7423, 39.2818],
  ] as [number, number][],
  walkathon: [
    [-6.7423, 39.2818],
    [-6.7400, 39.2800],
    [-6.7423, 39.2818],
  ] as [number, number][],
}

const COLORS = {
  cycling: '#F7A81B', // gold
  marathon: '#17458F', // royal
  walkathon: '#4A9FDB', // sky
}

function MapUpdater({ route }: { route: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (route.length > 0) {
      const bounds = L.latLngBounds(route)
      map.flyToBounds(bounds, { padding: [20, 20], duration: 1.5 })
    }
  }, [route, map])
  return null
}

export default function EventRouteMap({ mode, distance }: EventRouteMapProps) {
  const route = STUB_ROUTES[mode]
  const color = COLORS[mode]

  return (
    <MapContainer
      center={route[0]}
      zoom={14}
      scrollWheelZoom={false}
      zoomControl={false}
      className="w-full h-full z-0 bg-[#0A192F]"
      attributionControl={false}
    >
      {/* Dark modern map tiles */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <Polyline positions={route} color={color} weight={4} opacity={0.8} />
      
      {/* Start/Finish Marker */}
      <Marker position={route[0]}>
        <Popup className="font-sans text-[12px] font-bold">Start / Finish<br/>Police Officers' Mess</Popup>
      </Marker>

      <MapUpdater route={route} />
    </MapContainer>
  )
}
