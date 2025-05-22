import Hand from "@/components/handpose/Hand";
import Head from "next/head";
import usePresetMeta from "@/lib/meta";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      {usePresetMeta()}
      <Hand />
    </div>
  );
}
