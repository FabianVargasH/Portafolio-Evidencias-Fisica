// src/topics/tema-09-voyager/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      La nave <strong>Voyager 2</strong> de la NASA visitó Júpiter, Saturno, Urano y Neptuno entre 1979 y 1989, y hoy
      viaja a ~15,3 km/s respecto al Sol [5]. No llevaba combustible suficiente para frenar y acelerar en cada planeta:
      usó <strong>asistencia gravitatoria</strong>. La NASA (JPL) planificó cada encuentro para que la gravedad del
      planeta cambie la dirección y la rapidez de la sonda en el marco del Sol.
    </P>
    <P>
      El principio físico es la conservación de la energía y del momento en el marco del planeta. En el marco heliocéntrico,
      la energía orbital específica se conserva durante el crucero:
    </P>
    <Eq>
      ε = v²/2 − μ/r = constante
    </Eq>
    <P>
      donde μ = GM<sub>Sol</sub>. La asistencia no cambia ε (la energía respecto al Sol se conserva en el encuentro), pero
      cambia la dirección del vector velocidad; al salir en una dirección más alineada con el movimiento orbital del planeta,
      la rapidez heliocéntrica aumenta. El incremento documentado para Voyager 2 fue de +10,1 km/s en Júpiter, +4,9 km/s
      en Saturno y +1,9 km/s en Urano [8].
    </P>
    <P>
      Modelar la física permite <strong>corregir la trayectoria en tiempo real</strong> con los datos de los sensores. Una
      trayectoria precalculada no puede reaccionar si la sonda se desvía; el modelo físico recalcula la asistencia con las
      condiciones reales del encuentro.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      La energía potencial gravitatoria es U = −GMm/r, y la energía mecánica total E = K + U se conserva si solo actúa la
      gravedad [M3]. En el encuentro con un planeta, la sonda intercambia momento lineal con el planeta en el marco
      heliocéntrico: la sonda gana rapidez y el planeta la pierde (en una cantidad imperceptible por su masa).
    </P>
    <P>
      <strong>Caso numérico (Voyager 2 en Júpiter):</strong> antes del encuentro, la sonda viajaba a ~10 km/s respecto al
      Sol. El incremento documentado es +10,1 km/s [8], lo que la llevó a ~20 km/s. La cifra exacta depende del ángulo de
      aproximación, que la NASA ajustó para maximizar la ganancia.
    </P>
    <P>
      <strong>Conexión con el Tema 6:</strong> en el frenado regenerativo, la energía cinética se transforma en electricidad
      y calor. En la asistencia gravitatoria, la energía cinética de la sonda cambia a costa de la energía orbital del
      planeta. En ambos casos, la energía total del sistema se conserva; lo que cambia es su distribución.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Trayectoria precalculada',
          text: 'Una trayectoria fija no puede corregirse si la sonda se desvía. El modelo físico lee los sensores y recalcula la asistencia con las condiciones reales del encuentro.',
        },
        {
          title: 'Añadir combustible para acelerar',
          text: 'Llevar combustible para los cambios de velocidad requeriría una masa de lanzamiento prohibitiva. La asistencia gravitatoria obtiene el mismo cambio de rapidez "gratis", a costa de la energía orbital del planeta.',
        },
        {
          title: 'Ignorar la conservación de la energía',
          text: 'Sin el modelo de energía orbital, no se puede predecir la rapidez de salida del encuentro ni verificar que la sonda no se destruye por la proximidad al planeta.',
        },
      ]}
    />
    <GainCost
      gain="La asistencia gravitatoria permite ganar velocidad sin gastar combustible, usando la energía orbital de los planetas. El modelo físico predice la rapidez de salida y permite corregir la trayectoria en tiempo real."
      cost="La geometría del encuentro debe ser precisa: un ángulo equivocado puede frenar la sonda en lugar de acelerarla. El modelo necesita datos exactos de la posición y velocidad del planeta, y no hay margen para errores de navegación."
    />
  </>
)

export const fuentes = (
  <Refs
    items={[
      {
        n: '5',
        body: (
          <>
            Orbital Radar, «Voyager 2 — Live Position, Distance & Speed Tracker» (datos de JPL Horizons). Rapidez actual
            ~15,3 km/s.{' '}
            <a href="https://orbitalradar.com/deep-space/voyager-2" target="_blank" rel="noreferrer">
              orbitalradar.com/deep-space/voyager-2
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '7',
        body: (
          <>
            NASA Planetary Data System, «Voyager 2 flyby of Jupiter (9 jul 1979), Saturn (26 ago 1981), Uranus (24 ene
            1986), Neptune (25 ago 1989)».{' '}
            <a href="https://pds.nasa.gov/data/pds4/1700/dph_example_archive_VG2PLS/context/PDS4_mission_VOYAGER_1.0.xml" target="_blank" rel="noreferrer">
              pds.nasa.gov/.../PDS4_mission_VOYAGER_1.0.xml
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '8',
        body: (
          <>
            gravityassist.com, «Voyager 2 flybys: Jupiter, Saturn, Uranus». Incrementos de rapidez: +10,1 km/s (Júpiter),
            +4,9 km/s (Saturno), +1,9 km/s (Urano).{' '}
            <a href="http://www.gravityassist.com/IAF1/Ref.%201-85.pdf" target="_blank" rel="noreferrer">
              gravityassist.com/IAF1/Ref. 1-85.pdf
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '12',
        body: (
          <>
            NASA Planetary Data System, «Voyager 2 mission description» (fechas y distancias de los encuentros).{' '}
            <a href="https://pds.nasa.gov/data/pds4/1700/dph_example_archive_VG2PLS/context/PDS4_mission_VOYAGER_1.0.xml" target="_blank" rel="noreferrer">
              pds.nasa.gov/.../PDS4_mission_VOYAGER_1.0.xml
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, conceptos de energía potencial gravitatoria y conservación de la energía
            mecánica. Física I (FUN-18), Universidad CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)