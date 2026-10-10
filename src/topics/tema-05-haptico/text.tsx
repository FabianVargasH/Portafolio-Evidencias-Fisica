import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'

export const INSTANTE = '9:45'

export const casoDeUso = (
  <>
    <P>
      El control DualSense de la PlayStation 5 tiene gatillos adaptativos: la resistencia de L2 y R2 puede variarla el
      software del juego [2]. Los ejemplos típicos son tensar un arco, con una resistencia que crece al jalar, o frenar un
      auto [2]. Con el DualShock 4 casi no se sentía nada a lo largo del recorrido [4].
    </P>
    <P>
      El mecanismo, según los desarmes: una palanca, una rueda dentada y un tornillo sin fin movido por un motor eléctrico;
      cuando el motor coloca la palanca, el gatillo tiene que vencer esa interferencia [1]. La resistencia añadida es el
      torque del motor transmitido por esa cadena de engranajes, y un potenciómetro mide el giro del engranaje [2]. No hay
      un resorte que genere la fuerza.
    </P>
    <P>La física que sostiene el caso es la de un resorte, que el motor imita (el «resorte virtual»):</P>
    <Eq>F<sub>el,x</sub> = −kx</Eq>
    <P>
      Aviso sobre las fuentes: [1], [2] y [4] son artículos y desarmes de terceros, no documentación de Sony, y Sony no
      publica el algoritmo ni las curvas de fuerza. Todo lo que sigue sobre k y la forma de la curva es un modelo propio.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      Ley de Hooke [M2, §9]: un resorte ideal ejerce una fuerza que se opone a su deformación. Con x = 0 cuando no está
      deformado, k en N/m, y la fuerza apuntando hacia x = 0:
    </P>
    <Eq>F<sub>el,x</sub> = −kx</Eq>
    <P>
      Tercera ley [M2, §2]: la fuerza del dedo sobre el gatillo y la del gatillo sobre el dedo tienen igual magnitud y
      sentido opuesto, y actúan sobre cuerpos distintos. Lo que el jugador siente es la segunda de ellas.
    </P>
    <P>
      Modelo propio del efecto. Sin efecto, el gatillo es analógico normal y nada lo interfiere [1]; la retroalimentación
      puede introducirse o quitarse en cualquier punto del recorrido [1]. Lo represento como un resorte que empieza a actuar
      en x₀ (valor de diseño, no medido):
    </P>
    <Eq>F(x) = 0 &nbsp; si x ≤ x₀ &nbsp;&nbsp;&nbsp; F(x) = k(x − x₀) &nbsp; si x &gt; x₀</Eq>
    <P>
      Energía [M2]: para un resorte ideal, U<sub>el</sub> = ½kx², y al estirarlo lentamente la fuerza externa hace un trabajo
      positivo que queda almacenado como energía potencial elástica. En el gatillo virtual no tengo fuente que diga qué
      pasa con esa energía (si se disipa o la devuelve el motor), así que no lo afirmo; uso ½k(x − x₀)² solo como medida
      del trabajo que hace el dedo.
    </P>

    <h4>Caso numérico (valores propios): k = 300 N/m, x₀ = 6 mm, x = 15 mm</h4>
    <ul>
      <Li>1. Deformación efectiva: x − x₀ = 15 − 6 = 9 mm = 0,009 m</Li>
      <Li>2. Fuerza: F = k(x − x₀) = 300 × 0,009 = 2,7 N (opuesta al avance del dedo)</Li>
      <Li>3. Energía equivalente: ½ × 300 × 0,009² ≈ 0,0122 J ≈ 12 mJ</Li>
      <Li>4. Si se duplica k a 600 N/m, la fuerza se duplica (5,4 N), como indica la exploración del módulo [M2]</Li>
    </ul>
    <P>
      Como la fuerza cambia con x, la aceleración del dedo no es constante y no puede describirse con MRUA [M2]; es la
      misma idea del Tema 4, donde la fuerza dependía de variables (carga, temperatura). Aquí la variable es la posición.
    </P>
  </>
)

