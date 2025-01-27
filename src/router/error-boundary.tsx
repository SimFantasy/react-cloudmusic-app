import { useRouteError } from 'react-router'

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.log('ErrorBoundary', error)
  return <div>出错了，请稍后再试！</div>
}
