import SceneLoader from "../components/SceneLoader";
import RSVPForm from "./RSVPForm";

export default function DiningRSVP() {
  return (
    <div className="min-h-screen h-screen w-screen bg-[#88E2FD]">
      <SceneLoader />
      <div className="font-sans absolute top-1/2 left-1/2 -translate-1/2 bg-white p-2 text-2xl">
        2月20日より予約受付開始いたします
      </div>
      <div className="hidden">
        <RSVPForm />
      </div>
    </div>
  );
}
