// src/topics/tema-08-reaccion/text.tsx
import Eq from '../../components/ui/Eq'
import { P, Li, Refs } from '../../components/ui/Cited'
import { AltCards, GainCost } from '../../components/ui/AltCards'

export const casoDeUso = (
  <>
    <P>
      El telescopio espacial Hubble no usa propulsores para apuntar sus instrumentos: usa <strong>ruedas de reacción</strong>.
      Según la NASA, al girar una rueda en una dirección, el telescopio rota en la dirección opuesta [8]. Esto se debe a la
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
      La justificación de usar ruedas de reacción en lugar de propulsores no es solo física, es de ingeniería: la ESA explica
      que los gases de escape de los propulsores podrían contaminar los espejos del telescopio. Modelar la física permite
      calcular exactamente cuánto debe girar la rueda para lograr la orientación deseada sin gastar combustible ni ensuciar
      los instrumentos.
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
      <strong>Caso numérico (el Hubble):</strong> Si una rueda de inercia I<sub>rueda</sub> = 0,02 kg·m² gira a 3000 rpm
      (ω = 314 rad/s), su momento angular es L = 0,02 × 314 = 6,28 kg·m²/s. Si la inercia del Hubble es
      I<sub>satélite</sub> = 12000 kg·m², la velocidad angular del telescopio será ω<sub>satélite</sub> = −6,28 / 12000 = −0,00052
      rad/s. El signo negativo indica que gira en sentido opuesto a la rueda. Es una rotación muy lenta (como el minutero de
      un reloj), pero suficiente para apuntar con precisión durante largos periodos.
    </P>
    <P>
      <strong>Saturación:</strong> La rueda no puede acelerar indefinidamente. Cuando alcanza su límite de seguridad
      (velocidad máxima), se dice que está «saturada». En ese momento, el Hubble usa <strong>barras de par magnético</strong>
      para generar un torque externo y descargar el momento acumulado, como explica la NASA [8].
    </P>
  </>
)

export const justificacion = (
  <>
    <AltCards
      items={[
        {
          title: 'Usar propulsores para girar',
          text: 'Los propulsores expulsan masa para generar un torque. El problema es que el gas de escape puede contaminar los espejos del telescopio y el combustible se agota. Modelar la conservación de L permite usar energía eléctrica (renovable) en lugar de propelente.',
        },
        {
          title: 'Ángulos de giro precalculados',
          text: 'Si se calcula la orientación de antemano, el satélite no puede corregir su rumbo si algo se desvía. El modelo físico lee los sensores en tiempo real y ajusta la rueda para mantener el apuntamiento.',
        },
        {
          title: 'No modelar la saturación',
          text: 'Si solo se modela el giro infinito, el software fallaría cuando la rueda llegue a su límite. El modelo físico incluye el estado de saturación y la necesidad de las barras magnéticas.',
        },
      ]}
    />
    <GainCost
      gain="Modelar la conservación de L permite girar el telescopio con precisión extrema usando solo electricidad, sin gastar combustible ni contaminar los instrumentos."
      cost="La rueda puede saturarse: si llega a su velocidad máxima, el satélite no puede girar más en esa dirección hasta que se use un torque externo (barras magnéticas). El modelo debe incluir este límite y el mecanismo de descarga."
    />
  </>
)

export const fuentes = (
  <Refs
    items={[
      {
        n: '8',
        body: (
          <>
            NASA/ESA. «Hubble's pointing control system» / «Reaction wheels». Explicación del uso de ruedas de reacción y
            barras de par magnético para el control de actitud.{' '}
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