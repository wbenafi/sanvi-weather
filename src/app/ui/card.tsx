export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-min min-w-[90%] max-w-2xl rounded-lg bg-white p-8 shadow-lg sm:min-w-0">
      {children}
    </div>
  );
}
