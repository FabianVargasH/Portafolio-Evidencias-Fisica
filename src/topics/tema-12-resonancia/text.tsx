// src/topics/tema-12-resonancia/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'
import { DataTable } from '../../components/ui/DataTable'

const A = ({ h, t }: { h: string; t: string }) => (
  <a href={h} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text, var(--accent))' }}>{t}</a>
)

export const casoDeUso = (
  <>
    <P>
      <b>Sistema:</b> OpenSees, el software de simulación estructural de la Universidad de California en Berkeley. Su comando{' '}
      <code>eigen</code> calcula el período y la frecuencia natural de una estructura a partir de su modelo [4]. En el ejemplo
      oficial de un marco de dos pisos, el programa obtiene los valores propios λ y de ahí calcula la frecuencia angular, la
      frecuencia y el período [5]. Es un problema de valores propios generalizado entre la matriz de rigidez K y la de masa M [6]:
    </P>
    <Eq>(K − ω² M) · φ = 0 &nbsp;&nbsp;&nbsp; λ = ω² &nbsp;&nbsp;&nbsp; f = ω / (2π) &nbsp;&nbsp;&nbsp; T = 2π / ω</Eq>
    <P>
      El resultado sirve para comparar las frecuencias naturales de la estructura con las frecuencias de lo que la excita (viento,
      pasos, maquinaria). La razón está en la amplitud de una oscilación forzada, que crece cuando la frecuencia de la fuerza se
      acerca a la natural [3]:
    </P>
    <Eq>A = F₀ / √( m² (ω² − ω₀²)² + b² ω² ) &nbsp;&nbsp;&nbsp; ω₀ = √(k / m)</Eq>
    <P>
      Aviso sobre las fuentes: [4], [5] y [6] documentan cómo calcula OpenSees las frecuencias naturales y usan un marco de aula,
      no el puente de Tacoma. No afirmo que OpenSees se haya usado para ese puente; el puente es el caso histórico que muestra por
      qué importa la frecuencia natural y también sus límites.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      Oscilación forzada [M4]. Si sobre un oscilador amortiguado actúa una fuerza periódica F₀ sen(ωt), la ecuación es la del
      Tema 10 más el término de excitación [3]:
    </P>
    <Eq>m · x″ + b · x′ + k · x = F₀ · sen(ωt)</Eq>
    <P>
      Pasados los transitorios, el oscilador queda en un estado estacionario con la frecuencia de la fuerza y una amplitud A que
      depende de qué tan cerca esté ω de la frecuencia natural ω₀. Cuando ω = ω₀ ocurre la resonancia y la amplitud es máxima [3]:
    </P>
    <Eq>A<sub>máx</sub> = F₀ / (b · ω) &nbsp;&nbsp;&nbsp; si ω = ω₀</Eq>
    <P>
      Esa amplitud está limitada por el amortiguamiento b; si b tendiera a 0, la amplitud tendería a infinito [3]. Con k = mω₀² y
      b = 2ζmω₀ (los parámetros del Tema 10), la misma ecuación queda en una forma adimensional, que es la que se grafica
      (cálculo propio), con r = ω/ω₀ y A<sub>est</sub> = F₀/k, el desplazamiento si la fuerza fuera constante:
    </P>
    <Eq>A / A<sub>est</sub> = 1 / √( (1 − r²)² + (2ζr)² ) &nbsp;&nbsp;&nbsp; en r = 1: &nbsp; A / A<sub>est</sub> = 1 / (2ζ)</Eq>
    <DataTable
      caption="Amplificación A/A_est según el amortiguamiento (cálculo propio)"
      head={['ζ', 'r = 0,5', 'r = 0,9', 'r = 1,0', 'r = 1,1', 'r = 2,0']}
      rows={[
        ['0,05', '1,33', '4,76', '10,00', '4,22', '0,33'],
        ['0,10', '1,32', '3,82', '5,00', '3,29', '0,33'],
        ['0,30', '1,24', '1,75', '1,67', '1,44', '0,31'],
      ]}
    />
    <P>
      Un amortiguamiento pequeño (ζ = 0,05) multiplica por 10 el desplazamiento estático justo en la frecuencia natural, y
      lejos de ella (r = 0,5 o r = 2) casi no hay amplificación. Aumentar ζ a 0,30 baja el pico a 1,67.
    </P>
    <P>
      <b>Por qué las tropas rompen el paso.</b> Un grupo marchando al compás aplica una fuerza periódica con la frecuencia de su
      paso. Si esa frecuencia se acerca a la natural del puente, la fuerza pequeña puede producir un movimiento grande [3][8]. El
      caso histórico es el del puente colgante de Broughton, que se derrumbó en 1831 mientras cruzaba una tropa; atribuido a la
      resonancia, llevó al ejército británico a ordenar «romper el paso» en los puentes [7]. Aun así, la investigación concluyó
      que la vibración precipitó la falla de un perno que habría fallado de todos modos [7].
    </P>
    <P>
      <b>Atención con Tacoma.</b> Los textos de Halliday y Resnick de los años sesenta presentaron el puente de Tacoma como
      ejemplo de resonancia, pero Physics Today señala que autores posteriores rechazaron esa explicación [2]. Por eso el análisis
      del video separa lo que sí es resonancia forzada (las tropas) de lo que ocurrió en Tacoma.
    </P>
    <P>
      Conexión con otros temas: ω₀ y ζ son los parámetros del resorte amortiguado del Tema 10, y la caja de resonancia de un
      instrumento del Tema 11 es otro sistema cuya respuesta depende de frecuencias naturales. Aquí se añade la fuerza externa.
    </P>
  </>
)

