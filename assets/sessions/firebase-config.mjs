// Firebase web configuration is public by design. Loading the provider's own
// published copy avoids hard-coding a third-party browser API key in this repo.
export async function loadPublicFirebaseConfig(url, expectedProjectId, fetcher = fetch) {
  const response = await fetcher(url, {credentials: 'omit', cache: 'no-cache', referrerPolicy: 'no-referrer'});
  if (!response.ok) throw new Error('Unable to load the public feedback configuration.');
  const config = await response.json();
  const required = ['apiKey', 'authDomain', 'projectId', 'appId'];
  if (config?.projectId !== expectedProjectId || !required.every(key => typeof config[key] === 'string' && config[key].trim())) {
    throw new Error('Unexpected feedback service configuration.');
  }
  // Do not initialize analytics or other unrelated products from upstream fields.
  return {apiKey: config.apiKey, authDomain: config.authDomain, projectId: config.projectId, appId: config.appId};
}
