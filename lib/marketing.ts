type MarketingWindow = Window & { dataLayer?: Record<string, unknown>[] };
const campaignKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

export function captureCampaign() {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign = Object.fromEntries(
      campaignKeys
        .filter((key) => params.has(key))
        .map((key) => [key, params.get(key)!.slice(0, 200)]),
    );
    if (Object.keys(campaign).length)
      sessionStorage.setItem('saberio_campaign', JSON.stringify(campaign));
  } catch {
    /* The sales flow also works with browser storage blocked. */
  }
}

export function trackEvent(
  event: string,
  details: Record<string, string | number> = {},
) {
  let campaign = {};
  try {
    campaign = JSON.parse(sessionStorage.getItem('saberio_campaign') || '{}');
  } catch {
    /* Storage is optional. */
  }
  const target = window as MarketingWindow;
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ ...campaign, ...details, event });
}
