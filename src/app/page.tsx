import { CareerInstrument } from "@/components/CareerInstrument";
import { Connect } from "@/components/Connect";
import { InstrumentPanel } from "@/components/InstrumentPanel";

export default function Home() {
  return (
    <main className="flex-1 bg-panel-950">
      <h1 className="sr-only">
        Astha Prajapati, Assistant General Manager at Eagle Pressure Systems
      </h1>
      <CareerInstrument />
      <InstrumentPanel />
      <Connect />
    </main>
  );
}
