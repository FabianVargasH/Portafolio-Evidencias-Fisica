// src/topics/tema-11-sintesis/text.tsx
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
      <b>Sistema:</b> la API Web Audio de los navegadores, que permite programar sintetizadores en una página web. Su nodo{' '}
      <code>OscillatorNode</code> genera una onda periódica y, con <code>createPeriodicWave(real, imag)</code>, el programador define
      el timbre dando los coeficientes de coseno (<code>real</code>) y de seno (<code>imag</code>) de cada armónico [1].
    </P>
    <P>
      La documentación explica que el navegador hace una transformada inversa de Fourier para obtener la onda en el tiempo, y que un
      solo componente a volumen completo en la fundamental produce una onda senoidal [1]. Eso es síntesis aditiva: la onda es la
      suma de armónicos con amplitudes elegidas.
    </P>
    <Eq>y(t) = Σ [ aₙ · cos(2π · n f₀ · t) + bₙ · sen(2π · n f₀ · t) ] &nbsp;&nbsp;&nbsp; fₙ = n · f₀</Eq>
    <P>
      Aquí f₀ es la frecuencia del oscilador (la nota) y aₙ, bₙ son los coeficientes del armónico n [1]. Las dos muestras de este
      tema usan solo senos (aₙ = 0) y Aₙ = bₙ. Cambiar Aₙ cambia el timbre y cambiar f₀ cambia la nota, sin tocar nada más.
    </P>
    <P>
      Aviso sobre las fuentes: [1] describe cómo la API define una onda, pero no dice qué coeficientes usa un instrumento
      concreto. Las amplitudes de las dos muestras son un modelo propio; no imitan a ningún instrumento real.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      Un tono puro es una onda armónica, y a una frecuencia f tiene período T = 1/f. Para la nota A4 de las muestras:
    </P>
    <Eq>y(t) = A · sen(2π f t) &nbsp;&nbsp;&nbsp; T = 1 / f = 1 / 440 Hz ≈ 2,27 ms</Eq>
    <P>
      Los sonidos de instrumentos tienen una fundamental y sobretonos cuyas frecuencias son múltiplos enteros de ella, y a todos
      juntos se les llama armónicos [2]. La fundamental y los sobretonos pueden estar presentes a la vez en distintas
      combinaciones, y por eso el do central de una trompeta suena distinto al de un clarinete [2]. En un instrumento de cuerda,
      la caja de resonancia amplifica el sonido y crea sobretonos que le dan su timbre característico [3].
    </P>
    <P>
      Como las ondas se superponen, el sonido con varios armónicos es la suma de sus componentes. Con amplitudes Aₙ:
    </P>
    <Eq>y(t) = Σₙ Aₙ · sen(2π · n f₀ · t) &nbsp;&nbsp;&nbsp; f₀ fija el tono; las razones Aₙ / A₁ fijan el timbre</Eq>
    <P>
      Intensidad. Los términos de cada armónico son ortogonales en un número entero de períodos, así que el valor eficaz de la
      señal es (cálculo propio):
    </P>
    <Eq>y<sub>rms</sub> = √( Σₙ Aₙ² / 2 )</Eq>
    <P>
      Esta fórmula permite comparar dos timbres con la misma energía: las dos muestras se normalizaron a y<sub>rms</sub> = 0,200.
    </P>
    <DataTable
      caption="Amplitudes medidas en los archivos .wav (ventana de 0,5 s a 1,5 s; cálculo propio)"
      head={['n', 'fₙ (Hz)', 'Aₙ muestra A', 'Aₙ muestra B']}
      rows={[
        ['1', '440', '0,2697', '0,2261'],
        ['2', '880', '0,0809', '0,1130'],
        ['3', '1 320', '0,0270', '0,0754'],
        ['4', '1 760', 'menos de 0,0001', '0,0565'],
        ['12', '5 280', 'menos de 0,0001', '0,0188'],
      ]}
    />
    <P>
      En la muestra A, A₂/A₁ = 0,30 y A₃/A₁ = 0,10, y no hay más armónicos. En la muestra B, Aₙ/A₁ = 1/n hasta n = 12. Con
      esos coeficientes la suma de senos se acerca a una rampa descendente que se repite cada período, el llamado diente de sierra
      (resultado estándar de las series de Fourier).
    </P>
    <P>
      Conexión con otros temas: cada armónico es una oscilación sinusoidal como la del resorte del Tema 10, y el cuerpo resonante
      de un instrumento [3] es el tipo de sistema con frecuencias naturales que se estudia en el Tema 12. Visto desde el curso, es
      una aplicación de las ondas y de la superposición [M4].
    </P>
  </>
)

