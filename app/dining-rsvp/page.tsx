import "./menu.css";
import RSVPForm from "./RSVPForm";

export default function DiningRSVP() {
  return (
    <div className="fixed inset-0 w-screen overflow-y-auto bg-[#f7f7f7]">
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 py-16">
        <RSVPForm />
      </div>
    </div>
  );
}
