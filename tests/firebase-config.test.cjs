const assert = require('node:assert/strict');
const {test, before} = require('node:test');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
let loadPublicFirebaseConfig;
before(async () => {
  ({loadPublicFirebaseConfig} = await import(pathToFileURL(path.join(__dirname, '../assets/sessions/firebase-config.mjs'))));
});

const endpoint = 'https://devfest26.gdglebanon.com/api/openfeedback-config.json';
const publicConfig = {apiKey: 'test-public-client-identifier', appId: 'test-app', projectId: 'open-feedback-42', authDomain: 'open-feedback-42.firebaseapp.com'};

test('loads only the required public client fields without sending credentials', async () => {
  let options;
  const loaded = await loadPublicFirebaseConfig(endpoint, 'open-feedback-42', async (url, init) => {
    assert.equal(url, endpoint);
    options = init;
    return {ok: true, json: async () => ({...publicConfig, measurementId: 'unused-analytics'})};
  });
  assert.deepEqual(loaded, publicConfig);
  assert.equal(options.credentials, 'omit');
  assert.equal(options.referrerPolicy, 'no-referrer');
});

test('rejects a configuration for a different Firebase project', async () => {
  await assert.rejects(loadPublicFirebaseConfig(endpoint, 'open-feedback-42', async () => ({ok: true,
    json: async () => ({...publicConfig, projectId: 'another-project'})})), /Unexpected/);
});

test('rejects incomplete or malformed public configuration', async () => {
  for (const config of [null, {}, {...publicConfig, apiKey: null}, {...publicConfig, appId: {}}]) {
    await assert.rejects(loadPublicFirebaseConfig(endpoint, 'open-feedback-42', async () => ({ok: true,
      json: async () => config})), /Unexpected/);
  }
});

test('does not initialize a client after an upstream fetch failure', async () => {
  await assert.rejects(loadPublicFirebaseConfig(endpoint, 'open-feedback-42', async () => ({ok: false})), /Unable to load/);
});
