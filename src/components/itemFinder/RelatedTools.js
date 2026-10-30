import { RELATED_TOOLS } from '../../content/itemFinder';
import Icon from './icons';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const TOOL_TONES = { erkul: 'energy', spviewer: 'quantum', scCraft: 'craft', scTrade: 'raw' };

function RelatedTools() {
  const { text } = useItemFinderText();

  return (
    <aside className="rounded-box border border-base-300 bg-base-100 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">{text.relatedTitle}</h2>
      <p className="mt-1 text-sm text-base-content/60">{text.relatedNote}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {RELATED_TOOLS.map((tool) => (
          <li key={tool.key}>
            <a
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              style={tone(TOOL_TONES[tool.key])}
              className="if-bar flex items-start justify-between gap-3 rounded-lg border border-base-300 p-3 pl-4 transition-colors hover:border-base-content/40 hover:bg-base-200/50"
            >
              <span>
                <span className="if-text block font-semibold">{tool.name}</span>
                <span className="block text-xs text-base-content/70">{text.related[tool.key]}</span>
              </span>
              <Icon name="external" className="mt-0.5 h-4 w-4 shrink-0 text-base-content/50" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default RelatedTools;
