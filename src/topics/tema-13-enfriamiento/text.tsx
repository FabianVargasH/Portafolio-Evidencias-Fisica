// src/topics/tema-13-enfriamiento/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'
import { DataTable } from '../../components/ui/DataTable'
import { STAGES, area, dMin, dropIdeal, pDyn, vel } from '../../lib/physics/coolant'

const A = ({ h, t }: { h: string; t: string }) => (
  <a href={h} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-text, var(--accent))' }}>{t}</a>
)
const f = (x: number, d: number) => x.toFixed(d).replace('.', ',')

export const casoDeUso = (
  <>
    <P>
      <b>Sistema:</b> el circuito de refrigeración líquida directa al chip de los racks de un centro de datos. Una unidad de
      distribución de refrigerante (CDU) alimenta un colector en cada rack, que reparte el líquido a los equipos de TI [2]. Las
      especificaciones de OCP piden que el colector entregue el caudal que necesita el equipo, con la caída de presión objetivo y
      una distribución uniforme dentro del rack, y que la velocidad no pase de los límites de erosión de ASHRAE [2].
    </P>
    <P>
      Tres ecuaciones dimensionan el circuito: el balance de calor fija el caudal, la continuidad fija el diámetro y Bernoulli
      da el cambio de presión entre secciones [7].
    </P>
    <Eq>Q = P / (ρ · c · ΔT) &nbsp;&nbsp;&nbsp; A₁v₁ = A₂v₂ = Q &nbsp;&nbsp;&nbsp; p₁ + ½ρv₁² = p₂ + ½ρv₂²</Eq>
    <P>
      Los datos del problema vienen de fuentes de la industria. Vertiv describe un ejemplo con 20 racks de 50 kW, de los cuales
      37,5 kW van al líquido, con unos 1,5 L/min por kW: 56,25 L/min por rack y 1 125 L/min en total [3]. La guía de OCP indica un
      objetivo de diseño de 10 °C de aumento de temperatura, equivalente a 1,5 L/min por kW, con un rango recomendado de 7,5 a
      12 °C (1,25 a 2,0 L/min por kW) para un refrigerante con 25 % de propilenglicol [1]. Chilldyne reporta que un servidor de 9 kW
      requiere 13 L/min y que un colector de rack de 600 L/min, en un tubo cuadrado de 75 mm, opera a 1,7 m/s con una caída de
      presión de 0,25 psi [4].
    </P>
    <P>
      Aviso sobre las fuentes: [1] a [5] son documentos de la industria (OCP, Vertiv, Chilldyne, h2x), no mediciones mías. El
      circuito que se calcula aquí (10 servidores por rack y los diámetros elegidos) es un ejemplo propio inspirado en el caso de [3],
      no el diseño de ningún fabricante.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      <b>Continuidad.</b> Para un líquido incompresible, el caudal volumétrico es Q = A·v y es el mismo en cualquier sección de
      un tubo sin derivaciones: si la sección se reduce, la velocidad aumenta [7] [M5].
    </P>
    <Eq>Q = A · v &nbsp;&nbsp;&nbsp; A₁v₁ = A₂v₂ &nbsp;&nbsp;&nbsp; v = 4Q / (πD²)</Eq>
    <P>
      <b>Bernoulli.</b> Es la conservación de energía en un fluido incompresible y sin fricción: en puntos a la misma altura,
      p₁ + ½ρv₁² = p₂ + ½ρv₂², así que donde el fluido se acelera la presión estática baja [7] (relación con el trabajo y la
      energía del [M2]).
    </P>
    <Eq>p₁ − p₂ = ½ρ (v₂² − v₁²)</Eq>
    <P>
      <b>Balance de calor.</b> El calor que se lleva el líquido es P = ṁ·c·ΔT = ρ·Q·c·ΔT, con ṁ el flujo de masa. Es la
      conservación de la energía del Tema 6 aplicada al refrigerante (cálculo propio). Con agua a 40 °C (ρ = 992,2 kg/m³ y
      c = 4 184 J/(kg·K)) [6]:
    </P>
    <Eq>Q = P / (ρ · c · ΔT)</Eq>
    <ul>
      <li>37,5 kW con ΔT = 10 K dan {f(54.2, 1)} L/min, un {f(3.6, 1)} % menos que los 56,25 L/min de [3]. La diferencia es esperable: la regla de 1,5 L/min por kW de [1] se basa en propilenglicol al 25 %, no en agua.</li>
      <li>9 kW con ΔT = 10 K dan {f(13.0, 1)} L/min, igual a los 13 L/min de [4].</li>
      <li>115 kW con ΔT = 20 K dan {f(83.1, 0)} L/min (22,0 gpm), que coincide con los 22 gpm que [5] da para un rack de clase GB200 NVL72.</li>
    </ul>
    <P>
      <b>Diámetro.</b> Despejando D de la continuidad con una velocidad máxima v<sub>máx</sub> se obtiene el diámetro mínimo. OCP
      cita límites de velocidad de 1,5 a 2,1 m/s según el diámetro, para evitar erosión [2]. Aquí se toma como criterio v<sub>máx</sub> = 1,5 m/s
      (elección propia, el extremo más estricto de ese rango):
    </P>
    <Eq>D<sub>mín</sub> = √( 4Q / (π · v<sub>máx</sub>) )</Eq>
    <P>
      Comprobación independiente: en el colector de [4], 600 L/min por un tubo cuadrado de 75 mm dan {f(600 / 60000 / (0.075 * 0.075), 2)} m/s
      con la continuidad, frente a los 1,7 m/s reportados (una diferencia del 4,7 %, razonable porque desconozco las
      dimensiones interiores exactas).
    </P>
    <P>
      Conexión con otros temas: Bernoulli y el balance de calor son conservación de energía, como el balance del frenado
      regenerativo del Tema 6, y el caudal que se dimensiona aquí es el que mueve el calor de los chips al exterior.
    </P>
  </>
)

