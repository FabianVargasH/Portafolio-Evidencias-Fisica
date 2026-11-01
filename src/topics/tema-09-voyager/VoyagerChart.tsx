// src/topics/tema-09-voyager/VoyagerChart.tsx
import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { buildVoyager2Series } from '../../lib/physics/voyager'
import { P } from '../../components/ui/Cited'

const MUTED = '#9aa4b8'

export default function VoyagerChart() {
  const data = useMemo(() => buildVoyager2Series(), [])

  return (
    <div style={{ background: '#121827', border: '1px solid #1f2940', borderRadius: 8, padding: 16, margin: '12px 0' }}>
      
      {/* Texto con citas funcionales */}
      <P>
        Cada salto corresponde a una asistencia gravitatoria. La curva es una reconstrucción propia a partir de las fechas
        de la NASA PDS [7] y los incrementos de rapidez publicados por gravityassist.com [8]. No es telemetría oficial.
      </P>
      
      {/* Título visible de la gráfica */}
      <h4 style={{ marginTop: 16, marginBottom: 16, color: '#f1f5f9', fontSize: '1rem', fontWeight: 600 }}>
        Rapidez de la Voyager 2 respecto al Sol
      </h4>

      <div style={{ height: 350, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2940" />
            <XAxis 
              dataKey="t" 
              type="number"
              domain={[1977, 2027]}
              stroke={MUTED} 
              tickFormatter={(t) => Math.floor(t).toString()}
              ticks={[1977, 1985, 1995, 2005, 2015, 2026]}
              label={{ value: 'Año', position: 'insideBottomRight', offset: -10, fill: MUTED }}
            />
            <YAxis 
              stroke={MUTED} 
              domain={[8, 18]} 
              label={{ value: 'Rapidez (km/s)', angle: -90, position: 'insideLeft', fill: MUTED }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#121827', borderColor: '#1f2940', color: '#cbd5e1' }}
              labelFormatter={(t) => `Año: ${Math.floor(Number(t))}`}
              formatter={(value) => [`${Number(value).toFixed(2)} km/s`, 'Rapidez']}
              cursor={{ stroke: '#3b4a6b', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Legend />
            <Line 
              type="stepAfter" 
              dataKey="v" 
              name="Voyager 2" 
              stroke="#60a5fa" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}