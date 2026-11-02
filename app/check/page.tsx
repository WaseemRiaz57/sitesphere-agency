import type { Metadata } from "next";
import LocalSearchDemo from "../components/LocalSearchDemo";
import DeviceCheck from "./DeviceCheck";

export const metadata: Metadata = {
  title: "Device check | SiteSphere",
  robots: { index: false, follow: false },
};

// Hidden page for diagnosing animation problems on a specific phone.
export default function CheckPage() {
  return (
    <main className="mx-auto flex max-w-[30rem] flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-[-0.035em]">Device check</h1>
      <p className="text-ink-soft">
        Take one screenshot of this page with the map below visible and send it over.
      </p>
      <DeviceCheck />
      <LocalSearchDemo />
    </main>
  );
}
