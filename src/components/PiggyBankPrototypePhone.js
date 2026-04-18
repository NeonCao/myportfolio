const prototypeUrl =
  'https://www.figma.com/proto/k7p0X2Vt1cTOxzJtB4yNy7/Interactive-Piggy-bank---Ver2?node-id=1-327&t=98JW1J9hRCu010Z3-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A327&show-proto-sidebar=1';

const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`;

function PiggyBankPrototypePhone() {
  return (
    <section className="bg-base-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.08fr)]">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Prototype Preview</p>
            <h2 className="mt-3 text-4xl font-bold">Explore the final mobile concept inside the case study</h2>
            <p className="mt-5 leading-relaxed text-base-content/75">
              This embedded prototype lets you scroll through the Interactive Piggy Bank experience in a
              phone-sized frame, closer to how the concept was presented during the design process.
            </p>
            <p className="mt-4 leading-relaxed text-base-content/75">
              If Figma blocks the embed in your browser, the prototype is still available in a separate tab.
            </p>
            <div className="mt-6">
              <a
                href={prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-full px-6"
              >
                Open Figma Prototype
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-base-300 bg-base-200 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-white">
                <iframe
                  title="Interactive Piggy Bank Figma prototype"
                  src={embedUrl}
                  className="h-[720px] w-full border-0 bg-white"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PiggyBankPrototypePhone;
