import type { TopicContent } from '../../types/topic'
import Eq from '../../components/ui/Eq'
import JumpSim from './JumpSim'
import { P, Li, Refs } from '../../components/ui/Cited'

const A = ({ h, t }: { h: string; t: string }) => (
  <a href={h} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text, var(--accent))' }}>{t}</a>
)

export const content: TopicContent = {
  'caso-de-uso': (
    <>
      <P><b>Producto:</b> <i>Super Mario Bros.</i> (Nintendo), un juego de plataformas 2D en el que el salto es la mecánica central.</P>
      <P>
        El salto de Mario no es una animación guionizada: en cada fotograma el juego suma una gravedad a la velocidad vertical
        y luego mueve al personaje con esa velocidad. La gravedad tampoco es un valor único. En <i>Super Mario Bros.</i> depende
        del salto más reciente (caminando, corriendo o parado) y se conserva hasta que Mario vuelve a saltar. En <i>Super Mario Bros. 3</i>,
        cuyo código desensamblado está documentado, se aplica una gravedad menor mientras el botón de salto sigue presionado y una mayor
        al soltarlo o al caer, y la potencia del impulso crece con la velocidad horizontal. De ahí salen el salto de altura variable
        y la sensación de caer más rápido de lo que se sube.
      </P>
      <P>
        Además, el valor numérico no es el de la Tierra: una estimación publicada en una revista de estudiantes de la Universidad de
        Leicester, basada en medir el salto respecto de la altura del personaje, obtiene una gravedad cercana a 91 m/s². Es una
        estimación, porque el juego no trabaja en metros, pero ilustra que los diseñadores eligen la gravedad que da buena jugabilidad y no la real.
      </P>
    </>
  ),
  concepto: (
    <>
      <P>El salto es un tiro parabólico: movimiento uniforme en horizontal y movimiento uniformemente acelerado en vertical (Módulo 1) .</P>
      <Eq>x = vₓ · t</Eq>
      <Eq>vᵧ = v₀ᵧ − g↑ · t &nbsp;&nbsp;&nbsp; y = v₀ᵧ · t − ½ · g↑ · t²</Eq>
      <P>Con vᵧ = 0 en la cima, se obtienen la altura máxima y el tiempo de subida:</P>
      <Eq>h = v₀ᵧ² / (2 · g↑) &nbsp;&nbsp;&nbsp; tₛ = v₀ᵧ / g↑</Eq>
      <P>La caída parte del reposo vertical en la cima y usa su propia gravedad g↓, por eso el tiempo de bajada y el total son:</P>
      <Eq>t↓ = √(2h / g↓) &nbsp;&nbsp;&nbsp; T = tₛ + t↓ &nbsp;&nbsp;&nbsp; R = vₓ · T</Eq>
      <P>
        Los diseñadores suelen pensar al revés: fijan la altura h y el tiempo hasta la cima tₛ que quieren sentir, y de ahí despejan
        el impulso y la gravedad:
      </P>
      <Eq>g = 2h / tₛ² &nbsp;&nbsp;&nbsp; v₀ᵧ = 2h / tₛ</Eq>
      <P>
        Ejemplo ilustrativo (no son valores del juego): para h = 2,5 m y tₛ = 0,5 s resultan g = 20 m/s² y v₀ᵧ = 10 m/s. Con ese mismo
        impulso y g = 9,81 m/s², el salto llegaría a unos 5,10 m y tardaría unos 1,02 s en subir: el doble de alto y de lento.
      </P>
      <P>
        En la dinámica del Módulo 2, g es la aceleración que produce el peso, P = mg, y por la segunda ley ΣF = ma la masa se cancela [M2].
        Por eso el juego puede asignar directamente una aceleración sin modelar la masa del personaje.
      </P>
      <P>
        El juego integra por fotogramas, sumando la gravedad a la velocidad en cada paso [3], y guarda la posición vertical con subpíxeles
        para representar fracciones [1]. La simulación usa la solución analítica del Módulo 1, que coincide con esa suma cuando el paso de tiempo es pequeño.
      </P>
    </>
  ),
  justificacion: (
    <>
      <P>Hay tres alternativas no físicas para hacer saltar a un personaje, y cada una falla en algo que el modelo de gravedad resuelve:</P>
      <ul>
        <Li><b>Valores fijos</b> (el salto siempre sube lo mismo): no permite salto de altura variable ni que el impulso dependa de la carrera, como en <i>Super Mario Bros. 3</i> [3].</Li>
        <Li><b>Trayectorias precalculadas</b> (una tabla de alturas por fotograma): hay que rehacer la tabla cada vez que cambia la velocidad horizontal, la gravedad o la altura deseada.</Li>
        <Li><b>Animaciones guionizadas</b> (el salto es un clip): no reaccionan si se suelta el botón a mitad del salto ni si Mario cae desde una plataforma.</Li>
      </ul>
      <P>
        Con el modelo, cambiar tres números (impulso, g↑ y g↓) reproduce todos esos comportamientos, y el diseñador puede afinar la
        jugabilidad con las ecuaciones de la sección anterior. Hasta el cambio de gravedad según el estado del personaje [1] es solo
        elegir otro valor de g.
      </P>
      <P>
        <b>Qué cuesta:</b> hay que calibrar. Una gravedad realista (9,81 m/s²) da saltos flotantes e imprecisos para el control, como muestra
        la curva punteada de la simulación, así que se "falsea" la física con valores mucho mayores [2]. También hay que decidir cuántas gravedades
        usar y cuándo cambiarlas, algo que un clip animado no exige. Es un modelo simple, pero deliberadamente distinto del real.
      </P>
    </>
  ),
  recurso: <JumpSim />,
  fuentes: (
    <Refs items={[
      { n: '1', body: <>TASVideos. Envío n.º 7094, <i>NES Super Mario Bros. "minimum A presses"</i>. <A h="https://tasvideos.org/7094S" t="https://tasvideos.org/7094S" />. Consultado el 10 de octubre de 2026.</> },
      { n: '2', body: <><i>Journal of Physics Special Topics</i>, University of Leicester. "Super Mario's Super Muscle". <A h="https://journals.le.ac.uk/index.php/pst/article/download/4860/4886/17664" t="journals.le.ac.uk" />. Consultado el 10 de octubre de 2026.</> },
      { n: '3', body: <>Data Crystal. <i>Super Mario Bros. 3/Notes</i>. <A h="https://datacrystal.tcrf.net/wiki/Super_Mario_Bros._3/Notes" t="datacrystal.tcrf.net" />. Consultado el 10 de octubre de 2026.</> },
      { n: 'M1', body: <>Universidad CENFOTEC. <i>Módulo 1. Cinemática</i>. Material del curso FUN-18 Física 1</> },
      { n: 'M2', body: <>Universidad CENFOTEC. <i>Módulo 2. Dinámica: fuerzas, trabajo y energía</i>. Material del curso FUN-18 Física 1</> },
    ]} />
  ),
}