import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      Los equipos de Fórmula 1 e Indycar usan simulación por computador para mejorar el rendimiento del auto y acelerar su
      puesta a punto en pista; Gadola et al. presentan un software de simulación de vuelta con ese fin [1]. Un ejemplo
      comercial actual es Canopy Platform, que ofrece «Dynamic Lap» (la vuelta de tiempo mínimo para un modelo del auto) y
      una variante con modelo térmico de llantas que puede correr en tiempo real en un simulador con piloto, de modo que
      este percibe cómo su conducción cambia la temperatura de la llanta [2].
    </P>
    <P>
      La física que sostiene el caso es el límite de agarre de la llanta. En el modelo simple del curso, la fricción
      estática máxima es proporcional a la normal [M2]:
    </P>
    <Eq>
      f<sub>s,máx</sub> = μ<sub>s</sub>N
    </Eq>
    <P>
      Un simulador de vuelta necesita algo más rico: un coeficiente que dependa de la carga y de la temperatura,
      μ = μ(N, T), porque la fuerza que la llanta puede dar en cada curva sale de ahí (apartados siguientes).
    </P>
    <P>
      Aviso sobre las fuentes: [1] es un artículo técnico de 1996 y [2] es la página comercial del propio proveedor, así
      que describe funciones del producto, no su implementación ni sus ecuaciones. Las uso para ilustrar el caso, no como
      especificación de ningún software de equipo.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      La fricción es una fuerza de contacto tangente a la superficie que se opone al deslizamiento relativo, o a su
      tendencia [M2]. El módulo la modela en dos regímenes:
    </P>
    <Eq>
      0 ≤ f<sub>s</sub> ≤ μ<sub>s</sub>N &nbsp;&nbsp;&nbsp; f<sub>k</sub> = μ<sub>k</sub>N
    </Eq>
    <P>
      N es la fuerza normal, perpendicular a la superficie, y no siempre es igual al peso [M2]. En un auto de carrera, N en
      cada llanta incluye la transferencia de carga y la carga aerodinámica, que los simuladores de vuelta toman en cuenta
      [1].
    </P>
    <P>
      Límite del modelo: el módulo estudia cajas sin ruedas, no modela rodamiento, y advierte que los coeficientes dependen
      del par de superficies y sus condiciones [M2]. Una llanta rodando no es una caja deslizando, así que usar μ·N como
      límite de agarre es una analogía útil para el orden de magnitud, no una descripción completa.
    </P>

    <h4>Por qué μ no es constante</h4>
    <P>
      El modelo simple predice F<sub>máx</sub> = μN con μ constante: duplicar la carga duplicaría el agarre. En una llanta
      de carrera no ocurre así, y las fuentes lo explican con mecanismos distintos:
    </P>
    <ul>
      <Li>
        Viscoelasticidad y área de contacto: al cargar la llanta crece el área de contacto, aumenta la fuerza total pero
        baja el coeficiente; una llanta puede superar μ = 1 (el ejemplo de la fuente: unos 3500 N de fuerza con 2200 N de
        carga, μ ≈ 1,6) [3].
      </Li>
      <Li>
        Temperatura y huella: según Miyashita y Persson, esa dependencia de la carga suele ser un efecto indirecto, porque
        más carga sube la temperatura de la goma y alarga la huella de contacto [4]. Es un preprint.
      </Li>
    </ul>
    <P>
      Las dos fuentes ponen el énfasis en mecanismos distintos y no afirmo que se reconcilien; por eso las gráficas
      siguientes muestran cada variable por separado. Un dato de [3] ayuda a ver la tendencia: para una llanta de F1 cita
      una rigidez de curva de 3,7 kN/° con 8 kN de carga y 3,4 kN/° con 4,5 kN (valores que a su vez toma de Dixon, 1996).
      Dividiendo entre la carga (cálculo propio) salen 0,46 y 0,76 por kN: la respuesta lateral por unidad de carga baja
      al cargar más. Es rigidez de curva, no μ, así que solo respalda la tendencia.
    </P>

    <h4>La ventana de temperatura</h4>
    <P>
      Para deslizamientos de orden 1 m/s, el agarre de una llanta de competición es máximo a unos 100 °C, lo que exige un
      compuesto con temperatura de transición vítrea cercana a −10 °C (en llantas de calle ronda −40 °C) [4]. Fuera de ese
      punto el agarre cae, y las llantas de carrera trabajan en un rango de condiciones muy estrecho [5]. Esa es la
      «ventana» del título del tema.
    </P>
    <P>
      Importante: ninguna de estas fuentes entrega una tabla medida de μ contra temperatura ni de fuerza contra carga para
      una llanta real de F1. Por eso las curvas de este tema son un modelo mío, anclado en los valores citados y rotulado
      como ilustrativo.
    </P>

    <h4>Caso numérico con el modelo de la gráfica 2</h4>
    <P>
      Partiendo de μ = 1,6 a N = 2200 N (la ancla de [3]) y de una sensibilidad a la carga n = 0,85 (parámetro propio), el
      modelo es F = μ<sub>ref</sub>N<sub>ref</sub>(N/N<sub>ref</sub>)<sup>n</sup>. Al duplicar la carga a 4400 N:
    </P>
    <ul>
      <Li>1. Modelo simple: F = 1,6 × 4400 = 7040 N</Li>
      <Li>2. Modelo con sensibilidad: F = 3520 × 2<sup>0,85</sup> ≈ 3520 × 1,80 ≈ 6340 N</Li>
      <Li>3. Coeficiente efectivo: μ = 6340/4400 ≈ 1,44, es decir, ≈ 10 % menos agarre del que predice el modelo simple</Li>
    </ul>

    <h4>Conexión con otros temas</h4>
    <P>
      En una curva, la fricción lateral de las llantas es la fuerza centrípeta. Con a<sub>c</sub> = rω² y v = rω [M3] sale
      a<sub>c</sub> = v²/r (derivación propia), y si el agarre total es μmg, la rapidez máxima en una curva de radio r es
      v = √(μgr). Con μ = 1,6 y r = 50 m: v = √(1,6 × 9,8 × 50) = 28 m/s ≈ 101 km/h. Es una cota simplificada, sin carga
      aerodinámica ni transferencia de carga. Es la misma aceleración centrípeta del Tema 3, pero aquí la suministra la
      fricción en lugar del piso de un hábitat.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Coeficiente de agarre fijo por llanta («μ = 1,6»)',
          text: 'No puede representar que la fuerza disponible cambie con la carga ni con la temperatura. En un auto de carrera las llantas trabajan siempre cerca del límite de adherencia, la dinámica es muy no lineal y la transferencia lateral de carga es fundamental para el balance [1]; un μ fijo pierde justo ese efecto.',
        },
        {
          title: 'Tabla de comportamientos precalculados por circuito y compuesto',
          text: 'Habría que medirla de nuevo para cada combinación de carga, reglaje y condición de pista. Con el modelo, una sola ecuación μ(N, T) responde para cualquier carga y temperatura, y permite preguntas que la tabla no contiene, como qué pasa si se cambia la aerodinámica.',
        },
        {
          title: 'Ignorar la temperatura',
          text: 'La variante térmica de Canopy puede correr en tiempo real en un simulador con piloto, para que este sienta el efecto de su conducción sobre la llanta [2]. Sin modelo térmico, ese ciclo (conducir más fuerte, calentar, cambiar el agarre) no existe.',
        },
      ]}
    />
    <GainCost
      gain="Una sola ecuación μ(N, T) responde para cualquier carga y temperatura, permite preguntas que una tabla no contiene, y recupera el ciclo de conducir más fuerte, calentar y cambiar el agarre que un modelo sin temperatura no tiene [2]."
      cost="Modelar la física exige datos de llanta que no siempre existen. Gadola et al. usaron un μ máximo constante para la fuerza longitudinal por simplicidad y por falta de datos [1], y esta página enfrenta el mismo límite: no hay datos medidos abiertos, así que las curvas son un modelo ilustrativo. Cuanto más detallado el modelo, más parámetros hay que ajustar con mediciones, y un modelo mal ajustado puede dar una falsa sensación de precisión."
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
            Gadola, M., Vetturi, D., Cambiaghi, D. y Manzo, L., «A Tool for Lap Time Simulation», SAE Technical Paper
            962529 (1996).{' '}
            <a href="https://saemobilus.sae.org/content/962529" target="_blank" rel="noreferrer">
              saemobilus.sae.org/content/962529
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '2',
        body: (
          <>
            Canopy Simulations, «Canopy Platform». Página comercial del proveedor: describe funciones del producto, no
            su implementación.{' '}
            <a href="https://simulation.michelin.com/canopy/canopy-platform" target="_blank" rel="noreferrer">
              simulation.michelin.com/canopy/canopy-platform
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '3',
        body: (
          <>
            Vorotovic, G. S., Rakicevic, B. B., Mitic, S. R. y Stamenkovic, D. D., «Determination of Cornering Stiffness
            Through Integration of A Mathematical Model and Real Vehicle Exploitation Parameters», FME Transactions 41(1),
            66-71 (2013).{' '}
            <a
              href="https://simlab.mas.bg.ac.rs/_media/istrazivanje/fme/vol41/1/08_gvorotovic.pdf"
              target="_blank"
              rel="noreferrer"
            >
              simlab.mas.bg.ac.rs/…/08_gvorotovic.pdf
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '4',
        body: (
          <>
            Miyashita, N. y Persson, B. N. J., «Tire tread block dynamics», arXiv:2602.22078 (2026). Preprint, sin
            revisión de pares confirmada.{' '}
            <a href="https://arxiv.org/pdf/2602.22078" target="_blank" rel="noreferrer">
              arxiv.org/pdf/2602.22078
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '5',
        body: (
          <>
            Fina, E., «The friction of racing tyres», tesis doctoral (PhD), University of Surrey, 2016.{' '}
            <a href="https://openresearch.surrey.ac.uk/esploro/outputs/doctoral/The-friction-of-racing-tyres/99512080202346" target="_blank" rel="noreferrer">
              openresearch.surrey.ac.uk/…/The-friction-of-racing-tyres
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: 'M2',
        body: (
          <>
            Módulo 2: Dinámica, sección 6 «Fuerzas de fricción». Física I (FUN-18), Universidad CENFOTEC, C3-2026.
          </>
        ),
      },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, concepto 13 «Magnitudes cinemáticas angulares». Física I (FUN-18), Universidad
            CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)