import { useState } from 'react';
import mixologyData from '../data/mixologyData';

const mixologyImageContext = require.context(
  '../assets/images/mixology',
  false,
  /\.(png|jpe?g|webp|svg)$/
);

const mixologyIconContext = require.context(
  '../assets/images/mix_icons',
  false,
  /\.svg$/
);

function resolveAsset(context, file) {
  if (!file) {
    return null;
  }

  try {
    return context(`./${file}`);
  } catch {
    return null;
  }
}

function splitIngredients(ingredients) {
  return ingredients
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function inferFamily(ingredients) {
  const lower = ingredients.toLowerCase();
  const spirits = [
    { label: 'Tequila', pattern: /tequila/ },
    { label: 'Vodka', pattern: /vodka/ },
    { label: 'Gin', pattern: /\bgin\b/ },
    { label: 'Rum', pattern: /\brum\b/ },
  ].filter((family) => family.pattern.test(lower));

  if (spirits.length > 1) {
    return 'Mixed Spirit';
  }

  if (spirits.length === 1) {
    return spirits[0].label;
  }

  if (/(brandy|bourbon|champagne|wine|ale|beer)/.test(lower)) {
    return 'Bar Cart';
  }

  if (/(liqueur|schnapps|amaretto|curacao|creme|southern comfort)/.test(lower)) {
    return 'Liqueur Forward';
  }

  return 'House Special';
}

function buildFlavorForecast(subject, ingredients) {
  const lower = ingredients.toLowerCase();
  const notes = [];

  if (/(lime|lemon|grapefruit|cranberry|orange juice)/.test(lower)) {
    notes.push('bright citrus up front');
  }
  if (/(pineapple|melon|peach|apple|strawberr|grenadine|raspberry)/.test(lower)) {
    notes.push('a juicy fruit finish');
  }
  if (/(cream|ice cream|irish cream|cacao|coffee liqueur)/.test(lower)) {
    notes.push('a richer dessert-like middle');
  }
  if (/(ginger ale|club soda|champagne|beer|soda|cola)/.test(lower)) {
    notes.push('a fizzy lift');
  }
  if (/(bitters|vermouth|galliano|menthe)/.test(lower)) {
    notes.push('an herbal edge');
  }

  if (notes.length === 0) {
    notes.push('a straightforward spirit-forward profile');
  }

  const body = /(cream|ice cream)/.test(lower) ? 'silky and full' : 'clean and crisp';
  const backbone = /(vodka|gin|rum|tequila|bourbon|brandy)/.test(lower)
    ? 'with a clear liquor backbone'
    : 'with the liqueurs doing most of the work';

  return `${subject} would likely taste ${notes.slice(0, 3).join(', ')}, ${backbone}, and finish ${body}.`;
}

function ingredientMatches(cocktail, query) {
  if (!query) {
    return true;
  }

  return cocktail.searchText.includes(query.toLowerCase());
}

const familyTheme = {
  All: {
    badge: 'badge-neutral',
    ring: 'ring-base-300',
    panel: 'from-slate-500/10 via-base-100 to-base-100',
  },
  Tequila: {
    badge: 'badge-warning',
    ring: 'ring-warning/40',
    panel: 'from-amber-500/20 via-base-100 to-base-100',
  },
  Vodka: {
    badge: 'badge-info',
    ring: 'ring-info/40',
    panel: 'from-sky-500/20 via-base-100 to-base-100',
  },
  Gin: {
    badge: 'badge-success',
    ring: 'ring-success/40',
    panel: 'from-emerald-500/20 via-base-100 to-base-100',
  },
  Rum: {
    badge: 'badge-secondary',
    ring: 'ring-secondary/40',
    panel: 'from-rose-500/20 via-base-100 to-base-100',
  },
  'Mixed Spirit': {
    badge: 'badge-accent',
    ring: 'ring-accent/40',
    panel: 'from-fuchsia-500/20 via-base-100 to-base-100',
  },
  'Liqueur Forward': {
    badge: 'badge-primary',
    ring: 'ring-primary/40',
    panel: 'from-violet-500/20 via-base-100 to-base-100',
  },
  'Bar Cart': {
    badge: 'badge-error',
    ring: 'ring-error/30',
    panel: 'from-orange-500/20 via-base-100 to-base-100',
  },
  'House Special': {
    badge: 'badge-neutral',
    ring: 'ring-neutral/40',
    panel: 'from-zinc-500/20 via-base-100 to-base-100',
  },
  Custom: {
    badge: 'badge-primary',
    ring: 'ring-primary/40',
    panel: 'from-cyan-500/20 via-base-100 to-base-100',
  },
};

const cocktails = mixologyData.map((cocktail) => {
  const ingredientList = splitIngredients(cocktail.ingredients);
  const family = cocktail.index === 0 ? 'Custom' : inferFamily(cocktail.ingredients);

  return {
    ...cocktail,
    family,
    ingredientList,
    imageSrc: resolveAsset(mixologyImageContext, cocktail.imageFile),
    iconSrc: resolveAsset(mixologyIconContext, cocktail.iconFile),
    searchText: `${cocktail.name} ${cocktail.symbol} ${cocktail.ingredients} ${family}`.toLowerCase(),
    flavorForecast: buildFlavorForecast(cocktail.name, cocktail.ingredients),
  };
});

const regularCocktails = cocktails.filter((cocktail) => cocktail.index !== 0);
const customCocktail = cocktails.find((cocktail) => cocktail.index === 0);
const families = ['All', ...new Set(regularCocktails.map((cocktail) => cocktail.family))];

function MixologyExplorer() {
  const [search, setSearch] = useState('');
  const [activeFamily, setActiveFamily] = useState('All');
  const [selectedCocktailId, setSelectedCocktailId] = useState(1);
  const [mixMode, setMixMode] = useState(false);
  const [mixSelection, setMixSelection] = useState([]);
  const [customIngredients, setCustomIngredients] = useState(
    '2 oz. Tequila\n1 oz. Lime Juice\n0.5 oz. Orange Liqueur\n0.25 oz. Grenadine'
  );
  const [customReview, setCustomReview] = useState(
    buildFlavorForecast(
      'Your house cocktail',
      '2 oz. Tequila\n1 oz. Lime Juice\n0.5 oz. Orange Liqueur\n0.25 oz. Grenadine'
    )
  );

  const filteredCocktails = regularCocktails.filter((cocktail) => {
    const familyMatch = activeFamily === 'All' || cocktail.family === activeFamily;
    return familyMatch && ingredientMatches(cocktail, search);
  });

  const selectedCocktail =
    cocktails.find((cocktail) => cocktail.index === selectedCocktailId) || regularCocktails[0];

  const mixedCocktails = mixSelection
    .map((index) => regularCocktails.find((cocktail) => cocktail.index === index))
    .filter(Boolean);

  const mixedIngredients = mixedCocktails
    .flatMap((cocktail) => cocktail.ingredientList)
    .join('\n');

  const mixedForecast =
    mixedCocktails.length === 2
      ? buildFlavorForecast(
          `${mixedCocktails[0].name} with ${mixedCocktails[1].name}`,
          mixedIngredients
        )
      : '';

  function toggleMixMode() {
    setMixMode((current) => !current);
    setMixSelection([]);
  }

  function handleCardSelect(cocktail) {
    if (cocktail.index === 0) {
      setSelectedCocktailId(0);
      return;
    }

    if (!mixMode) {
      setSelectedCocktailId(cocktail.index);
      return;
    }

    setMixSelection((current) => {
      if (current.includes(cocktail.index)) {
        return current.filter((index) => index !== cocktail.index);
      }

      if (current.length === 2) {
        return [current[1], cocktail.index];
      }

      return [...current, cocktail.index];
    });
  }

  function generateCustomReview() {
    setSelectedCocktailId(0);
    setCustomReview(buildFlavorForecast('Your house cocktail', customIngredients));
  }

  function renderDetailPanel() {
    if (mixMode && mixedCocktails.length === 2) {
      return (
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="badge badge-accent badge-outline">Mix Mode</div>
              <div className="badge badge-neutral badge-outline">
                {mixedCocktails[0].symbol} + {mixedCocktails[1].symbol}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold">
                {mixedCocktails[0].name} + {mixedCocktails[1].name}
              </h3>
              <p className="mt-2 text-sm text-base-content/70">
                A quick taste forecast based on the combined ingredient list from both archived cocktails.
              </p>
            </div>
            <p className="leading-relaxed text-base-content/80">{mixedForecast}</p>
            <div className="grid gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/50">
                Combined Ingredients
              </h4>
              <div className="rounded-box bg-base-200 p-4">
                <ul className="space-y-2 text-sm text-base-content/80">
                  {mixedCocktails.flatMap((cocktail) =>
                    cocktail.ingredientList.map((ingredient) => (
                      <li key={`${cocktail.index}-${ingredient}`}>{ingredient}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedCocktail.index === 0) {
      return (
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="badge badge-primary badge-outline">Custom Build</div>
              <div className="badge badge-neutral badge-outline">Local Flavor Forecast</div>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Make Your Own</h3>
              <p className="mt-2 text-sm text-base-content/70">
                The old prototype called an AI review. This rebuild keeps the playful spirit, but generates an
                ingredient-based tasting note locally inside React.
              </p>
            </div>
            <textarea
              className="textarea textarea-bordered min-h-40 w-full"
              value={customIngredients}
              onChange={(event) => setCustomIngredients(event.target.value)}
              placeholder="List your ingredients, one per line"
            />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={generateCustomReview}>
                Generate Flavor Forecast
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  setCustomIngredients(
                    '1.5 oz. Vodka\n1 oz. Cranberry Juice\n0.5 oz. Lime Juice\n0.5 oz. Peach Schnapps'
                  )
                }
              >
                Load Example
              </button>
            </div>
            <div className="rounded-box bg-base-200 p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-base-content/50">Forecast</p>
              <p className="mt-3 leading-relaxed text-base-content/80">{customReview}</p>
            </div>
          </div>
        </div>
      );
    }

    const theme = familyTheme[selectedCocktail.family] || familyTheme.All;

    return (
      <div className={`card bg-gradient-to-br ${theme.panel} shadow-2xl border border-base-300`}>
        <figure className="border-b border-base-300 bg-base-200/50">
          {selectedCocktail.imageSrc ? (
            <img
              src={selectedCocktail.imageSrc}
              alt={selectedCocktail.name}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-72 w-full items-center justify-center text-base-content/50">
              Image unavailable
            </div>
          )}
        </figure>
        <div className="card-body gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className={`badge ${theme.badge}`}>{selectedCocktail.family}</div>
            <div className="badge badge-outline">No. {String(selectedCocktail.index).padStart(2, '0')}</div>
            <div className="badge badge-outline">{selectedCocktail.symbol}</div>
          </div>
          <div>
            <h3 className="text-3xl font-bold">{selectedCocktail.name}</h3>
            <p className="mt-2 leading-relaxed text-base-content/80">
              {selectedCocktail.flavorForecast}
            </p>
          </div>
          <div className="grid gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-base-content/50">
              Ingredient List
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCocktail.ingredientList.map((ingredient) => (
                <span key={ingredient} className="badge badge-outline h-auto py-3 px-4 text-left">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          {selectedCocktail.taste ? (
            <div className="collapse collapse-arrow border border-base-300 bg-base-100/70">
              <input type="checkbox" />
              <div className="collapse-title text-sm font-semibold uppercase tracking-[0.3em] text-base-content/60">
                Archived Prototype Note
              </div>
              <div className="collapse-content">
                <p className="text-sm leading-relaxed text-base-content/70">{selectedCocktail.taste}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.9fr)]">
      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body gap-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-base-content/50">Interactive Explorer</p>
                <h2 className="mt-2 text-4xl font-bold">Periodic Table of Mixology</h2>
                <p className="mt-3 max-w-3xl text-base-content/70">
                  Search by ingredient, browse by spirit family, or turn on mix mode to predict what happens
                  when two archived cocktails collide.
                </p>
              </div>
              <button
                type="button"
                className={`btn ${mixMode ? 'btn-accent' : 'btn-outline'}`}
                onClick={toggleMixMode}
              >
                {mixMode ? 'Exit Mix Mode' : 'Start Mix Mode'}
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="form-control">
                <div className="label">
                  <span className="label-text uppercase tracking-[0.3em] text-base-content/50">
                    Search Ingredients
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try lime, vodka, cranberry, pineapple..."
                />
              </label>
              <div className="stats shadow bg-base-200">
                <div className="stat px-6">
                  <div className="stat-title">Visible</div>
                  <div className="stat-value text-3xl">{filteredCocktails.length}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {families.map((family) => {
                const theme = familyTheme[family] || familyTheme.All;
                const isActive = activeFamily === family;

                return (
                  <button
                    key={family}
                    type="button"
                    className={`btn btn-sm ${isActive ? '' : 'btn-outline'}`}
                    onClick={() => setActiveFamily(family)}
                  >
                    <span className={`badge ${theme.badge} border-0`}>{family}</span>
                  </button>
                );
              })}
            </div>

            {mixMode ? (
              <div className="alert alert-info">
                <span>
                  Select up to two cocktails from the table. The detail panel will turn into a combined flavor
                  forecast as soon as both are chosen.
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {[customCocktail, ...filteredCocktails].map((cocktail) => {
            const theme = familyTheme[cocktail.family] || familyTheme.All;
            const isSelected = !mixMode && selectedCocktailId === cocktail.index;
            const isMixed = mixSelection.includes(cocktail.index);

            return (
              <button
                key={cocktail.index}
                type="button"
                onClick={() => handleCardSelect(cocktail)}
                className={`card min-h-40 border bg-base-100 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${
                  isSelected || isMixed ? `ring-2 ${theme.ring}` : 'border-base-300'
                } ${cocktail.index === 0 && mixMode ? 'opacity-50' : ''}`}
                disabled={cocktail.index === 0 && mixMode}
              >
                <div className="card-body justify-between gap-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-base-content/50">
                        {cocktail.index === 0 ? 'Custom' : String(cocktail.index).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">{cocktail.symbol}</h3>
                    </div>
                    {cocktail.iconSrc ? (
                      <img src={cocktail.iconSrc} alt="" className="h-12 w-12 object-contain opacity-90" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{cocktail.name}</p>
                    <p className="mt-2 text-xs text-base-content/60">
                      {cocktail.index === 0 ? 'Build a brand-new combo' : cocktail.family}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {renderDetailPanel()}

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h3 className="card-title">How This React Rebuild Works</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-base-content/75">
              <li>
                Cocktail data and SVG icons were extracted from the old Webflow prototype and normalized into a
                local React data module.
              </li>
              <li>
                Search now filters against names, symbols, ingredients, and spirit families without any direct
                DOM manipulation.
              </li>
              <li>
                The tasting notes in this rebuild are local flavor forecasts generated from ingredient patterns,
                so the page stays fully self-contained.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MixologyExplorer;
