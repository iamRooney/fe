export default function DescriptionTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-500">
          Product Overview
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          The Arduino Mega 2560 is a microcontroller board based on the
          ATmega2560. It provides 54 digital input/output pins, 16 analog
          inputs, four UARTs, a 16 MHz crystal oscillator, USB connection,
          power jack, ICSP header, and a reset button. It is ideal for robotics,
          automation, IoT, and embedded system development.
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-6">
        <h3 className="mb-6 text-xl font-semibold text-gray-500">
          Key Features
        </h3>

        <ul className="grid grid-cols-2 gap-4 text-gray-500">
          <li>✔ ATmega2560 Microcontroller</li>
          <li>✔ 54 Digital I/O Pins</li>
          <li>✔ 16 Analog Inputs</li>
          <li>✔ USB Interface</li>
          <li>✔ 16 MHz Clock Speed</li>
          <li>✔ Compatible with Arduino IDE</li>
        </ul>
      </div>
    </div>
  );
}