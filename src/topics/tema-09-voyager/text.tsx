// src/topics/tema-09-voyager/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      La nave <strong>Voyager 2</strong> de la NASA visitó Júpiter, Saturno, Urano y Neptuno entre 1979 y 1989 [2]. No
      llevaba combustible para frenar y acelerar en cada planeta: usó <strong>asistencia gravitatoria</strong>. Su
      rapidez actual respecto al Sol, calculada con los datos de Horizons, ronda los 15 km/s [1].
    </P>
    <P>
      El caso se entiende en dos marcos. En el marco del planeta, la gravedad es conservativa y el planeta es
      inmensamente más masivo que la sonda, así que la rapidez de entrada y de salida son iguales y solo cambia la
      dirección. En el marco del Sol hay que sumar la velocidad del planeta:
    </P>
    <Eq>
      |u<sub>sal</sub>| = |u<sub>ent</sub>| &nbsp;&nbsp;&nbsp; v = u + V<sub>p</sub>
    </Eq>
    <Eq>
      ½v<sub>sal</sub>² − ½v<sub>ent</sub>² = V<sub>p</sub> · (u<sub>sal</sub> − u<sub>ent</sub>)
    </Eq>
    <P>
      u es la velocidad de la sonda respecto al planeta, V<sub>p</sub> la del planeta respecto al Sol y v la de la sonda
      respecto al Sol (las tres son vectores). La segunda ecuación sale de elevar v = u + V<sub>p</sub> al cuadrado antes
      y después del encuentro. Dice que la energía cinética respecto al Sol <em>sí cambia</em> en el encuentro: aumenta
      cuando la gravedad del planeta desvía a la sonda hacia la dirección de V<sub>p</sub>. Entre encuentros, en cambio,
      la energía específica ε = v²/2 − μ/r (con μ = GM<sub>Sol</sub>) se conserva, y por eso la sonda frena al alejarse del
      Sol, como se ve en la gráfica.
    </P>
    <P>
      El software de diseño de misión usa esta ecuación para calcular la rapidez de salida de cualquier geometría de
      acercamiento, sin tabular cada caso a mano.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      La energía potencial gravitatoria es U = −GMm/r, y la energía mecánica E = K + U se conserva si solo actúa la
      gravedad [M3]. El encuentro es un choque elástico (e = 1) con un cuerpo de masa enorme, la misma idea del{' '}
      <strong>Tema 7</strong> vista desde el marco del planeta: la sonda «rebota» sin perder rapidez relativa. Por
      conservación del momento, m<sub>s</sub>Δv<sub>s</sub> = −M<sub>p</sub>Δv<sub>p</sub>: el planeta pierde energía
      orbital, pero su cambio es imperceptible porque m<sub>s</sub> ≪ M<sub>p</sub>.
    </P>
    <P>
      <strong>Cota teórica (cálculo propio):</strong> como |v<sub>sal</sub>| ≤ |u| + V<sub>p</sub> y
      |v<sub>ent</sub>| ≥ |u| − V<sub>p</sub>, la ganancia nunca supera 2V<sub>p</sub>. Con la rapidez orbital de Júpiter,
      V<sub>p</sub> ≈ 13 km/s [3], el máximo teórico es ≈ 26 km/s. La ganancia real de la tabla de la gráfica es menor
      porque depende del ángulo de deflexión, que se controla con la distancia de máximo acercamiento.
    </P>
    <P>
      <strong>Conexión con el Tema 6:</strong> en el frenado regenerativo la energía cinética se reparte entre
      electricidad y calor; en la asistencia, la energía cinética de la sonda aumenta a costa de la energía orbital del
      planeta. En ambos casos la energía total del sistema se conserva; lo que cambia es su distribución.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Trayectoria precalculada (una tabla de rapideces por encuentro)',
          text: 'Una tabla sirve solo para una geometría. Con V_p·(u_sal − u_ent) se obtiene la rapidez de salida para cualquier ángulo y fecha de llegada, que es lo que se necesita para elegir entre trayectorias posibles.',
        },
        {
          title: 'Llevar combustible para cada cambio de rapidez',
          text: 'Obtener Δv de varios km/s con propulsores exigiría una masa de lanzamiento prohibitiva. La asistencia lo obtiene a costa de la energía orbital del planeta.',
        },
        {
          title: 'Un modelo de energía solo respecto al Sol',
          text: 'Si se supone ε constante también durante el encuentro, se concluye que la sonda no puede ganar rapidez, lo cual contradice los datos de la gráfica. Hay que modelar el encuentro en el marco del planeta.',
        },
      ]}
    />
    <GainCost
      gain="Con una ecuación se predice la rapidez de salida de cada geometría y se comprueba contra los datos reales: la gráfica muestra el salto en cada planeta y la caída entre encuentros."
      cost="El modelo supone un planeta de masa infinita y encuentros instantáneos. Un diseño real necesita integrar numéricamente las órbitas con las posiciones exactas de los planetas, y un error pequeño en el ángulo de acercamiento cambia mucho la trayectoria posterior."
    />
  </>
)

export const fuentes = (
  <Refs
    items={[
      {
        n: '1',
        body: (
          <>
            NASA/JPL, «Horizons System», cuerpo −32 (Voyager 2), vectores de estado respecto al Sol (500@10), paso de
            15 días; la rapidez |v| es cálculo propio.{' '}
            <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noreferrer">ssd.jpl.nasa.gov/horizons</a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '2',
        body: (
          <>
            NASA Planetary Data System, «Voyager 2 mission description» (fechas de los encuentros).{' '}
            <a href="https://pds.nasa.gov/data/pds4/1700/dph_example_archive_VG2PLS/context/PDS4_mission_VOYAGER_1.0.xml" target="_blank" rel="noreferrer">
              pds.nasa.gov/.../PDS4_mission_VOYAGER_1.0.xml
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '3',
        body: (
          <>
            NASA NSSDCA, «Jupiter Fact Sheet» (velocidad orbital media).{' '}
            <a href="https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html" target="_blank" rel="noreferrer">
              nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html
            </a>
            . Consultado el 31 oct 2026. Verifica el valor de ≈ 13 km/s en la página antes de entregar.
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