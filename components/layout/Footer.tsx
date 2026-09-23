export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050b09]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <h3 className="font-bold text-white">Zoology Atlas</h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              An interactive digital learning environment for exploring zoology,
              anatomy, taxonomy and comparative biology.
            </p>
          </div>

          <div className="text-sm text-zinc-600">
            Built for Zoology learners.
          </div>
        </div>
      </div>
    </footer>
  );
}
