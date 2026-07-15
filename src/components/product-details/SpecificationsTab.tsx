const specifications = [
  {
    label: "Microcontroller",
    value: "ATmega2560",
  },
  {
    label: "Operating Voltage",
    value: "5V",
  },
  {
    label: "Input Voltage",
    value: "7V - 12V",
  },
  {
    label: "Digital I/O Pins",
    value: "54",
  },
  {
    label: "Analog Input Pins",
    value: "16",
  },
  {
    label: "Flash Memory",
    value: "256 KB",
  },
  {
    label: "SRAM",
    value: "8 KB",
  },
  {
    label: "EEPROM",
    value: "4 KB",
  },
  {
    label: "Clock Speed",
    value: "16 MHz",
  },
];

export default function SpecificationsTab() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">
        Technical Specifications
      </h2>

      <div className="overflow-hidden rounded-xl border text-gray-500">
        {specifications.map((item, index) => (
          <div
            key={item.label}
            className={`grid grid-cols-2 ${
              index !== specifications.length - 1
                ? "border-b"
                : ""
            }`}
          >
            <div className="bg-gray-50 px-6 py-4 font-medium">
              {item.label}
            </div>

            <div className="px-6 py-4">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}