export const analisis = (
  <>
    <P>
      El clip muestra el módulo del gatillo del DualSense desarmado: la palanca, la rueda dentada y el tornillo sin fin
      del motor [1][2], en la franja 9:17 a 10:05 del video [3].
    </P>
    <P>
      Instante señalado: <strong>{INSTANTE}</strong>. En ese momento el gatillo llega al tope que mueve el motor; hasta
      entonces el recorrido es libre (F = 0) y desde ese punto, x₀, el movimiento ya no es libre. Esa es la posición donde,
      en el modelo, empieza la fuerza restauradora.
    </P>
    <P>
      Conexión con la ecuación: a partir de x₀ la oposición crece con el recorrido, F = k(x − x₀), y por la tercera ley es
      la fuerza que el gatillo hace sobre el dedo. La figura muestra esa curva fuerza-desplazamiento; con el deslizador de
      x₀ se ve cómo mover el punto donde el motor coloca el tope cambia dónde se siente el efecto.
    </P>
    <P>
      Límite: el video muestra el mecanismo, no la sensación ni los valores de fuerza. La curva es un modelo mío, no una
      medición de Sony.
    </P>
  </>
)

export const justificacion = (
  <>
    <P>
      Alternativa 1, vibración fija (el «rumble» del DualShock 4): no depende de la posición, por lo que no puede dar la
      sensación de que algo se tensa a medida que se jala [4].
    </P>
    <P>
      Alternativa 2, un resorte mecánico común: tiene una k fija, de modo que todos los juegos sentirían lo mismo. Con un
      motor, el software elige la fuerza y el punto de inicio, e incluso puede empujar de vuelta en cualquier punto del
      recorrido [1].
    </P>
    <P>
      Alternativa 3, un efecto guionizado en el tiempo (vibrar tantos milisegundos cuando ocurre un evento): no responde a
      si el jugador jala lento o rápido. Un modelo F(x) liga la fuerza a la posición, así que la sensación es coherente con
      lo que hace el dedo.
    </P>
    <P>
      Qué cuesta: hardware adicional en cada gatillo (motor, tornillo sin fin, engranajes y potenciómetro [2]) y un
      control por software. Además, el modelo F = k(x − x₀) es una idealización: un resorte real tiene Hooke lineal solo
      en su rango [M2], y el motor puede producir cualquier perfil, así que elegir la curva se vuelve una decisión de
      diseño.
    </P>
  </>
)

export const fuentes = (
  <Refs
    items={[
      {
        n: '1',
        body: (
          <>
            Papp, D., «How The PS5's Genuinely Clever Adaptive Triggers Work», Hackaday, 13 sep 2021.{' '}
            <a href="https://hackaday.com/2021/09/13/how-the-ps5s-genuinely-clever-adaptive-triggers-work/" target="_blank" rel="noreferrer">
              hackaday.com/2021/09/13/…
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '2',
        body: (
          <>
            «Teardown: Playstation 5 DualSense controller», Microcontroller Tips.{' '}
            <a href="https://www.microcontrollertips.com/tear-down-playstation-5-dualsense-controller-faq" target="_blank" rel="noreferrer">
              microcontrollertips.com/tear-down-playstation-5-dualsense-controller-faq
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '3',
        body: (
          <>
            TronicsFix, video de desarme del DualSense (YouTube), franja 9:17 a 10:05.{' '}
            <a href="https://www.youtube.com/watch?v=4rNITneXnCo&t=557s" target="_blank" rel="noreferrer">
              youtube.com/watch?v=4rNITneXnCo
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: '4',
        body: (
          <>
            «PS5 DualSense video reveals how its coolest feature works», Tom's Guide.{' '}
            <a href="https://www.tomsguide.com/news/ps5-dualsense-video-reveals-how-its-coolest-feature-works" target="_blank" rel="noreferrer">
              tomsguide.com/news/ps5-dualsense-video-reveals-how-its-coolest-feature-works
            </a>
            . Consultado el 10 oct 2026.
          </>
        ),
      },
      {
        n: 'M2',
        body: (
          <>
            Módulo 2: Dinámica, §2 «Tercera ley de Newton» y §9 «Fuerza elástica y ley de Hooke». Física I (FUN-18),
            Universidad CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)