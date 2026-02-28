import "./menu.css";
import RSVPForm from "./RSVPForm";

export default function DiningRSVP() {
  return (
    <div className="min-h-screen w-screen bg-[#f7f7f7] flex flex-col items-center justify-center gap-4 px-4 py-16">
      <RSVPForm />
    </div>
  );
}
