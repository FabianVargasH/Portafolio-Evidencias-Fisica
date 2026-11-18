// src/components/sections/QueAprendi.tsx
import { Link } from 'react-router-dom'
import Eq from '../ui/Eq'
import { DataTable } from '../ui/DataTable'

const T = ({ n }: { n: number }) => <Link to={`/tema-${n}`}>Tema {n}</Link>

export default function QueAprendi() {
  return (
    <section id="que-aprendi" className="topic" aria-labelledby="que-aprendi-titulo">
      <p className="eyebrow">Cierre del portafolio</p>
      <h2 id="que-aprendi-titulo" className="title">Qué aprendí</h2>
      <p>
        Los trece temas parecen casos aislados (un videojuego, una sonda, un puente, un centro de datos), pero se repiten
        unos pocos principios. Esta sección tiene dos partes: (a) un mapa de tres conexiones entre temas muy distintos y
        (b) una aplicación propia que no está en la lista.
      </p>

      <h3>(a) El mapa de conexiones</h3>
      <DataTable
        caption="Tres pares de temas que comparten el mismo principio físico"
        head={['Par', 'Principio que los une', 'Ecuación común']}
        rows={[
          [<><T n={7} /> y <T n={9} /></>, 'Choque y conservación del momento lineal', 'e = (v₂f − v₁f) / (v₁i − v₂i)'],
          [<><T n={10} /> y <T n={12} /></>, 'Oscilador amortiguado, libre y forzado', 'm·x″ + b·x′ + k·x = F(t)'],
          [<><T n={3} /> y <T n={4} /></>, 'Aceleración centrípeta en movimiento circular', 'a_c = v²/r = ω²r'],
        ]}
      />

      <h4>Par 1 · <T n={7} /> y <T n={9} />: el choque como contabilidad de momento</h4>
      <p>
        Un motor de videojuego que hace rebotar una pelota y la Voyager 2 pasando junto a Júpiter obedecen la misma
        ecuación del coeficiente de restitución, junto con la conservación del momento lineal. En el marco del planeta la
        sonda «rebota» con e = 1, tal como lo plantea el Tema 9, y como el planeta es tan masivo que su velocidad casi no
        cambia, en el marco del Sol la rapidez de salida es la de entrada más 2V<sub>p</sub>: la cota de ≈ 26 km/s que se
        calculó con V<sub>p</sub> ≈ 13 km/s. Es la misma cuenta que la de una pelota que golpea una raqueta que viene hacia
        ella con rapidez V (cálculo propio, con la raqueta de masa muy grande):
      </p>
      <Eq>v<sub>f</sub> = e·u + (1 + e)·V</Eq>
      <p>
        Con e = 1, u = 3 m/s y V = 2 m/s la pelota sale a 7 m/s. Lo que parece «ganar velocidad gratis» es una
        transferencia de momento y energía desde un cuerpo mucho más masivo, y lo único que separa un rebote que se siente
        bien de uno que se siente mal es el valor de e, el control de la simulación del Tema 7.
      </p>

      <h4>Par 2 · <T n={10} /> y <T n={12} />: el mismo oscilador, libre o forzado</h4>
      <p>
        Una animación de iOS que se asienta en su destino y un puente que se agita al paso de una tropa son el mismo
        sistema, m·x″ + b·x′ + k·x = F(t), con ω₀ = √(k/m) y ζ = b / (2√(km)). En el Tema 10 no hay fuerza externa (F = 0) y
        la pregunta es cómo vuelve el elemento al equilibrio según ζ; en el Tema 12 se añade F(t) = F₀ sen(ωt) y la pregunta
        pasa a ser cuánto responde el sistema según qué tan cerca esté ω de ω₀. El parámetro que los une es ζ, y cumple dos
        papeles. Con ζ = 0,5 la animación del Tema 10 sobrepasa su destino 16,3 %, y ese mismo ζ en el Tema 12 da una
        amplificación en r = 1 de 1/(2ζ) = 1: en resonancia no supera el desplazamiento estático (cálculo propio con las
        fórmulas de ambos temas). Con ζ = 0,05, en cambio, la amplificación es 10. El diseñador de la interfaz elige ζ por
        cómo se ve el transitorio; el ingeniero de estructuras necesita conocer ζ antes de que llegue la excitación.
      </p>

      <h4>Par 3 · <T n={3} /> y <T n={4} />: la misma aceleración centrípeta, con distinto contacto que la pone</h4>
      <p>
        Una persona en un hábitat que gira y un auto de Fórmula 1 en una curva recorren un arco, así que ambos necesitan
        una fuerza neta hacia el centro, F = m·v²/r = m·ω²r. Lo que cambia es qué contacto la entrega. En el hábitat es la
        fuerza normal del piso, y por eso la persona la percibe como peso: con r = 200 m y ω ≈ 0,221 rad/s sale
        a<sub>c</sub> = 9,8 m/s² (1 g) con v ≈ 44,3 m/s. En la curva la entrega la fricción lateral de las llantas, limitada
        por f ≤ μN, de modo que en una curva plana, sin carga aerodinámica, la rapidez máxima es:
      </p>
      <Eq>v<sub>máx</sub> = √(μ·g·r)</Eq>
      <p>
        Con μ = 1,6 (valor ilustrativo del Tema 4) y r = 50 m, el valor por defecto del diagrama, sale v<sub>máx</sub> ≈ 28 m/s
        (cálculo propio). En el hábitat el límite es de diseño (cuántas rpm tolera el mareo); en la llanta es de agarre.
        La ecuación v²/r es la misma.
      </p>

           <h3>(b) La aplicación propia: predecir dónde está el rover mientras la telemetría se retrasa</h3>
      <p>
        En el Vision Rover Challenge de CENFOTEC, mi equipo programa rovers ESP32 con CircuitPython que ubican y transportan
        cubos usando visión artificial. El rover recibe por telemetría las posiciones de los rovers y de los cubos, y toma
        sus decisiones solo, dentro de la placa. El problema de software es que ese dato llega con retraso (el campo{' '}
        <code>age_ms</code>) y a veces desaparece, por ejemplo cuando el propio rover tapa el cubo. Si el programa trata la
        posición vieja como si fuera la actual, corrige el rumbo hacia un punto donde el rover ya no está.
      </p>
      <p>
        El concepto del curso que lo resuelve es la cinemática en dos dimensiones del <T n={1} />, con posición, velocidad y
        aceleración como vectores y descompuestos en componentes [M1]. Con las dos últimas muestras se estima la velocidad
        media, v ≈ (r₂ − r₁)/(t₂ − t₁), y se extrapola durante el retraso Δt, componente por componente:
      </p>
      <Eq>x(t + Δt) = x + vₓ·Δt + ½·aₓ·Δt² &nbsp;&nbsp;&nbsp; y(t + Δt) = y + v<sub>y</sub>·Δt + ½·a<sub>y</sub>·Δt²</Eq>
      <p>
        Lo más útil no es la fórmula sino el presupuesto de error. Si el modelo supone velocidad constante pero el rover
        acelera con a, el error es ½·a·Δt², cuadrático en el tiempo (valores supuestos propios, no medidos en el rover:
        v = 0,30 m/s y a = 0,5 m/s²):
      </p>
      <DataTable
        caption="Error de posición según el retraso Δt (cálculo propio, valores supuestos)"
        head={['Δt (s)', 'Si se congela la última posición, error = v·Δt (m)', 'Si se predice con velocidad constante y el rover acelera, error = ½·a·Δt² (m)']}
        rows={[
          ['0,25', '0,075', '0,016'],
          ['0,5', '0,150', '0,063'],
          ['1,0', '0,300', '0,250'],
          ['2,0', '0,600', '1,000'],
        ]}
      />
      <p>
        Para decidir cuándo dejar de confiar en la predicción se fija una tolerancia ε (por ejemplo, una fracción del lado del
        cubo) y se usa solo mientras ½·a<sub>máx</sub>·Δt² &lt; ε, es decir, Δt &lt; √(2ε / a<sub>máx</sub>). Con ε = 0,05 m y
        a<sub>máx</sub> = 0,5 m/s² son ≈ 0,45 s; pasado ese tiempo el rover debe frenar o esperar un dato nuevo.
      </p>
      <p>
        Frente a las alternativas no físicas, congelar la última posición deja un error v·Δt que crece sin parar, una
        trayectoria precalculada no se entera de que el rover se desvió, y esperar un dato nuevo detiene al robot. Modelar la
        cinemática da una estimación con una cota de error y cuesta unas pocas multiplicaciones, algo que cabe en una placa
        sin ayuda externa. El costo es real: la velocidad sale de restar posiciones ruidosas y restar amplifica el ruido;
        el modelo ignora los giros bruscos, y un error de rumbo δθ añade un error lateral ≈ v·Δt·δθ (con δθ = 5° y Δt = 0,5 s,
        ≈ 1,3 cm con estos valores). Por eso la predicción caduca y se corrige apenas llega el dato fresco: la cinemática no
        reemplaza a la cámara, cubre el hueco entre dos datos.
      </p>


    </section>
  )
}