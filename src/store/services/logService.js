import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

function init() {
  Sentry.init({
    dsn: 'https://cc9c188157cc44bca95d8345251a462a@o561814.ingest.sentry.io/5793252',
    autoSessionTracking: false,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
}

function log(error) {
  Sentry.captureException(error)
  // console.error(error)
}

export default {
  init,
  log,
}