export const justificacion = (
  <>
    <P>Hay tres alternativas no físicas para dimensionar el circuito, y cada una falla en algo que las ecuaciones resuelven:</P>
    <AltCards
      items={[
        {
          title: 'Valores fijos (una regla de L/min por kW)',
          text: 'La regla de 1,5 L/min por kW equivale a un aumento de 10 K; con 20 K, los chips necesitan la mitad [5]. Por eso un rack de clase GB200 NVL72 (115 kW al líquido) necesita unos 22 gpm con 20 K, no el flujo que daría la regla [5].',
        },
        {
          title: 'Trayectorias precalculadas (una tabla de diámetros por potencia de rack)',
          text: 'Habría que rehacerla para cada refrigerante, cada ΔT y cada límite de velocidad: entre agua y propilenglicol al 25 % ya hay una diferencia de caudal del 3,6 % en el ejemplo de [3]. Con las ecuaciones se recalcula en un paso.',
        },
        {
          title: 'Animaciones guionizadas (copiar el circuito de un diseño anterior)',
          text: 'Un plano copiado deja de servir cuando cambia la potencia del rack: pasar de 37,5 kW al líquido [3] a 115 kW [5] triplica el calor a extraer y cambia el caudal y los diámetros.',
        },
      ]}
    />
    <GainCost
      gain="Con tres ecuaciones se obtienen el caudal, el diámetro y la velocidad de cada tramo para cualquier potencia, ΔT y fluido, y el resultado se contrasta con tres cifras independientes: los 13 L/min de [4], los 22 gpm de [5] y la velocidad del colector de [4] (dentro del 5 %)."
      cost="Bernoulli ideal ignora la fricción y las pérdidas locales. En el ejemplo calculado, la caída por cambio de sección es de 0,12 a 0,52 kPa, mientras que [4] reporta 1,7 kPa en el colector y 1,8 psi (12,4 kPa) en la placa fría. La presión real la dominan las pérdidas, que requieren la ecuación de Darcy-Weisbach o datos del fabricante, y OCP usa como ejemplo una caída fija de 10 psi (unos 69 kPa) para calcular caudales de un chasis [1]. La continuidad tampoco garantiza una distribución uniforme entre servidores, que OCP exige aparte [2]. Y las propiedades cambian con el fluido y la temperatura."
    />
  </>
)

const rows = STAGES.map((s, i) => [
  `${i + 1}. ${s.name}`,
  f(s.q, s.q < 10 ? 3 : s.q < 100 ? 2 : 0),
  f(s.d, 0),
  f(area(s.d) * 1e4, 2),
  f(vel(s.q, s.d), 2),
  f(pDyn(vel(s.q, s.d)) / 1000, 2),
  f(dropIdeal(s) / 1000, 2),
  f(dMin(s.q, 1.5), 1),
])

