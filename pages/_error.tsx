/*This file should be deleted. Please migrate its contents to appropriate files*/
import NotFound from './404'
import Bugsnag from '@hashicorp/platform-runtime-error-monitoring'
function Error({ statusCode }) {
  return <NotFound />
}
Error.getInitialProps = ({ res, err }) => {
  if (err) Bugsnag.notify(err)
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
export default Error
