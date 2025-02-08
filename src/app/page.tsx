import Weather from "./ui/weather";

export default function HomePage() {
  return (
    <main className="flex min-h-svh bg-gradient-to-b from-primary to-white p-5 items-center justify-center">
      <Weather />
    </main>
  );
}
