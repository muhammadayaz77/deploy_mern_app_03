import Toast from './components/Toast'
import Routes from './page/Routes'

import 'react-toastify/dist/ReactToastify.css'
import './config/global'

export default function App() {
  return (
    <div>
      <Routes></Routes>
      <Toast />
    </div>
  )
}
