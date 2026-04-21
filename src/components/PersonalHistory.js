import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const MONTH_NAMES = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const MONTH_HEIGHT = 10;
const CARD_MIN_HEIGHT = 132;
const CARD_STACK_GAP = 20;
const CHART_BOTTOM_PADDING = 180;

function parsePeriodToken(token, isEnd = false) {
  const trimmed = token?.trim();
  if (!trimmed) {
    return null;
  }

  if (/present|current|now/i.test(trimmed)) {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
    };
  }

  const monthYearMatch = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (monthYearMatch) {
    const [, monthName, year] = monthYearMatch;
    const month = MONTH_NAMES[monthName.slice(0, 3).toLowerCase()];
    if (month !== undefined) {
      return {
        year: Number(year),
        month,
      };
    }
  }

  const yearMatch = trimmed.match(/^(\d{4})$/);
  if (yearMatch) {
    return {
      year: Number(yearMatch[1]),
      month: isEnd ? 11 : 0,
    };
  }

  const parsedDate = new Date(trimmed);
  if (!Number.isNaN(parsedDate.getTime())) {
    return {
      year: parsedDate.getFullYear(),
      month: parsedDate.getMonth(),
    };
  }

  return null;
}

function parsePeriod(period) {
  if (!period) {
    return null;
  }

  const parts = period.split(/\s*-\s*/);
  if (!parts.length) {
    return null;
  }

  const start = parsePeriodToken(parts[0], false);
  const end = parsePeriodToken(parts[1] || parts[0], true);
  if (!start || !end) {
    return null;
  }

  const startIndex = start.year * 12 + start.month;
  const endIndex = end.year * 12 + end.month;
  if (endIndex < startIndex) {
    return null;
  }

  return {
    startIndex,
    endIndex,
    durationMonths: endIndex - startIndex + 1,
  };
}

function layoutLane(items, kind) {
  return items
    .map((item, index) => {
      const parsed = parsePeriod(item.period);
      if (!parsed) {
        return null;
      }

      return {
        ...item,
        kind,
        ...parsed,
        fallbackOrder: index,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.startIndex !== b.startIndex) {
        return a.startIndex - b.startIndex;
      }

      if ((a.lanePreference ?? 0) !== (b.lanePreference ?? 0)) {
        return (a.lanePreference ?? 0) - (b.lanePreference ?? 0);
      }

      if (a.endIndex !== b.endIndex) {
        return a.endIndex - b.endIndex;
      }

      return a.fallbackOrder - b.fallbackOrder;
    });
}

function getTimeMetrics(item, minIndex) {
  const naturalTop = (item.startIndex - minIndex) * MONTH_HEIGHT;
  const durationHeight = item.durationMonths * MONTH_HEIGHT;

  return {
    naturalTop,
    durationHeight,
  };
}

function computePlacedItems(items, measuredHeights, minIndex) {
  let previousBottom = -Infinity;

  return items.map((item) => {
    const { naturalTop, durationHeight } = getTimeMetrics(item, minIndex);
    const measuredHeight = measuredHeights[item.key] ?? Math.max(durationHeight, CARD_MIN_HEIGHT);
    const placedTop = previousBottom === -Infinity ? naturalTop : Math.max(naturalTop, previousBottom + CARD_STACK_GAP);

    previousBottom = placedTop + measuredHeight;

    return {
      ...item,
      naturalTop,
      durationHeight,
      placedTop,
      measuredHeight,
    };
  });
}

