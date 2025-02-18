export function getEnv() {
  const hostname = window && window.location && window.location.hostname;
  if (/^.*localhost.*/.test(hostname)) {
    return 'local'
  } 
  if (/^dev.griips/.test(hostname)) {
    return 'development'
  } 
  if (/^qa.griips/.test(hostname)) {
    return 'qa'
  } 
  return 'production'

}