export const justificacion = (
  <>
    <P>Hay tres alternativas no físicas para evitar una falla por oscilaciones en una estructura, y cada una falla en algo que el análisis modal resuelve:</P>
    <AltCards
      items={[
        {
          title: 'Valores fijos (una regla única de frecuencia mínima)',
          text: 'La frecuencia natural es √(k/m) y cambia con la rigidez y la masa de cada diseño [3]. Un umbral fijo no sirve para un puente corto y liviano y para uno largo y pesado a la vez.',
        },
        {
          title: 'Trayectorias precalculadas (una tabla de frecuencias de puentes ya construidos)',
          text: 'Solo cubre diseños parecidos a los de la tabla. Con un modelo nuevo, OpenSees recalcula las frecuencias y los modos a partir de K y M [4][6].',
        },
        {
          title: 'Animaciones guionizadas (un video del fenómeno)',
          text: 'Un video como el de este tema enseña qué pasó, pero no permite probar un diseño nuevo ni cambiar el amortiguamiento para ver cuánto baja el pico.',
        },
      ]}
    />
    <GainCost
      gain="El cálculo da las frecuencias y la forma de cada modo (por ejemplo, vertical o torsional) para cualquier modelo, y se compara con las frecuencias de la excitación [4][5]. Con la curva de resonancia se ve el efecto del amortiguamiento: con ζ = 0,05 el pico es 10 veces el desplazamiento estático y con ζ = 0,30 es 1,67 veces."
      cost="El modelo supone que la excitación es una fuerza externa que no depende del movimiento. En Tacoma, el análisis de las frecuencias naturales no habría bastado: la amplificación aerodinámica de la torsión crece con la velocidad del viento y no se comporta como una resonancia [2]. Los puentes actuales se construyen rígidos y con mecanismos que amortiguan las oscilaciones, y algunos incluyen una ranura en el centro de la calzada para aliviar las diferencias de presión [2]. Además, los valores de masa y rigidez del modelo son estimaciones y cambian la frecuencia calculada."
    />
  </>
)

