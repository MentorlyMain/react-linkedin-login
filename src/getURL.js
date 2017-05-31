export default function ({clientId, state, scope, redirectUri }) {
  const encodedRedirectUri = encodeURIComponent(redirectUri)
  const current = encodeURIComponent(window.location.href)
  const base = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&'
  const fullScope = scope && scope.length ? `&scope=${encodeURIComponent(scope.join(' '))}` : ''

  return `${base}client_id=${clientId}&redirect_uri=${encodedRedirectUri}&state=${state}${fullScope}`
}
