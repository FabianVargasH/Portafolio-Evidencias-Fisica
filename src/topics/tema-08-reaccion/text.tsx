// src/topics/tema-08-reaccion/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      El telescopio espacial Hubble no usa propulsores para apuntar sus instrumentos: usa <strong>ruedas de reacción</strong>.
      Según ESA/Hubble, al girar una rueda en una dirección, el telescopio rota en la dirección opuesta [1]. Esto se debe a la
      conservación del momento angular: si no hay torque externo, el momento angular total del sistema (rueda + satélite) se
      mantiene constante.
    </P>
    <P>
      Las ecuaciones que gobiernan este intercambio son:
    </P>
    <Eq>
      L = Iω &nbsp;&nbsp;&nbsp; L<sub>rueda</sub> + L<sub>satélite</sub> = 0
    </Eq>
    <P>
      La justificación de usar ruedas de reacción en lugar de propulsores no es solo física, es de ingeniería: una razón
      práctica es que expulsar gases cerca de instrumentos ópticos sensibles puede ensuciarlos. Modelar la física permite
      calcular cuánto debe girar la rueda para lograr la orientación deseada sin gastar combustible.
    </P>
  </>
)

export const concepto = (
  <>
    <P>
      El momento angular de un cuerpo rígido que gira sobre un eje fijo es L = I·ω, como se vio en el Módulo 3 [M3].
      La conservación del momento angular establece que si el torque externo neto es cero, L se conserva.
    </P>
    <P>
      <strong>Caso numérico (valores supuestos propios, no del Hubble real):</strong> Si una rueda de inercia
      I<sub>rueda</sub> = 0,02 kg·m² gira a 3000 rpm (ω = 314 rad/s), su momento angular es L = 0,02 × 314 = 6,28 kg·m²/s.
      Si la inercia del satélite es I<sub>satélite</sub> = 12000 kg·m², la velocidad angular del satélite será
      ω<sub>satélite</sub> = −6,28 / 12000 = −0,00052 rad/s. El signo negativo indica que gira en sentido opuesto a la
      rueda. Equivale a unos 1,8° por minuto, unas tres veces más lento que el minutero de un reloj (6° por minuto), pero
      suficiente para apuntar con precisión durante largos periodos.
    </P>
    <P>
      <strong>Saturación:</strong> La rueda no puede acelerar indefinidamente. Cuando alcanza su límite de seguridad
      (velocidad máxima), se dice que está «saturada»: su momento angular ya no puede crecer. En ese momento, el Hubble usa{' '}
      <strong>barras de par magnético</strong> para generar un torque externo y descargar el momento acumulado, como
      explica ESA/Hubble [1].
    </P>
    <P>
      <strong>Conexión con otros temas:</strong> igual que en los choques del Tema 7, donde el momento lineal total se
      conserva y un cuerpo gana lo que el otro pierde, aquí el momento angular total se conserva y la rueda y el
      satélite se lo reparten con signo contrario. Y la relación ω = 2π/T del Tema 3 es la que convierte las rpm de la
      rueda en rad/s para calcular L = Iω.
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Usar propulsores para girar',
          text: 'Los propulsores expulsan masa para generar un torque, así que el combustible se agota y los gases de escape pueden ensuciar superficies sensibles. Modelar la conservación de L permite girar usando electricidad en lugar de propelente.',
        },
        {
          title: 'Ángulos de giro precalculados',
          text: 'Una tabla de giros fija solo sirve para una maniobra. Con L = Iω se calcula la velocidad de la rueda necesaria para cualquier ángulo y cualquier inercia, y se puede recalcular si cambia la orientación deseada.',
        },
        {
          title: 'No modelar la saturación',
          text: 'Si solo se modela el giro sin límite, el software asumiría que la rueda puede acelerar siempre. El modelo físico incluye L_máx = I·ω_máx, de modo que se sabe cuánto puede girar el satélite antes de necesitar las barras magnéticas.',
        },
      ]}
    />
    <GainCost
      gain="Modelar la conservación de L permite calcular cuánto debe girar la rueda para orientar el satélite usando solo electricidad, sin gastar combustible."
      cost="La rueda puede saturarse: si llega a su velocidad máxima, el satélite no puede girar más en esa dirección hasta que se use un torque externo (barras magnéticas). El modelo debe incluir este límite y el mecanismo de descarga. Además, el modelo de esta página es de un solo eje y usa valores supuestos; un satélite real tiene varias ruedas y ejes acoplados."
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
            ESA/Hubble, «Spacecraft». Descripción del uso de ruedas de reacción y barras de par magnético para el
            control de actitud.{' '}
            <a href="https://esahubble.org/about/general/spacecraft/" target="_blank" rel="noreferrer">
              esahubble.org/about/general/spacecraft/
            </a>
            . Consultado el 31 oct 2026.
          </>
        ),
      },
      {
        n: 'M3',
        body: (
          <>
            Módulo 3: Leyes de conservación, conceptos 20 «Momento angular de una partícula» y 21 «Momento angular de un
            cuerpo rígido». Física I (FUN-18), Universidad CENFOTEC, C3-2026.
          </>
        ),
      },
    ]}
  />
)