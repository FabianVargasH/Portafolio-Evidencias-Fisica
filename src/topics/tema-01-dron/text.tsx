import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import type { TopicContent } from '../../types/topic'
import { AltCards, GainCost } from '../../components/ui/AltCards'

const L = ({ href, children }: { href: string; children: string }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
)

export const text: TopicContent = {
  'caso-de-uso': (
    <>
      <P>
        <strong>Sistema:</strong> PX4 Autopilot, software de piloto automático de código abierto para drones y otros vehículos no tripulados,
        alojado en la Dronecode Foundation, parte de la Linux Foundation [2]. 
        <br /><br />
        <strong>Industria:</strong> reparto con drones, donde un dron
        debe seguir una ruta de puntos sin que una persona lo pilote. No se afirma que una empresa concreta use PX4; el caso es el sistema
        que gobierna drones de este tipo.
      </P>
      <P>
        En su modo misión, PX4 recibe una lista de puntos de ruta y un generador de trayectoria calcula cómo debe moverse el dron en cada instante.
        Esa trayectoria se construye con curvas suaves en las que siempre se respetan los límites de aceleración y de jerk (la rapidez con que
        cambia la aceleración) [1].
      </P>
    </>
  ),

  concepto: (
    <>
      <P>Según el Módulo 1, la velocidad instantánea es la derivada de la posición y la aceleración es la derivada de la velocidad [M1]:</P>
      <Eq>v(t) = dr/dt = (dx/dt) î + (dy/dt) ĵ &nbsp;&nbsp;&nbsp; a(t) = dv/dt = d²r/dt²</Eq>
      <P>Cada tramo de la ruta es una recta con dirección unitaria u = (u<sub>x</sub>, u<sub>y</sub>), así que el movimiento se descompone en componentes:</P>
      <Eq>v<sub>x</sub> = v·u<sub>x</sub> &nbsp; v<sub>y</sub> = v·u<sub>y</sub> &nbsp;&nbsp; a<sub>x</sub> = a·u<sub>x</sub> &nbsp; a<sub>y</sub> = a·u<sub>y</sub></Eq>
      <P>A lo largo de cada tramo se aplican las ecuaciones del MRUA y del MRU [M1]:</P>
      <Eq>v = v<sub>0</sub> + a·t</Eq>
      <Eq>x = x<sub>0</sub> + v<sub>0</sub>·t + ½·a·t²</Eq>
      <Eq>v² = v<sub>0</sub>² + 2a·(x − x<sub>0</sub>)</Eq>
      <Eq>MRU (crucero): x = x<sub>0</sub> + v·t</Eq>
      <P>El jerk que limita PX4 se define como j = da/dt [1].</P>

      <h4>Caso numérico: tramo A → B (300 m)</h4>
      <P>
        Con v<sub>máx</sub> = 10 m/s y a = 2 m/s²: el dron tarda t = v/a = 5 s en alcanzar la velocidad máxima. De v² = 2a·Δx, la distancia
        de aceleración es Δx = 10²/(2·2) = 25 m, igual que la de frenado. Quedan 300 − 25 − 25 = 250 m a 10 m/s, es decir, 25 s de crucero.
        <br /><br />
        El tramo dura 5 + 25 + 5 = 35 s. Los tramos B → C (200 m) y C → D (300 m) duran 25 s y 35 s, para un total de 95 s.
      </P>

      <h4>Conexión con lo visto en clase</h4>
      <P>
        En el tramo C → D el dron va hacia −x: v<sub>x</sub> es negativa y, al frenar, a<sub>x</sub> es positiva. Velocidad y aceleración
        con signos opuestos es el movimiento retardado descrito en el Módulo 1 [M1]. Además, por la segunda ley de Newton, ΣF = m⋅a [M2],
        limitar la aceleración a 2 m/s² equivale a limitar la fuerza neta horizontal a 2m newtons, donde m es la masa del dron.
      </P>
    </>
  ),

  justificacion: (
    <>
      <P>Modelar la cinemática resuelve el problema mejor que tres alternativas no físicas:</P>
      <AltCards
        items={[
          {
            title: 'Velocidades fijas sin suavizado',
            text: 'La propia documentación de PX4 describe un modo que traduce las órdenes directamente en velocidades, sin suavizar, y lo presenta como útil para ajustar el control de velocidad, mientras que las misiones usan siempre la trayectoria suave [1]. Un salto brusco de velocidad exige una aceleración enorme y un movimiento poco controlado.',
          },
          {
            title: 'Trayectorias precalculadas',
            text: ['Habría que preparar una a mano por cada ruta. Con el modelo, cambiar los puntos de la ruta o los límites en ', <code key="c">data.ts</code>, ' regenera todo el perfil.'],
          },
          {
            title: 'Animaciones guionizadas',
            text: 'Muestran cómo se vería el vuelo, pero no garantizan que la aceleración respete un límite ni permiten comprobar, por ejemplo, que el dron llega a B a los 35 s.',
          },
        ]}
      />
      <GainCost
        gain="Un movimiento suave con límites de aceleración garantizados, que se adapta a cualquier ruta y se puede verificar con las ecuaciones."
        cost="Hay que elegir y ajustar los parámetros (velocidad y aceleración máximas), y el modelo no incluye viento, la masa de la carga ni la dinámica de los motores. Además, el perfil trapezoidal usado aquí cambia la aceleración de golpe, mientras que PX4 limita también el jerk [1]; por eso es una versión simplificada. (Esta valoración de costos es razonamiento propio.)"
      />
    </>
  ),
  
  fuentes: (
    <Refs items={[
      { n: '1', body: <>PX4 Development Team. <em>Multicopter Setpoint Tuning (Trajectory Generator)</em>. PX4 User Guide. <L href="https://docs.px4.io/main/en/config_mc/mc_trajectory_tuning.html">docs.px4.io/main/en/config_mc/mc_trajectory_tuning.html</L></> },
      { n: '2', body: <>PX4 Autopilot (repositorio oficial). <L href="https://github.com/px4/px4-autopilot">github.com/px4/px4-autopilot</L></> },
      { n: '3', body: <>Datos de las gráficas: cálculo propio con <code>kinematics.ts</code> a partir de la ruta declarada en el apartado de recurso de apoyo.</> },
      { n: 'M1', body: <>Universidad CENFOTEC. <em>Módulo 1. Cinemática</em>. Material del curso FUN-18 Física I.</> },
      { n: 'M2', body: <>Universidad CENFOTEC. <em>Módulo 2. Dinámica: fuerzas, trabajo y energía</em>. FUN-18 Física I.</> },
    ]} />
  ),
}