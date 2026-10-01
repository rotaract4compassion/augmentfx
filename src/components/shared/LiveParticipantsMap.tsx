'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom pulsing icon for active runners
const createPulseIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 12px ${color}; border: 2px solid rgba(255,255,255,0.8); animation: pulse 2s infinite;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

const RUNNER_ICON = createPulseIcon('#F7A81B') // Gold
const CYCLIST_ICON = createPulseIcon('#4A9FDB') // Sky blue
const WALKER_ICON = createPulseIcon('#1EB53A') // Flag green

// Simulated live data
const MOCK_PARTICIPANTS = [
  { id: 'M-1049', name: 'James Mgasa', mode: 'Marathon', coords: [-6.8161, 39.2803], icon: RUNNER_ICON },
  { id: 'M-1050', name: 'Grace Mtemi', mode: 'Marathon', coords: [-6.8155, 39.2810], icon: RUNNER_ICON },
  { id: 'C-021', name: 'Aisha Nurdin', mode: 'Cycling', coords: [-6.8140, 39.2830], icon: CYCLIST_ICON },
  { id: 'C-022', name: 'Peter Kafuku', mode: 'Cycling', coords: [-6.8120, 39.2850], icon: CYCLIST_ICON },
  { id: 'W-992', name: 'John Doe', mode: 'Walkathon', coords: [-6.8180, 39.2790], icon: WALKER_ICON },
]

export default function LiveParticipantsMap() {
  const [mounted, setMounted] = useState(false)
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS)

  useEffect(() => {
    setMounted(true)
    
    // Simulate live movement
    const interval = setInterval(() => {
      setParticipants(prev => prev.map(p => ({
        ...p,
        coords: [
          p.coords[0] + (Math.random() - 0.5) * 0.0005,
          p.coords[1] + (Math.random() - 0.5) * 0.0005
        ]
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">Calibrating GPS Satellites...</div>
  }

  return (
    <div className="w-full h-full min-h-[400px] z-0">
      <MapContainer 
        center={[-6.8161, 39.2803]} // Dar es Salaam center
        zoom={15} 
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false}
      >
        {/* Dark map tiles for tactical aesthetic */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {participants.map((p) => (
          <Marker key={p.id} position={p.coords as [number, number]} icon={p.icon}>
            <Popup className="tactical-popup">
              <div className="bg-slate-900 text-slate-200 p-2 rounded border border-slate-700 shadow-xl">
                <p className="font-mono text-[10px] text-gold uppercase tracking-widest mb-1">{p.id}</p>
                <p className="font-bold text-[13px] leading-tight">{p.name}</p>
                <p className="text-[11px] text-slate-400 mt-1">{p.mode} Unit</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