export const justificacion = (
  <>
    <P>Hay tres alternativas no físicas para producir el sonido de una nota con un timbre dado, y cada una falla en algo que el modelo de armónicos resuelve:</P>
    <AltCards
      items={[
        {
          title: 'Valores fijos (una sola forma de onda)',
          text: 'Si solo existe una onda senoidal, todos los sonidos tienen un único timbre: con solo la fundamental a volumen completo se obtiene una senoide [1]. Cambian el tono y el volumen, pero no el carácter del sonido.',
        },
        {
          title: 'Trayectorias precalculadas (una grabación por nota y por instrumento)',
          text: 'Habría que guardar un archivo por cada combinación de nota y timbre. Con coeficientes, el mismo juego de Aₙ sirve para cualquier nota: al cambiar la frecuencia del oscilador, la onda periódica se desplaza con ella [1].',
        },
        {
          title: 'Animaciones guionizadas (un clip de audio ya mezclado)',
          text: 'Un clip fijo no permite que el jugador o el músico cambie la nota o el timbre en vivo. Con el modelo, el programa puede recalcular la onda al mover un control, como el brillo de un sintetizador.',
        },
      ]}
    />
    <GainCost
      gain="Una lista corta de amplitudes (en las muestras, 3 y 12 números) describe un timbre completo, y la misma lista sirve para toda la escala musical [1]. Las diferencias de timbre se pueden medir (razones Aₙ/A₁, centroide espectral) en vez de describirse con adjetivos."
      cost="El modelo es el de un sonido estrictamente periódico y estable. Un instrumento real tiene ataque, ruido y variaciones en el tiempo; en las muestras, solo se añadió una entrada lineal de 50 ms y una salida de 200 ms, que no modelan ningún instrumento [2][3]. Además, con 44 100 muestras por segundo solo se pueden representar frecuencias hasta 22 050 Hz: en una nota de 4 000 Hz solo caben 5 armónicos, y el resto debe eliminarse para evitar distorsión por aliasing. Y calcular la onda cuesta tiempo de procesamiento: el navegador hace una transformada inversa de Fourier para cada oscilador [1]."
    />
  </>
)

export const analisis = (
  <>
    <h4>Análisis: qué diferencia produce qué</h4>
    <P>
      <b>1. Mismo tono.</b> En la gráfica de forma de onda, las dos muestras cruzan el cero hacia arriba en los mismos instantes
      (t ≈ 2,29; 4,56; 6,83 y 9,09 ms desde t = 1,000 s), es decir cada 2,27 ms, que es T = 1/f₀ con f₀ = 440 Hz. En el
      espectro, el primer armónico de ambas está en 440 Hz. Frecuencia igual significa tono igual.
    </P>
    <P>
      <b>2. Misma intensidad, distinta fundamental.</b> Las dos tienen y<sub>rms</sub> = 0,200, que coincide con √(ΣAₙ²/2): en la
      muestra A, √((0,2697² + 0,0809² + 0,0270²)/2) = 0,200. Pero la fundamental de A (0,270) es mayor que la de B (0,226),
      porque B reparte la misma energía entre 12 armónicos.
    </P>
    <P>
      <b>3. Forma de onda.</b> La muestra A es casi una senoide: máximo de +0,304 en t = 0,36 ms y mínimo de −0,304 en 1,91 ms,
      simétrica. La muestra B sube a +0,391 apenas empieza el período (t = 0,09 ms), baja casi en línea recta hasta −0,388 en
      t = 2,18 ms y vuelve a subir de golpe. Cerca de t = 4,56 ms el salto entre dos muestras consecutivas es de 0,169, cinco veces el
      máximo de la muestra A (0,032). Un cambio tan brusco solo se logra sumando armónicos altos.
    </P>
    <P>
      <b>4. Contenido armónico.</b> A concentra su energía en tres armónicos (440, 880 y 1 320 Hz) con razones 1 : 0,30 : 0,10, y
      desde 1 760 Hz ya no hay componentes medibles. B tiene componentes hasta 5 280 Hz con razones 1/n. Como descriptor del
      «brillo», el centroide espectral Σfₙ·Aₙ / ΣAₙ (calculado con los 12 armónicos) vale 597 Hz en A y 1 701 Hz en B, unas 2,8 veces más.
    </P>
    <P>
      <b>5. Conclusión.</b> Con el mismo f₀ y la misma intensidad, lo que cambia el timbre son las razones Aₙ/A₁. Más armónicos
      altos producen una forma de onda con cambios más bruscos, y al escuchar, la muestra B suena más brillante y áspera que la A.
    </P>
  </>
)

export const recursoNota = (
  <>
    <P>
      <b>Origen de las muestras y de los datos.</b> Los dos archivos de audio, la forma de onda y el espectro son de elaboración
      propia: el script <code>scripts/generate-timbres.mjs</code> del repositorio sintetiza los <code>.wav</code> y luego lee esos
      mismos archivos para medir los armónicos y extraer los cuatro períodos graficados. No hay audio ni datos de terceros.
    </P>
    <P>
      <b>Límites.</b> Las amplitudes de A y B son supuestos de diseño, no mediciones de instrumentos. Las cifras vienen de una
      ventana de 1,0 s, que contiene exactamente 440 períodos, y se redondean a 4 decimales.
    </P>
  </>
)

export const fuentes = (
  <Refs items={[
    { n: '1', body: <>MDN Web Docs. <i>BaseAudioContext: createPeriodicWave() method</i> (coeficientes real e imag, transformada inversa de Fourier, onda senoidal con solo la fundamental). <A h="https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createPeriodicWave" t="developer.mozilla.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '2', body: <>OpenStax. <i>College Physics 2e</i>, sección 17.5, «Sound Interference and Resonance: Standing Waves in Air Columns» (fundamental, sobretonos y armónicos). <A h="https://openstax.org/books/college-physics-2e/pages/17-5-sound-interference-and-resonance-standing-waves-in-air-columns" t="openstax.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '3', body: <>OpenStax. <i>University Physics Volume 1</i>, sección 17.5, «Sources of Musical Sound» (caja de resonancia y timbre). <A h="https://openstax.org/books/university-physics-volume-1/pages/17-5-sources-of-musical-sound" t="openstax.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: 'M4', body: <>Universidad CENFOTEC. <i>Módulo 4. Oscilaciones</i>. Material del curso FUN-18 Física 1</> },
  ]} />
)