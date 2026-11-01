import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'
import { DataTable } from '../../components/ui/DataTable'

export const casoDeUso = (
  <>
    <P>
      El Nissan Leaf incluye el sistema e-Pedal: según el manual del propietario, al activarlo se intensifica el freno
      regenerativo y el conductor regula la velocidad solo con el acelerador, de modo que al soltarlo el auto desacelera
      sin pisar el pedal de freno [4]. El manual describe ese comportamiento, no el algoritmo interno; lo que sí se puede
      afirmar es que cualquier control que reparta el frenado entre el motor (que genera electricidad) y los frenos de
      fricción necesita conocer cuánta energía hay que quitarle al vehículo en cada instante.
    </P>
    <P>
      Esa cuenta se hace con trabajo y energía cinética. Para el Leaf, Knoop calcula que al frenar de 80 km/h hasta
      detenerse con la regeneración máxima (80 kW) en 170 m, el 93 % de la energía se regenera y el resto se pierde por
      las resistencias [2]. Las ecuaciones que sostienen el caso son:
    </P>
    <Eq>
      E<sub>c</sub> = ½mv² &nbsp;&nbsp;&nbsp; W = ΔE<sub>c</sub> + W<sub>aire</sub> + W<sub>rod</sub>
    </Eq>
    <Eq>
      W<sub>aire</sub> = ∫ ½ρC<sub>d</sub>A v³ dt &nbsp;&nbsp;&nbsp; W<sub>rod</sub> = ∫ C<sub>r</sub>mg v dt &nbsp;&nbsp;&nbsp;
      E<sub>rec</sub> = η<sub>reg</sub> ∫ min(−P, P<sub>máx</sub>) dt
    </Eq>
    <P>
      W es el trabajo que en cada segundo deben hacer el motor o los frenos sobre las ruedas: si es positivo lo aporta el
      motor y si es negativo hay que quitar energía, y el motor puede absorber hasta P<sub>máx</sub> (la regeneración)
      mientras que el resto lo disipan los frenos de fricción. La gráfica de este tema aplica estas ecuaciones a un ciclo de
      conducción real.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      El trabajo neto sobre un cuerpo es igual a su cambio de energía cinética, W<sub>neto</sub> = K<sub>f</sub> − K<sub>i</sub>;
      el Módulo 3 usa exactamente esa relación para calcular el trabajo del mecanismo que acerca masas a un eje [M3]. Además,
      la energía cinética es una magnitud escalar que depende del cuadrado de la rapidez [M3]: duplicar la rapidez
      cuadruplica la energía que hay que quitar para detener el vehículo. Con la masa del Leaf [2], a 40 km/h son unos 94 kJ
      y a 80 km/h unos 376 kJ (cálculo propio).
    </P>
    <P>
      La energía no desaparece, se transforma. El Módulo 3 lo plantea para los choques inelásticos, donde la energía
      cinética pasa a deformación, calor o sonido y la energía total se conserva [M3]. En el frenado ocurre algo
      análogo: la energía cinética se convierte en electricidad si la absorbe el motor, y en calor si la absorben los
      frenos de fricción, el aire o la rodadura. La pregunta del tema, cuánta se recupera y cuánta se disipa, es un
      balance entre esos destinos.
    </P>
    <P>
      El ejemplo «Detener un carro» del Módulo 3 (2 kg que pasan de +3 m/s a reposo en 0,20 s) da J = −6 N·s y una fuerza
      media de −30 N [M3]. La energía cinética que se quita es ½(2)(3²) = 9 J (cálculo propio). Es el mismo balance a
      escala de juguete: en el Leaf a 80 km/h son unos 376 kJ [2].
    </P>

    <h4>Parámetros del modelo</h4>
    <DataTable
      head={['Parámetro', 'Valor', 'Origen']}
      rows={[
        ['Velocidad contra tiempo', 'UDDS, 1373 datos (0 a 1372 s)', '[1]'],
        ['Masa del vehículo (Nissan Leaf, modelo 2014)', '1525 kg', '[2]'],
        ['Coeficiente de arrastre C_d', '0,28', '[2]'],
        ['Área frontal A', '2,59 m²', '[2]'],
        ['Coeficiente de rodadura C_r (llantas eco)', '0,006', '[2]'],
        ['Potencia máxima de regeneración', '80 kW', '[2]'],
        ['Gravedad g', '9,81 m/s²', '[2]'],
        ['Densidad del aire ρ', '1,2 kg/m³', 'Propio, supuesto (en [2] aparece 1,3)'],
        ['Eficiencia de tracción (batería a ruedas)', '0,90', '[3]; solo accesible el resumen'],
        ['Eficiencia de regeneración (ruedas a batería)', '0,78', 'Propio: 0,90 × 0,78 ≈ 0,70, compatible con [3]'],
        ['Paso de tiempo del cálculo', '1 s', '[1]'],
      ]}
    />

    <h4>Caso numérico: una frenada de 80 km/h a 0</h4>
    <P>
      Con m = 1525 kg [2] y v = 80 km/h = 22,2 m/s:
    </P>
    <ul>
      <Li>1. Energía cinética: E<sub>c</sub> = ½(1525)(22,2)² ≈ 376 kJ ≈ 0,105 kWh (coincide con los 377 kJ de [2])</Li>
      <Li>2. Parte regenerada según [2]: 0,93 × 376 ≈ 350 kJ llegan al motor</Li>
      <Li>3. Con η<sub>reg</sub> = 0,78 (supuesto propio): 0,78 × 350 ≈ 273 kJ ≈ 0,076 kWh vuelven a la batería</Li>
      <Li>4. Mantener 80 km/h cuesta unos 7,5 kW según [2], así que esa energía alcanza para ≈ 36 s, unos 0,8 km (cálculo propio)</Li>
    </ul>
    <P>
      Es decir, cada parada fuerte devuelve una fracción pequeña pero repetible de energía, y en un ciclo urbano con 17
      paradas [5] esas fracciones se suman, como muestran las gráficas.
    </P>

    <h4>Conexión con otros temas</h4>
    <P>
      Tema 1: el perfil de velocidad del ciclo es el mismo tipo de dato que los perfiles de posición, velocidad y
      aceleración del dron; aquí la aceleración de cada segundo, a = Δv/Δt, alimenta el término ΔE<sub>c</sub> del balance.
      Tema 4: los frenos de fricción disipan en calor lo que el motor no puede absorber; con la regeneración completa, en el
      UDDS casi no se usan, y al limitar la potencia del motor con el deslizador, esa energía se desplaza hacia la fricción.
      Módulo 3: es la misma contabilidad de energía de los choques inelásticos, donde lo que no se conserva como energía
      cinética se transforma en otra forma [M3].
    </P>
    <P>
      Límites del modelo: no incluye accesorios, pendiente, viento, la reducción de la regeneración a baja velocidad ni los
      límites de la batería. Las cifras son un balance razonado para ver órdenes de magnitud, no una predicción del consumo
      del Leaf real.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Un porcentaje fijo de recuperación («se recupera el 70 %»)',
          text: 'Un porcentaje fijo no depende de cuánto se frena ni del límite de potencia del motor. En el modelo, la energía recuperada cambia al mover la potencia máxima de regeneración: en este ciclo, con 10 kW la batería recupera 0,42 kWh y con 80 kW recupera 0,53 kWh (cálculo propio con el UDDS). Un número fijo no puede mostrar ese efecto.',
        },
        {
          title: 'Una tabla de consumo medida para cada ciclo',
          text: 'Una tabla vale solo para el perfil de velocidad con el que se midió. Con las ecuaciones basta cambiar la entrada v(t) para obtener el balance de otro ciclo sin medirlo de nuevo; el UDDS elegido es un perfil público con 17 paradas [5] y mismos parámetros del auto.',
        },
        {
          title: 'Suponer que toda la energía cinética es recuperable',
          text: 'Si solo se calcula ½mv², se sobreestima lo que vuelve a la batería: durante la frenada el auto también pierde energía por aire y rodadura, y Knoop obtiene 93 % regenerado para una frenada de 80 km/h a 0 [2]. Además, el motor y la electrónica tienen pérdidas, y [3] mide un viaje de ida y vuelta de la regeneración de hasta 70 %.',
        },
      ]}
    />
    <GainCost
      gain="Una sola cadena de ecuaciones, trabajo y energía cinética más resistencias y eficiencias, responde para cualquier perfil de velocidad y para cualquier límite de potencia del motor. Permite repartir el balance entre lo recuperado, lo perdido en regeneración, lo disipado en frenos de fricción, el aire y la rodadura, y comprobar que cierra: en este tema, la suma de esas partes es exactamente la energía que entregó la batería. Esa transparencia es lo que un porcentaje fijo o una tabla no ofrecen."
      cost="Modelar la física exige parámetros del vehículo y supuestos de eficiencia que aquí son propios y están rotulados: la eficiencia de regeneración de 0,78 se eligió para ser compatible con el ≈ 70 % de ida y vuelta de [3], cuyo texto completo no pude consultar (solo el resumen), y la densidad del aire difiere de la de [2]. El modelo ignora accesorios, pendiente, viento, la regeneración reducida a baja velocidad y los límites de la batería, y trabaja con datos de 1 s. Un modelo más detallado necesita calibrarse con mediciones, y uno mal ajustado da una falsa sensación de precisión: por eso las cifras de esta página son órdenes de magnitud razonados, no una predicción del consumo real del Leaf."
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
            U.S. Government, «40 CFR Appendix I to Part 86 — Dynamometer Schedules», apartado (a): EPA Urban Dynamometer
            Driving Schedule. Versión de Cornell Law School (LII).{' '}
            <a href="https://www.law.cornell.edu/cfr/text/40/appendix-I_to_part_86" target="_blank" rel="noreferrer">
              law.cornell.edu/cfr/text/40/appendix-I_to_part_86
            </a>
            . Consultado el 31 oct 2026. La transcripción consultada tiene una errata en la fila del segundo 1218
            (aparece como «1318»); se corrigió en los datos.
          </>
        ),
      },
      {
        n: '2',
        body: (
          <>
            Knoop, V. L., «Electric Vehicles and Their Effect on Network Load», arXiv:1905.11654 (29 may 2019). Tabla 2 y
            sección 3.3. Preprint, sin revisión de pares confirmada.{' '}
            <a href="https://arxiv.org/pdf/1905.11654" target="_blank" rel="noreferrer">
              arxiv.org/pdf/1905.11654
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '3',
        body: (
          <>
            Boretti, A., «Analysis of the Regenerative Braking Efficiency of a Latest Electric Vehicle», SAE Technical
            Paper 2013-01-2872 (2013). Solo se consultó el resumen; el texto completo no está abierto.{' '}
            <a href="https://saemobilus.sae.org/content/2013-01-2872" target="_blank" rel="noreferrer">
              saemobilus.sae.org/content/2013-01-2872
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '4',
        body: (
          <>
            Nissan, «Nissan Leaf 2025 Owners Manual», sección 9.6.1 «e-Pedal system operation».{' '}
            <a
              href="https://www.nissan.com.cy/ownership/car-owner-manual/manuals/iom/leaf/0ze2/e0/2025/e-pedal-system-operation-1.shtml"
              target="_blank"
              rel="noreferrer"
            >
              nissan.com.cy/…/e-pedal-system-operation-1.shtml
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: '5',
        body: (
          <>
            NLR, «DriveCAT: Drive Cycle Analysis Tool». Fila del ciclo EPA FTP-72 (UDDS-LD / LA-4): 22,87 min, 7,45 mi,
            56,7 mph máxima, 17 paradas.{' '}
            <a href="https://nrel.gov/transportation/drive-cycle-tool" target="_blank" rel="noreferrer">
              nrel.gov/transportation/drive-cycle-tool
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, conceptos 02 «Momento lineal», 06 «Tipos de colisión» y 22 «Energía al
            redistribuir masa», y ejemplo resuelto «Detener un carro» (p. 25). Física I (FUN-18), Universidad CENFOTEC,
            C3-2026.
          </>
        ),
      },
    ]}
  />
)