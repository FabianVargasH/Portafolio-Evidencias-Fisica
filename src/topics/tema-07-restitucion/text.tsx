// src/topics/tema-07-restitucion/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      En un motor de videojuegos, una pelota que rebota no se anima fotograma a
      fotograma: se simula. El motor Box2D 2.4.1 expone en su definición de
      accesorio (<code>b2FixtureDef</code>) dos parámetros que controlan el
      rebote: <code>restitution</code> (elasticidad, típicamente en [0,1]) y{' '}
      <code>restitutionThreshold</code> (rapidez mínima de impacto para que se
      aplique el rebote, en m/s) [7].
    </P>
    <P>
      El caso concreto es el de cualquier juego 2D que use Box2D y necesite que
      una pelota, un objeto o un personaje rebote contra el suelo. En cada
      impacto, la componente normal de la velocidad se invierte y se escala por
      el coeficiente:
    </P>
    <Eq>
      v' = −e · v &nbsp;&nbsp;&nbsp; 0 ≤ e ≤ 1
    </Eq>
    <P>
      Para dos cuerpos en una dimensión, el mismo coeficiente entra en las
      fórmulas de choque del Módulo 3 [M3]:
    </P>
    <Eq>
      v<sub>1f</sub> = (m<sub>1</sub>v<sub>1i</sub> + m<sub>2</sub>v<sub>2i</sub> − m<sub>2</sub>e(v<sub>1i</sub> − v<sub>2i</sub>)) / (m<sub>1</sub> + m<sub>2</sub>)
    </Eq>
    <Eq>
      v<sub>2f</sub> = (m<sub>1</sub>v<sub>1i</sub> + m<sub>2</sub>v<sub>2i</sub> + m<sub>1</sub>e(v<sub>1i</sub> − v<sub>2i</sub>)) / (m<sub>1</sub> + m<sub>2</sub>)
    </Eq>
    <P>
      La justificación de modelar la física en lugar de usar alternativas no
      físicas es que un solo parámetro <code>e</code> produce rebotes
      coherentes para cualquier altura inicial y cualquier velocidad de impacto,
      sin tener que animar cada caso. La tabla siguiente contrasta esa ganancia
      con su costo, frente a las alternativas que enumera la consigna.
    </P>
    <AltCards
      items={[
        {
          title: 'Valores fijos',
          text: 'La altura del rebote se escribe a mano para un caso. No generaliza: cambiar H₀ o la masa obliga a rehacer los datos.',
        },
        {
          title: 'Trayectorias precalculadas',
          text: 'Se almacena la curva de altura contra tiempo. Ocupa memoria por caso y no responde a un control en vivo.',
        },
        {
          title: 'Animaciones guionizadas',
          text: 'El rebote se reproduce como clip. Se ve bien una vez, pero no se puede interpolar e entre 0 y 1 sin rehacer la animación.',
        },
      ]}
    />
    <GainCost
      gain="Un único parámetro e genera rebotes coherentes para cualquier combinación de altura, masa y velocidad; el mismo e entra en las fórmulas de choque 1D del Módulo 3."
      cost="El motor debe resolver la paradoja de Zenón (infinitos rebotes que convergen) con un umbral de velocidad; por debajo de restitutionThreshold la pelota queda en reposo y el rebote «se siente» artificial si no se calibra."
    />
  </>
)

export const concepto = (
  <>
    <P>
      El coeficiente de restitución compara la rapidez de separación con la de
      aproximación en el choque [M3]:
    </P>
    <Eq>
      e = (v<sub>2f</sub> − v<sub>1f</sub>) / (v<sub>1i</sub> − v<sub>2i</sub>)
    </Eq>
    <P>
      <strong>Caso 1 — rebote contra el piso (dato real de [6]).</strong> Una
      pelota se suelta desde H<sub>0</sub> = 0,92 m y el experimento mide
      e = 0,752. La altura del primer rebote es:
    </P>
    <Eq>
      h<sub>1</sub> = e²·H<sub>0</sub> = (0,752)²·0,92 m = 0,52 m
    </Eq>
    <P>
      que coincide con los 52,0 cm medidos en [6]. La simulación reproduce este
      valor al dejar los controles «igual a la referencia».
    </P>
    <P>
      <strong>Caso 2 — choque frontal 1D (ejemplo del Módulo 3).</strong> Con
      m<sub>1</sub> = 2 kg, v<sub>1i</sub> = +3 m/s, m<sub>2</sub> = 1 kg,{' '}
      v<sub>2i</sub> = 0 y e = 1, las fórmulas anteriores dan{' '}
      v<sub>1f</sub> = 1 m/s y v<sub>2f</sub> = 4 m/s. El momento se conserva
      siempre:
    </P>
    <Eq>
      P<sub>i</sub> = 2(3) + 1(0) = 6 kg·m/s = P<sub>f</sub>
    </Eq>
    <P>
      La energía cinética solo se conserva si e = 1. Con valores menores, la
      diferencia se disipa como energía interna, calor o sonido: es la misma
      idea del <strong>Tema 6</strong>, donde la energía del frenado que no se
      recupera se disipa en los frenos de fricción.
    </P>
  </>
)

export const justificacion = (
  <>
    <P>
      Modelar la restitución con e resuelve el problema mejor que las
      alternativas no físicas porque separa la <em>ley</em> del <em>caso</em>:
      un solo parámetro gobierna todos los rebotes y todos los choques 1D, y el
      mismo motor puede recalcular en vivo cuando el visitante mueve el control
      de la simulación.
    </P>
    <GainCost
      gain="Predictibilidad y bajo costo computacional: e se aplica en cada impacto con una multiplicación; no hay que almacenar trayectorias ni animar cada caso."
      cost="La restitución constante es una idealización: en la realidad e depende de la velocidad de impacto, el material y la deformación. El umbral restitutionThreshold existe justamente para que los rebotes infinitos terminen; si se elige mal, el rebote se siente artificial."
    />
    <P>
      La comparación con las alternativas (valores fijos, trayectorias
      precalculadas, animaciones guionizadas) muestra el balance: ganar
      generalidad y respuesta en vivo cuesta aceptar una idealización y calibrar
      el umbral.
    </P>
  </>
)

export const fuentes = (
  <Refs
    items={[
      {
        n: '6',
        body: (
          <>
            Bennett, J. y Meepagala, R. (2005). «Coefficients of Restitution», The Physics Factbook (ed. Glenn Elert).
            Mediciones de estudiantes en un sitio educativo, sin revisión de pares.{' '}
            <a href="https://hypertextbook.com/facts/2006/restitution.shtml" target="_blank" rel="noreferrer">
              hypertextbook.com/facts/2006/restitution.shtml
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '7',
        body: (
          <>
            Box2D 2.4.1, b2FixtureDef (restitution y restitutionThreshold). El valor por defecto de
            restitutionThreshold (1 m/s) se cita del código fuente, no de la página de b2FixtureDef.{' '}
            <a href="https://box2d.org/doc_version_2_4/structb2_fixture_def.html" target="_blank" rel="noreferrer">
              box2d.org/doc_version_2_4/structb2_fixture_def.html
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, conceptos 02 «Momento lineal», 06 «Tipos de colisión», 07 «Colisiones en una
            dimensión» y ejemplo resuelto «Choque elástico de masas distintas» (p. 26). Física I (FUN-18), Universidad
            CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)