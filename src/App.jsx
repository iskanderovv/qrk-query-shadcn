import { Toaster } from 'sonner'
import RouteController from './routes'

const App = () => {
  return (
    <>
      <RouteController />
      <Toaster position="top-right" />

    </>
  )
}
export default App
