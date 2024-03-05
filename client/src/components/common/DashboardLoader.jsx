import { waveform } from "ldrs";

waveform.register();

export default function DashboardLoader({}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50 inset-0 fixed z-50">
      <div>
        <l-waveform
          size="45"
          stroke="3.5"
          speed="1.1"
          color="white"
        ></l-waveform>
      </div>
    </div>
  );
}
