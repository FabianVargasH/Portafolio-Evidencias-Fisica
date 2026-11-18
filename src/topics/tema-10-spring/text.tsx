// src/topics/tema-10-spring/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'
import { DataTable } from '../../components/ui/DataTable'

const A = ({ h, t }: { h: string; t: string }) => (
  <a href={h} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text, var(--accent))' }}>{t}</a>
)

export const casoDeUso = (
  <>
    <P>
      <b>Producto:</b> Motion (antes Framer Motion), la biblioteca de animación para React y JavaScript, y las animaciones de
      resorte de iOS (SwiftUI, UIKit y Core Animation) [1][3].
    </P>
    <P>
      En vez de pedir «mueve esta tarjeta en 300 ms», estas herramientas permiten declarar qué resorte tira del elemento hacia su
      destino. En Motion se escribe <code>transition={'{{ type: "spring", stiffness: 100 }}'}</code>, y las animaciones de resorte
      basadas en física se definen con rigidez, amortiguamiento y masa e incorporan la velocidad de cualquier gesto o animación en
      curso [1]. Apple describe el mismo movimiento con la masa del objeto, la rigidez del resorte y el amortiguamiento, y su
      sesión de WWDC23 incluye el modelo <code>Spring(mass: 1, stiffness: 100, damping: 10)</code> [3].
    </P>
    <P>La física que hay detrás es la del oscilador amortiguado: una fuerza elástica hacia el destino y otra que frena el movimiento.</P>
    <Eq>m · x″ + c · x′ + k · x = 0</Eq>
    <P>
      Aquí x es la distancia al destino, k la rigidez, c el coeficiente de amortiguamiento y m la masa. El código de Motion calcula
      la razón de amortiguamiento como <code>damping / (2 · √(stiffness · mass))</code> [2], es decir:
    </P>
    <Eq>ζ = c / (2 · √(k · m))</Eq>
    <P>
      Con los valores del ejemplo de Apple (m = 1, k = 100, c = 10) resulta ζ = 0,5: el elemento sobrepasa su destino y vuelve.
      Con c = 20 llega sin rebote en el menor tiempo posible, y con c = 40 llega más lento y también sin rebote [4]. Esos tres
      números son los que se verifican en la simulación de este tema.
    </P>
    <P>
      Aviso sobre las fuentes: [1] y [3] son documentación y una charla oficiales, pero ninguna publica el código de cada
      animación del sistema. Los valores de k, c y m de la simulación y las cifras calculadas son un modelo propio, no mediciones
      de iOS ni de Motion.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      Segunda ley de Newton aplicada al elemento animado [M2]. Sobre él actúan la fuerza elástica de la ley de Hooke, la misma
      F = −kx del Tema 5, y una fuerza de amortiguamiento proporcional a la velocidad y opuesta a ella:
    </P>
    <Eq>m · a = −k · x − c · v &nbsp;&nbsp;&nbsp; ⇒ &nbsp;&nbsp;&nbsp; x″ + 2ζω₀ · x′ + ω₀² · x = 0</Eq>
    <Eq>ω₀ = √(k / m) &nbsp;&nbsp;&nbsp; c<sub>crít</sub> = 2 · √(k · m) &nbsp;&nbsp;&nbsp; ζ = c / c<sub>crít</sub></Eq>
    <P>
      ω₀ es la frecuencia angular natural (la del resorte sin amortiguar) y c<sub>crít</sub> el amortiguamiento que separa los
      regímenes [4]. Para un elemento que parte a x(0) = X₀ del destino y en reposo (v₀ = 0), la solución depende de ζ:
    </P>
    <ul>
      <Li><b>Subamortiguado (ζ &lt; 1).</b> Oscila con amplitud decreciente alrededor del destino [4]. Con ω<sub>d</sub> = ω₀√(1 − ζ²):</Li>
    </ul>
    <Eq>x(t) = X₀ · e<sup>−ζω₀t</sup> · [cos(ω<sub>d</sub>t) + (ζω₀ / ω<sub>d</sub>) · sen(ω<sub>d</sub>t)]</Eq>
    <ul>
      <Li><b>Crítico (ζ = 1).</b> Vuelve al equilibrio en el menor tiempo posible y sin oscilar [4].</Li>
    </ul>
    <Eq>x(t) = X₀ · e<sup>−ω₀t</sup> · (1 + ω₀t)</Eq>
    <ul>
      <Li><b>Sobreamortiguado (ζ &gt; 1).</b> No oscila, pero se acerca más despacio que el caso crítico [4]. Con s<sub>1,2</sub> = −ω₀(ζ ∓ √(ζ² − 1)):</Li>
    </ul>
    <Eq>x(t) = X₀ · (s<sub>1</sub> e<sup>s₂t</sup> − s<sub>2</sub> e<sup>s₁t</sup>) / (s<sub>1</sub> − s<sub>2</sub>)</Eq>
    <P>
      Dos resultados estándar del caso subamortiguado, que se obtienen de la solución anterior, sirven para diseñar. El
      sobreimpulso (cuánto pasa del destino, como fracción del recorrido) y el tiempo en que la envolvente e<sup>−ζω₀t</sup> cae a
      una banda de ±2 %:
    </P>
    <Eq>M<sub>p</sub> = exp(−πζ / √(1 − ζ²)) &nbsp;&nbsp;&nbsp; t<sub>s</sub> ≈ ln(50) / (ζω₀) ≈ 3,9 / (ζω₀)</Eq>
    <P>
      Del lado de las interfaces, Apple fija m = 1 y define la rigidez a partir de la duración como k = (2π / duración)² [3]. Como
      ω₀ = √k con m = 1, la «duración» de Apple equivale a 2π/ω₀, el período del resorte sin amortiguar. En Motion, un{' '}
      <code>bounce</code> de 0 corresponde al caso crítico y un valor negativo al sobreamortiguado [1]. Por eso las dos
      empresas ofrecen duración y bounce como una forma más fácil de elegir (ω₀, ζ).
    </P>
    <P>
      Ejemplo calculado con k = 100 N/m y m = 1 kg (ω₀ = 10 rad/s; el valor exacto de t<sub>s</sub> viene de la solución analítica
      y el de M<sub>p</sub> de la fórmula anterior):
    </P>
    <DataTable
      caption="Tres amortiguamientos con el mismo resorte (cálculo propio)"
      head={['c (N·s/m)', 'ζ', 'Régimen', 'Sobreimpulso', 'Asentamiento (±2 %)']}
      rows={[
        ['10', '0,50', 'Subamortiguado', '16,3 %, en t = π/ω_d ≈ 0,36 s', '0,81 s'],
        ['20', '1,00', 'Crítico', '0 %', '0,59 s'],
        ['40', '2,00', 'Sobreamortiguado', '0 %', '1,49 s'],
      ]}
    />
    <P>
      Contra la intuición, más amortiguamiento no siempre es más rápido: el caso crítico llega antes que el subamortiguado y que
      el sobreamortiguado. El valor ζ ≈ 0,5 del primer renglón deja el rebote visible pero tarda 0,81 s en asentarse dentro
      del 2 %.
    </P>
    <P>
      Conexión con otros temas: la fuerza elástica es la del resorte virtual del Tema 5, aquí con un término más que depende de
      la velocidad. ω₀ reaparece como la frecuencia natural del Tema 12, donde una fuerza externa periódica puede hacer crecer
      la amplitud. Visto desde el curso, es una aplicación del movimiento oscilatorio [M4].
    </P>
  </>
)

