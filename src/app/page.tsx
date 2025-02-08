import { Suspense } from "react";
import Weather from "./ui/weather";
import Loading from "./loading";

export default function HomePage() {
  return (
    <main className="flex min-h-svh bg-gradient-to-b from-primary to-white p-5 items-center justify-center">
      <Suspense fallback={<Loading />}>
        <Weather />
      </Suspense>
    </main>
  );
}