function HistoryLogo({ item }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-sm">
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.logoAlt || `${item.organization} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/40">Icon</span>
      )}
    </div>
  );
}

function HistoryBlock({ item, side, expanded, onToggle, onHeightChange }) {
  const blockRef = useRef(null);
  const isEducation = item.kind === 'education';
  const wrapperClass = side === 'left' ? 'absolute left-0 right-0 pr-4 md:text-right' : 'absolute left-0 right-0 pl-4';
  const durationBarClass = side === 'left' ? 'absolute right-0 w-1 rounded-full bg-secondary/70' : 'absolute left-0 w-1 rounded-full bg-accent/70';
  const connectorClass = side === 'left' ? 'absolute right-1 h-px w-3 bg-base-300' : 'absolute left-1 h-px w-3 bg-base-300';
  const rowClass = side === 'left' ? 'mt-3 flex items-start gap-3 md:flex-row-reverse' : 'mt-3 flex items-start gap-3';
  const linkGroupClass = side === 'left' ? 'mt-4 flex flex-wrap gap-2 md:justify-end' : 'mt-4 flex flex-wrap gap-2';
  const badgeClass = isEducation ? 'badge-secondary' : 'badge-accent';
  const collapseTitleClass = isEducation
    ? 'collapse-title p-4 after:start-5 after:end-auto pe-4 ps-12'
    : 'collapse-title p-4 pr-12';
  const offsetInsideCard = Math.max(0, item.naturalTop - item.placedTop);
  const adjustedStyle = {
    top: `${item.placedTop}px`,
    minHeight: `${Math.max(item.measuredHeight, CARD_MIN_HEIGHT)}px`,
  };

  useEffect(() => {
    if (!blockRef.current) {
      return undefined;
    }

    const measure = () => {
      onHeightChange(item.key, blockRef.current?.offsetHeight ?? 0);
    };

    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(blockRef.current);

    return () => observer.disconnect();
  }, [expanded, item.key, onHeightChange]);

  return (
    <article className={wrapperClass} style={adjustedStyle}>
      <div className={durationBarClass} style={{ top: `${offsetInsideCard}px`, height: `${item.durationHeight}px` }}></div>
      <div className={connectorClass} style={{ top: `${offsetInsideCard + 10}px` }}></div>
      <div
        ref={blockRef}
        className={`collapse collapse-arrow rounded-[1.5rem] border border-base-300 bg-base-100/95 shadow-xl backdrop-blur-sm ${
          expanded ? 'collapse-open' : 'collapse-close'
        }`}
      >
        <input type="checkbox" checked={expanded} onChange={() => onToggle(item.key)} aria-label={`Toggle ${item.title}`} />
        <div className={collapseTitleClass}>
          <div className={`badge badge-sm ${badgeClass}`}>{isEducation ? 'Education' : 'Work'}</div>
          <time className="mt-3 block font-mono text-xs uppercase tracking-[0.25em] text-base-content/55">{item.period}</time>
          <div className={rowClass}>
            <HistoryLogo item={item} />
            <div className={side === 'left' ? 'md:text-right' : ''}>
              <div className="text-lg font-black leading-tight">{item.title}</div>
              <div className="mt-1 text-sm font-semibold text-primary">{item.organization}</div>
            </div>
          </div>
        </div>
        <div className="collapse-content px-4 pb-4">
          <p className="text-sm leading-relaxed text-base-content/72">{item.description}</p>
          {item.relatedWork?.length ? (
            <div className={linkGroupClass}>
              <p className={`w-full text-xs font-semibold uppercase tracking-[0.24em] text-base-content/45 ${side === 'left' ? 'md:text-right' : ''}`}>
                Related Work
              </p>
              {item.relatedWork.map((project) => (
                <Link key={`${item.title}-${project.to}`} to={project.to} className="btn btn-xs btn-outline">
                  {project.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function MobileHistoryList({ title, items, badgeClass }) {
  const [expandedKeys, setExpandedKeys] = useState({});
  const isEducation = title === 'Education';
  const collapseTitleClass = isEducation
    ? 'collapse-title p-4 after:start-5 after:end-auto pe-4 ps-12'
    : 'collapse-title p-4 pr-12';

  function toggleExpanded(key) {
    setExpandedKeys((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div>
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-base-content/55">{title}</div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${title}-${item.title}-${index}`}
            className={`collapse collapse-arrow rounded-[1.5rem] border border-base-300 bg-base-100 shadow-lg ${
              expandedKeys[item.key] ? 'collapse-open' : 'collapse-close'
            }`}
          >
            <input
              type="checkbox"
              checked={!!expandedKeys[item.key]}
              onChange={() => toggleExpanded(item.key)}
              aria-label={`Toggle ${item.title}`}
            />
            <div className={collapseTitleClass}>
              <div className={`badge badge-sm ${badgeClass}`}>{title}</div>
              <time className="mt-3 block font-mono text-xs uppercase tracking-[0.25em] text-base-content/55">{item.period}</time>
              <div className="mt-3 flex items-start gap-3">
                <HistoryLogo item={item} />
                <div>
                  <div className="text-lg font-black leading-tight">{item.title}</div>
                  <div className="mt-1 text-sm font-semibold text-primary">{item.organization}</div>
                </div>
              </div>
            </div>
            <div className="collapse-content px-4 pb-4">
              <p className="text-sm leading-relaxed text-base-content/72">{item.description}</p>
              {item.relatedWork?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <p className="w-full text-xs font-semibold uppercase tracking-[0.24em] text-base-content/45">
                    Related Work
                  </p>
                  {item.relatedWork.map((project) => (
                    <Link key={`${item.title}-${project.to}`} to={project.to} className="btn btn-xs btn-outline">
                      {project.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalHistory({
  educationHistory = [],
  workHistory = [],
  heading = 'Recent Personal History',
}) {
  const educationItems = useMemo(() => layoutLane(educationHistory, 'education'), [educationHistory]);
  const workItems = useMemo(() => layoutLane(workHistory, 'work'), [workHistory]);
  const [expandedKeys, setExpandedKeys] = useState({});
  const [measuredHeights, setMeasuredHeights] = useState({});

  const keyedEducationItems = useMemo(
    () =>
      educationItems.map((item, index) => ({
        ...item,
        key: `education-${index}-${item.title}-${item.period}`,
      })),
    [educationItems]
  );

  const keyedWorkItems = useMemo(
    () =>
      workItems.map((item, index) => ({
        ...item,
        key: `work-${index}-${item.title}-${item.period}`,
      })),
    [workItems]
  );

  const keyedItems = useMemo(() => [...keyedEducationItems, ...keyedWorkItems], [keyedEducationItems, keyedWorkItems]);

  const minIndex = Math.min(...keyedItems.map((item) => item.startIndex));
  const maxIndex = Math.max(...keyedItems.map((item) => item.endIndex));
  const totalMonths = maxIndex - minIndex + 1;
  const placedEducationItems = useMemo(
    () => computePlacedItems(keyedEducationItems, measuredHeights, minIndex),
    [keyedEducationItems, measuredHeights, minIndex]
  );
  const placedWorkItems = useMemo(
    () => computePlacedItems(keyedWorkItems, measuredHeights, minIndex),
    [keyedWorkItems, measuredHeights, minIndex]
  );

  const chartHeight =
    Math.max(
      totalMonths * MONTH_HEIGHT,
      ...placedEducationItems.map((item) => item.placedTop + item.measuredHeight),
      ...placedWorkItems.map((item) => item.placedTop + item.measuredHeight)
    ) + CHART_BOTTOM_PADDING;

  function toggleExpanded(key) {
    setExpandedKeys((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleHeightChange(key, height) {
    setMeasuredHeights((current) => {
      if (current[key] === height) {
        return current;
      }

      return {
        ...current,
        [key]: height,
      };
    });
  }

  const yearTicks = [];
  for (let year = Math.floor(minIndex / 12); year <= Math.floor(maxIndex / 12); year += 1) {
    const yearStartIndex = year * 12;
    if (yearStartIndex < minIndex || yearStartIndex > maxIndex) {
      continue;
    }

    yearTicks.push({
      year,
      top: (yearStartIndex - minIndex) * MONTH_HEIGHT,
    });
  }

  return (
    <section className="bg-base-200/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Personal History</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">{heading}</h2>
        </div>

        <div className="rounded-[2rem] border border-base-300 bg-base-100 p-6 shadow-2xl sm:p-8">
          <div className="mb-8 hidden gap-4 md:grid md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:items-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/55 md:text-right">
              Education
            </div>
            <div></div>
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/55">
              Work
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:gap-6" style={{ minHeight: `${chartHeight}px` }}>
            <div className="relative">
              {placedEducationItems.map((item, index) => (
                <HistoryBlock
                  key={`education-${item.title}-${index}`}
                  item={item}
                  side="left"
                  expanded={!!expandedKeys[item.key]}
                  onToggle={toggleExpanded}
                  onHeightChange={handleHeightChange}
                />
              ))}
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-base-300"></div>
              {yearTicks.map((tick) => (
                <div key={`year-${tick.year}`} className="absolute left-1/2 -translate-x-1/2" style={{ top: `${tick.top}px` }}>
                  <div className="badge badge-ghost badge-sm border border-base-300 bg-base-100">{tick.year}</div>
                </div>
              ))}
            </div>

            <div className="relative">
              {placedWorkItems.map((item, index) => (
                <HistoryBlock
                  key={`work-${item.title}-${index}`}
                  item={item}
                  side="right"
                  expanded={!!expandedKeys[item.key]}
                  onToggle={toggleExpanded}
                  onHeightChange={handleHeightChange}
                />
              ))}
            </div>
          </div>

          <div className="space-y-10 md:hidden">
            <MobileHistoryList title="Education" items={keyedEducationItems} badgeClass="badge-secondary" />
            <MobileHistoryList title="Work" items={keyedWorkItems} badgeClass="badge-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalHistory;