export const justificacion = (
  <>
    <P>Hay tres alternativas no físicas para animar un elemento hacia un destino, y cada una falla en algo que el resorte resuelve:</P>
    <AltCards
      items={[
        {
          title: 'Valores fijos (una duración y una curva de easing)',
          text: 'Una animación de tipo tween se define con una duración y una función de easing [1]. Su curva no depende de la velocidad que traía el elemento: Motion y Apple señalan que el resorte, en cambio, parte con la velocidad del gesto o de la animación anterior [1][3].',
        },
        {
          title: 'Trayectorias precalculadas (una tabla de posiciones por fotograma)',
          text: 'La tabla vale para una distancia, una masa y una velocidad inicial. Si cambia el destino a mitad de camino o el usuario suelta el gesto con otra velocidad, hay que volver a calcularla; la ecuación de x(t) se evalúa para cualquier estado inicial.',
        },
        {
          title: 'Animaciones guionizadas (el movimiento es un clip)',
          text: 'Un clip con tiempos fijos no reacciona si se interrumpe. En el modelo físico el estado (x, v) se conserva al cambiar el destino y el movimiento sigue desde ahí, sin saltos.',
        },
      ]}
    />
    <GainCost
      gain="Tres números (k, c y m) describen cómo se mueve cualquier elemento a cualquier distancia, y el movimiento hereda la velocidad previa [1][3]. Cambiar solo c da el rebote (ζ < 1), la llegada más rápida sin rebote (ζ = 1) o una llegada lenta (ζ > 1). Apple aclara que los resortes sin rebote se usan en muchas animaciones de iOS, no solo los que rebotan [3]."
      cost="La duración no se fija directamente: sale de ζ y ω₀. Con k = 100 y m = 1, subir c de 20 a 40 multiplica el tiempo de asentamiento por 2,5 (de 0,59 s a 1,49 s). Por eso Apple y Motion añadieron duración y bounce [1][3], que son otra forma de elegir los mismos parámetros. Además la solución nunca llega exactamente a 0: Motion termina la animación con umbrales de reposo (restSpeed 0,1 y restDelta 0,01 por defecto) [1]. Si el bucle integra por pasos de tiempo, el error numérico también cambia el resultado: en la simulación, ζ = 0,5 se asienta en 0,81 s con la solución analítica y en 0,73 s con integración a 60 fotogramas por segundo. Por último, k, c y m no corresponden a ningún objeto real: Apple reconoce que inventar esos valores para modificar la curva no es sencillo [3]."
    />
  </>
)