export const analisis = (
  <>
    <h4>Análisis: frecuencia natural, fuente de la excitación y crecimiento de la amplitud</h4>
    <P>
      <b>1. Aspecto concreto que se observa.</b> En las tomas del puente retorcido, la calzada gira alrededor de su línea central:
      un lado sube mientras el otro baja y la línea central casi no se desplaza. Es el modo torsional, y esa línea inmóvil se
      llama línea nodal [2]. Es distinto del movimiento vertical que el puente mostró durante meses y hasta pasadas las 10:00 del
      7 de noviembre de 1940; entonces Farquharson notó un cambio súbito a la torsión, que el puente resistió cerca de una hora
      hasta que a las 11:02 se desprendió un tramo de unos 183 m (600 pies) [2]. La ficha del video menciona al hombre que intenta
      rescatar a un perro atrapado en un automóvil en el puente [1].
    </P>
    <P>
      <b>2. Frecuencia.</b> Con un cronómetro, Farquharson midió para las últimas oscilaciones 12 ciclos por minuto, es decir un
      período de 5 s [2]:
    </P>
    <Eq>f = 12 / 60 s = 0,20 Hz &nbsp;&nbsp;&nbsp; T = 1 / f = 5,0 s &nbsp;&nbsp;&nbsp; ω = 2πf ≈ 1,26 rad/s</Eq>
    <DataTable
      caption="Frecuencia de la torsión según la fuente"
      head={['Fuente', 'Frecuencia', 'Período']}
      rows={[
        ['Cronómetro de Farquharson, 7 nov 1940 [2]', '12 ciclos/min = 0,20 Hz', '5,0 s'],
        ['Videos convertidos de la película, mirados con cronómetro [2]', '18 ciclos/min = 0,30 Hz', '3,3 s'],
      ]}
    />
    <P>
      Por eso no medí el período en el video incrustado: según Physics Today, la conversión de la película de 16 fotogramas por
      segundo a video asumió 24, y los formatos de video muestran la torsión un 50 % más rápida que la real [2]. De este video no
      se documenta qué velocidad tiene su copia [1]. Con poco amortiguamiento, una estructura oscila cerca de su frecuencia natural
      (ω<sub>d</sub> ≈ ω₀, Tema 10), así que 0,20 Hz es el orden de magnitud de la frecuencia natural torsional; es inferencia
      mía, el artículo no la llama así.
    </P>
    <P>
      <b>3. Fuente de la excitación.</b> El viento: la ficha del video habla de un viento de 42 millas por hora (unos 67,6 km/h)
      [1], dentro de una tormenta [2]. A diferencia de las tropas, las fuentes citadas no describen una fuerza periódica externa
      sintonizada con 0,20 Hz. Feldman halló que, para el modo torsional, la amplitud no mostraba un comportamiento de resonancia
      respecto a la velocidad del viento, y Billah y Scanlan atribuyeron la falla a una amplificación de la torsión que, a
      diferencia de una resonancia, aumenta de forma monótona con el viento [2]. Un elemento clave son los vórtices grandes que se
      forman sobre y bajo la calzada [2]. Wikipedia atribuye el colapso, posiblemente, a efectos aeroelásticos [9].
    </P>
    <P>
      <b>4. Por qué crece la amplitud.</b> Una oscilación crece cuando, en cada ciclo, entra más energía de la que se disipa. En la
      resonancia forzada de las tropas, la fuerza empuja con la frecuencia natural y la amplitud aumenta en cada oscilación mientras
      se mantenga la excitación, limitada por b [3]. En Tacoma, la fuerza del viento depende del propio movimiento de la calzada.
      Un modelo ilustrativo propio lo representa como un amortiguamiento que el viento reduce:
    </P>
    <Eq>m · x″ + (c − c<sub>a</sub>(U)) · x′ + k · x = 0 &nbsp;&nbsp;&nbsp; envolvente ∝ e<sup>+αt</sup>, &nbsp; α = (c<sub>a</sub> − c) / (2m)</Eq>
    <P>
      Aquí c<sub>a</sub>(U) es un término aerodinámico que supongo creciente con la velocidad del viento U. Si c<sub>a</sub> &gt; c,
      el amortiguamiento neto es negativo y la amplitud crece exponencialmente (la envolvente del Tema 10 con signo contrario)
      hasta que la estructura falla. Eso es coherente con una amplificación que aumenta con el viento [2], pero es una
      simplificación mía: la aerodinámica real es complicada [2].
    </P>
    <P>
      <b>5. Conclusión.</b> El video muestra un caso de amplitud creciente por entrada de energía, pero según las fuentes citadas
      no es resonancia clásica con una fuerza periódica sintonizada, como el paso de las tropas [2][3]. Lo que sí comparten es el
      criterio de diseño: conocer la frecuencia natural y el amortiguamiento, que es lo que calcula el software del caso de uso.
    </P>
  </>
)

