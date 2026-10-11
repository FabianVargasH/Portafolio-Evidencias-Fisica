import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'


export const casoDeUso = (
  <>
    <P>
      Elite Dangerous, de Frontier Developments, es un simulador espacial en el que el jugador atraca en estaciones gigantes.
      Según la wiki de la comunidad, en ese universo no existe la antigravedad: los starports, las megaships y otras naves
      grandes tienen anillos rotatorios que crean gravedad artificial por fuerza centrípeta [1]. Esa rotación se nota al
      atracar: la estación gira, y la nave debe moverse con ella.
    </P>
    <P>
      En el foro de Frontier, varios jugadores midieron la estación Coriolis para estimar su gravedad. Con una vuelta cada
      80 s y un radio de 500 m, uno de ellos obtuvo ≈ 0,315 g en el borde exterior; con 96 s y 2 km del eje, otro obtuvo
      ≈ 0,87 g [2]. Los mismos jugadores describen una «corrección de rotación» que se activa con la autorización de
      atraque: aplica el empuje necesario para que las plataformas parezcan quietas, y sin ella la estación gira alrededor
      de la nave y atracar se vuelve muy difícil [2]. Otros usuarios del hilo opinan que el juego simplifica el efecto
      Coriolis, así que ese detalle queda como descripción de jugadores, no como documentación del juego.
    </P>
    <P>La física que sostiene el caso es la aceleración normal de un punto que gira con velocidad angular ω a distancia r del eje [M3]:</P>
    <Eq>
      a<sub>c</sub> = rω²
    </Eq>
    <P>
      Si el diseñador fija ω y r, la gravedad aparente de cada punto de la estación sale de esta ecuación, sin tablas ni
      animaciones aparte.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      Un cuerpo rígido que gira alrededor de un eje fijo tiene la misma ω en todos sus puntos. Un punto a distancia r del
      eje tiene rapidez tangencial v = r|ω| y una aceleración normal rω² dirigida hacia el eje, incluso cuando la
      aceleración angular es cero [M3]:
    </P>
    <Eq>v = rω &nbsp;&nbsp;&nbsp; a<sub>c</sub> = rω²</Eq>
    <P>
      En el hábitat, el piso empuja a la persona hacia el eje con esa aceleración, y ella lo percibe como peso con
      «abajo» apuntando hacia afuera. Para que ese peso sea 1 g se exige a<sub>c</sub> = g:
    </P>
    <Eq>ω²r = g &nbsp;⇒&nbsp; ω = √(g/r), &nbsp; r = g/ω²</Eq>
    <P>
      Período y rpm: una vuelta completa son 2π rad, de modo que ω = Δθ/Δt da ω = 2π/T. Esta relación y la conversión a rpm
      son derivaciones propias a partir de esa definición; no aparecen escritas en el módulo.
    </P>
    <Eq>T = 2π/ω &nbsp;&nbsp;&nbsp; n = 60/T</Eq>

    <h4>Caso numérico: diseño para 1 g con r = 200 m (g = 9,8 m/s²)</h4>
    <ul>
      <Li>1. ω = √(g/r) = √(9,8/200) = √0,049 ≈ 0,221 rad/s</Li>
      <Li>2. T = 2π/ω ≈ 6,283/0,2214 ≈ 28,4 s</Li>
      <Li>3. n = 60/T ≈ 60/28,4 ≈ 2,11 rpm</Li>
      <Li>4. v = rω = 200 × 0,2214 ≈ 44,3 m/s</Li>
      <Li>5. Verificación: rω² = 200 × 0,049 = 9,8 m/s² = 1 g</Li>
    </ul>
    <P>
      Como a<sub>c</sub> es proporcional a r y ω es la misma para todos los puntos, a la mitad del radio (100 m) la persona
      sentiría la mitad del peso, 0,5 g. Eso encaja con lo que describe la wiki de Elite: la gravedad aumenta hacia el
      exterior y es muy baja cerca del eje [1].
    </P>

    <h4>Comparación con la estación Coriolis de Elite</h4>
    <P>
      Con T = 80 s, ω = 2π/80 ≈ 0,0785 rad/s. En r = 500 m: a<sub>c</sub> = rω² ≈ 500 × 0,00617 ≈ 3,08 m/s² ≈ 0,31 g, que
      coincide con el 0,315 g del foro [2]. Con esa misma ω, para llegar a 1 g haría falta r = g/ω² ≈ 1590 m. Una estación
      de 200 m tiene que girar bastante más rápido (28,4 s por vuelta contra 80 s), porque ω es proporcional a 1/√r.
    </P>
    <P>
      Ese ritmo es el límite práctico del diseño: Jensen indica que mantener la rotación por debajo de 1 rpm ayuda a evitar
      el mareo, y que con 1 g eso implica un radio mayor que ≈ 900 m [3]. Con 2,11 rpm, la estación de 200 m queda por
      encima de ese valor.
    </P>

    <h4>Conexión con otros temas</h4>
    <P>
      En el Tema 1 la velocidad instantánea es siempre tangente a la trayectoria y la aceleración es dv/dt [M1]. Aquí la
      rapidez es constante, pero el vector velocidad cambia de dirección, y por eso existe a<sub>c</sub>. En el Tema 2 la
      gravedad era un parámetro que el diseñador elegía a mano; en el hábitat rotatorio emerge de dos variables de diseño,
      ω y r.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Gravedad fija por estación («aquí hay 1 g»)',
          text: ['No representa que la gravedad en un hábitat rotatorio cambia con la distancia al eje. La wiki de Elite describe valores bajos cerca del eje (≈ 0,1 g en el muelle de acoplamiento) que crecen hacia afuera [1]. Con a', <sub key="s">c</sub>, ' = rω² ese gradiente sale gratis para cualquier punto y cualquier tamaño de estación.'],
        },
        {
          title: 'Atraque guionizado o precalculado',
          text: 'Habría que animar la maniobra para cada estación, cada tamaño y cada punto de aproximación. Con el modelo, la corrección se obtiene de una sola regla: una plataforma a distancia r se mueve con v = rω, y la nave solo necesita igualar esa velocidad. Los jugadores describen justamente esa compensación [2].',
        },
        {
          title: 'Copiar solo la apariencia (una estación que gira como adorno)',
          text: 'Daría un giro sin consecuencias, sin relación con el peso que sienten los habitantes ni con las rpm que se toleran. El modelo en cambio ata las tres cantidades: al cambiar r, cambia la rotación necesaria (ω = √(g/r)), y con ella el confort [3].',
        },
      ]}
    />
    <GainCost
      gain="Una sola ecuación da el gradiente de gravedad para cualquier punto y tamaño de estación, una sola regla (v = rω) resuelve la compensación del atraque, y radio, rotación y confort quedan ligados [3]."
      cost="Calcular rω² es trivial para un motor de juego, así que el costo no es de cómputo sino de diseño y de jugabilidad. Radio y rpm quedan acoplados (las estaciones pequeñas giran más rápido y se vuelven incómodas [3]), y un modelo completo vuelve el atraque muy difícil, como describen los jugadores cuando falla la corrección [2]. Por eso un juego puede modelar la física y aun así decidir cuánta mostrar: compensar la rotación de forma automática mantiene el atraque jugable. Que los usuarios del foro no coincidan en cuánto simula realmente el juego [2] confirma que esa decisión de diseño existe."
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
            Elite Dangerous Wiki (Fandom), «Anti gravity». Contenido de comunidad sobre el universo del juego, no
            documentación oficial.{' '}
            <a href="https://elite-dangerous.fandom.com/wiki/Anti_gravity" target="_blank" rel="noreferrer">
              elite-dangerous.fandom.com/wiki/Anti_gravity
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '2',
        body: (
          <>
            Frontier Forums, hilo «Coriolis Station Physics», mensajes de usuarios (estimaciones de comunidad, no
            documentación oficial).{' '}
            <a href="https://forums.frontier.co.uk/goto/post?id=317174" target="_blank" rel="noreferrer">
              forums.frontier.co.uk/goto/post?id=317174
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '3',
        body: (
          <>
            Jensen, D. W., «Space Station Rotational Stability», arXiv:2408.00155 (2024).{' '}
            <a href="https://arxiv.org/pdf/2408.00155" target="_blank" rel="noreferrer">
              arxiv.org/pdf/2408.00155
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      { n: 'M1', body: <>Módulo 1: Cinemática. Física I (FUN-18), Universidad CENFOTEC, C3-2026.</> },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, concepto 13 «Magnitudes cinemáticas angulares» (p. 15). Física I (FUN-18),
            Universidad CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)