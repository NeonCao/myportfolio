import { FAN_DISCLAIMER } from '../../content/itemFinder';
import { SHOW_ITEM_IMAGES } from '../../services/itemFinder/images';
import { useItemFinderText } from './useItemFinderText';

const LINKS = [
  { key: 'creditWiki', href: 'https://api.star-citizen.wiki' },
  { key: 'creditUex', href: 'https://uexcorp.space' },
  { key: 'creditOfficial', href: 'https://robertsspaceindustries.com' },
];

const IMAGE_CREDIT = { key: 'creditImages', href: 'https://starcitizen.tools' };

function FanDisclaimer({ version }) {
  const { text, fmt } = useItemFinderText();

  return (
    <aside className="rounded-box border border-base-300 bg-base-100 p-5 text-sm leading-relaxed">
      <p>{FAN_DISCLAIMER}</p>
      <p className="mt-3 text-base-content/75">
        {version ? fmt('sourcesLine', { version }) : text.sourcesLineNoVersion}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold">{text.creditTitle}:</span>
        {[...LINKS, ...(SHOW_ITEM_IMAGES ? [IMAGE_CREDIT] : [])].map((link) => (
          <a key={link.key} href={link.href} target="_blank" rel="noreferrer" className="link link-hover">
            {text[link.key]}
          </a>
        ))}
      </div>
      <p className="mt-3 text-base-content/70">{text.nonCommercial}</p>
    </aside>
  );
}

export default FanDisclaimer;