export const recursoNota = (
  <>
    <P>
      <b>Origen del video y de la gráfica.</b> El video es un archivo de dominio público de Internet Archive, incrustado desde su
      reproductor oficial [1]. La curva de resonancia es de elaboración propia a partir de la ecuación de [3]; los valores de ζ
      son ilustrativos y no son los del puente de Tacoma.
    </P>
    <P>
      <b>Límites.</b> No cronometré el video por la advertencia de velocidad de [2]. La ecuación del punto 4 es un modelo
      ilustrativo, no una medición ni la explicación completa del colapso.
    </P>
  </>
)

export const fuentes = (
  <Refs items={[
    { n: '1', body: <>Internet Archive. <i>Tacoma Narrows Bridge Collapse (Standard 4:3)</i>, Stillman Fires Collection; Tacoma Fire Department, 1940, dominio público. <A h="https://archive.org/details/CEP176" t="archive.org/details/CEP176" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '2', body: <>Olson, D. W., Wolf, S. F. y Hook, J. M. «The Tacoma Narrows Bridge collapse». <i>Physics Today</i>, 68(11), 64–65, noviembre de 2015. <A h="https://legacy-www.math.harvard.edu/archive/21b_fall_03/tacoma/physicstoday.pdf" t="legacy-www.math.harvard.edu" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '3', body: <>OpenStax. <i>University Physics Volume 1</i>, sección 15.6, «Forced Oscillations» (oscilación forzada, amplitud y resonancia). <A h="https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations" t="openstax.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '4', body: <>OpenSees, Universidad de California en Berkeley. <i>User Manual: Determine Natural Period &amp; Frequency</i> (comando <code>eigen</code>). <A h="https://opensees.berkeley.edu/OpenSees/manuals/usermanual/841.htm" t="opensees.berkeley.edu" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '5', body: <>OpenSees Wiki. <i>Eigen analysis of a two-story one-bay frame</i> (cálculo de ω, f y T a partir de los valores propios). <A h="https://opensees.berkeley.edu/wiki/index.php/Eigen_analysis_of_a_two-story_one-bay_frame" t="opensees.berkeley.edu/wiki" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '6', body: <>OpenSeesPy Solvers. <i>Getting started</i>, sección «Generalized eigenvalue analysis» (problema (K − λM)Φ = 0 con ω = √λ). <A h="https://openseespy-solvers.readthedocs.io/en/stable/getting-started/" t="openseespy-solvers.readthedocs.io" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '7', body: <>Wikipedia. <i>Broughton Suspension Bridge</i> (derrumbe de 1831 y orden de «romper el paso»). <A h="https://en.wikipedia.org/wiki/Broughton_Suspension_Bridge" t="en.wikipedia.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '8', body: <>Live Science. <i>Why Do Soldiers Break Stride On A Bridge?</i> <A h="https://www.livescience.com/34608-break-stride-frequency-of-vibration.html" t="livescience.com" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '9', body: <>Wikipedia. <i>Tacoma Narrows Bridge</i> (el puente original colapsó posiblemente por efectos aeroelásticos). <A h="https://en.wikipedia.org/wiki/Tacoma_Narrows_Bridge" t="en.wikipedia.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: 'M4', body: <>Universidad CENFOTEC. <i>Módulo 4. Oscilaciones</i>. Material del curso FUN-18 Física 1</> },
  ]} />
)