export const recursoNota = (
  <>
    <DataTable
      caption="Circuito calculado (cálculo propio con los parámetros de la tabla siguiente)"
      head={['Etapa', 'Q (L/min)', 'D interior (mm)', 'A (cm²)', 'v (m/s)', '½ρv² (kPa)', 'Caída ideal vs. etapa 1 (kPa)', 'D mín. para 1,5 m/s (mm)']}
      rows={rows}
    />
    <P>
      Lectura: las cuatro etapas quedan por debajo de 1,5 m/s, el extremo más estricto de la franja de OCP [2]. En la etapa 4 el
      diámetro (9 mm) es casi el mínimo calculado (8,9 mm): un racor más angosto pasaría el límite. La presión estática ideal
      baja en cada etapa más rápida, pero en total menos de 0,6 kPa.
    </P>
    <DataTable
      caption="Parámetros del cálculo declarados, con su origen"
      head={['Parámetro', 'Valor', 'Origen']}
      rows={[
        ['Potencia por rack / calor al líquido', '50 kW / 37,5 kW', 'Dato citado [3]'],
        ['Racks por fila', '20', 'Dato citado [3]'],
        ['Caudal por kW al líquido (ΔT ≈ 10 K)', '1,5 L/min por kW', 'Dato citado [1][3]'],
        ['Servidores por rack', '10 (3,75 kW al líquido cada uno)', 'Supuesto propio'],
        ['Fluido', 'Agua a 40 °C: ρ = 992,2 kg/m³, c = 4 184 J/(kg·K)', 'Dato citado [6]; aproxima al propilenglicol de [1]'],
        ['Velocidad máxima', '1,5 m/s (franja de OCP: 1,5 a 2,1 m/s)', 'Franja citada [2]; criterio propio'],
        ['Diámetros interiores', '150, 32, 10 y 9 mm', 'Elección propia: no son medidas de un producto'],
        ['Modelo de presión', 'Altura constante y sin fricción', 'Supuesto propio (Bernoulli ideal)'],
      ]}
    />
    <P>
      <b>Origen de las gráficas.</b> Las dos gráficas y las tablas son de elaboración propia: se calculan con las ecuaciones de
      este tema y los datos citados, en <code>src/lib/physics/coolant.ts</code>. <b>Límites.</b> No consulté la tabla completa de
      ASHRAE que asigna un límite a cada diámetro: solo usé el extremo de 1,5 m/s que cita [2]. La gráfica de presión es ideal,
      sin fricción, y no representa la caída real del circuito.
    </P>
  </>
)

export const fuentes = (
  <Refs items={[
    { n: '1', body: <>Open Compute Project. <i>OAI System Liquid Cooling Guidelines</i> (aumento de 10 °C ≈ 1,5 L/min por kW, rango 1,25 a 2,0 L/min por kW). <A h="https://www.opencompute.org/documents/oai-system-liquid-cooling-guidelines-in-ocp-template-mar-3-2023-update-pdf/" t="opencompute.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '2', body: <>Open Compute Project. <i>ACS Liquid Cooling Cold Plate Requirements Document, Revision 1.0</i> (colector del rack y velocidades máximas de 1,5 a 2,1 m/s según ASHRAE). <A h="https://www.opencompute.org/documents/ocp-acs-liquid-cooling-cold-plate-requirements-pdf/" t="opencompute.org" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '3', body: <>Vertiv. <i>Deploying liquid cooling in the data center: a guide to high-density cooling</i> (ejemplo de 20 racks de 50 kW). <A h="https://www.vertiv.com/4926c8/globalassets/documents/white-papers/liquid-cooling/deploying-liquid-cooling-in-the-data-center-a-guide-to-high-density-cooling-white-paper.pdf" t="vertiv.com" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '4', body: <>Chilldyne. <i>High-power liquid cooling design: direct-to-chip solution requirements for 500 kW racks</i> (servidor de 9 kW y colector de 600 L/min). <A h="https://chilldyne.com/high-power-liquid-cooling-design-direct-to-chip-solution-requirements-for-500-kw-racks/" t="chilldyne.com" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '5', body: <>h2x Engineering. <i>Data Center Liquid Cooling Design for Direct-to-Chip Racks</i> (dimensionado por aumento de temperatura; rack de clase GB200 NVL72). <A h="https://www.h2xengineering.com/blogs/data-center-liquid-cooling/" t="h2xengineering.com" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '6', body: <>General Chemistry for Gee-Gees. <i>Appendix F: Water Properties</i> (densidad del agua a 40 °C y calor específico). <A h="https://ecampusontario.pressbooks.pub/genchemforgeegees/?p=1089" t="ecampusontario.pressbooks.pub" />. Consultado el 17 de noviembre de 2026.</> },
    { n: '7', body: <>OpenStax. <i>University Physics Volume 1</i>, capítulo 14, secciones 14.5 «Fluid Dynamics» (continuidad) y 14.6 «Bernoulli’s Equation». <A h="https://openstax.org/books/university-physics-volume-1/pages/14-5-fluid-dynamics" t="14.5" /> y <A h="https://openstax.org/books/university-physics-volume-1/pages/14-summary" t="resumen del capítulo 14" />. Consultado el 17 de noviembre de 2026.</> },
    { n: 'M2', body: <>Universidad CENFOTEC. <i>Módulo 2. Dinámica: fuerzas, trabajo y energía</i>. Material del curso FUN-18 Física 1</> },
    { n: 'M5', body: <>Universidad CENFOTEC. <i>Módulo 5. Mecánica de fluidos</i>. Material del curso FUN-18 Física 1</> },
  ]} />
)