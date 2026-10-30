import { useId, useState } from 'react';
import { tone as toneStyle } from './tone';
import { useItemFinderText } from './useItemFinderText';

function TraceToggle({ label, detail, tone, defaultOpen = false, children }) {
  const { text } = useItemFinderText();
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const action = open ? text.hideTrace : text.trace;

  return (
    <li className="if-bar rounded-lg border border-base-300 bg-base-100 p-3 pl-4" style={toneStyle(tone)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm">
          <span className="font-semibold">{label}</span>
          {detail ? <span className="ml-2 font-mono text-xs text-base-content/70">{detail}</span> : null}
        </div>
        <button
          type="button"
          className="btn btn-xs btn-outline"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={`${action}: ${label}`}
          onClick={() => setOpen((current) => !current)}
        >
          {action}
        </button>
      </div>
      {open ? (
        <div id={panelId} className="mt-3 border-l-2 border-dashed border-base-300 pl-4">
          {children}
        </div>
      ) : null}
    </li>
  );
}

export default TraceToggle;