export const recursoNota = (
  <>
    <P>
      <b>Qué probar.</b> Con k = 100, m = 1 y los botones de ajuste, vuelve a calcular la tabla del Tema: c = 10 da el rebote del
      16,3 %, c = 20 el caso crítico y c = 40 el sobreamortiguado. Activa «Mostrar integración por fotogramas» para comparar la
      solución analítica con un bucle a 60 fotogramas por segundo.
    </P>
    <P>
      <b>Supuestos y límites.</b> Parte siempre del reposo, con amortiguamiento lineal en la velocidad y un recorrido normalizado a
      100 %. No modela la velocidad heredada de un gesto ni los umbrales de reposo de Motion [1]; el tiempo de asentamiento usa una banda de ±2 %,
      elegida por mí. La «duración equivalente» es 2π/ω₀, deducida de la conversión de Apple [3].
    </P>
  </>
)

export const fuentes = (
  <Refs items={[
    { n: '1', body: <>Motion. <i>React transitions</i> (documentación de transiciones, resortes basados en física y en duración, restSpeed y restDelta). <A h="https://motion.dev/docs/react-transitions" t="motion.dev/docs/react-transitions" />. Consultado el 16 de noviembre de 2026.</> },
    { n: '2', body: <>motiondivision/motion (GitHub). Pull request n.º 3757, <i>Treat invalid or undefined spring physics as absent</i>, que describe el generador de resortes (razón de amortiguamiento y ramas por régimen). <A h="https://github.com/motiondivision/motion/pull/3757" t="github.com/motiondivision/motion/pull/3757" />. Consultado el 16 de noviembre de 2026.</> },
    { n: '3', body: <>Apple. <i>Animate with springs</i>, WWDC23, sesión 10158 (masa, rigidez, amortiguamiento, duración y bounce, y conversión de parámetros). <A h="https://developer.apple.com/la/videos/play/wwdc2023/10158/" t="developer.apple.com/videos/play/wwdc2023/10158" />. Consultado el 16 de noviembre de 2026.</> },
    { n: '4', body: <>OpenStax. <i>University Physics Volume 1</i>, sección 15.5, «Damped Oscillations» (regímenes subamortiguado, crítico y sobreamortiguado). <A h="https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations" t="openstax.org" />. Consultado el 16 de noviembre de 2026.</> },
    { n: 'M2', body: <>Universidad CENFOTEC. <i>Módulo 2. Dinámica: fuerzas, trabajo y energía</i>. Material del curso FUN-18 Física 1</> },
    { n: 'M4', body: <>Universidad CENFOTEC. <i>Módulo 4. Oscilaciones</i>. Material del curso FUN-18 Física 1</> },
  ]} />
)