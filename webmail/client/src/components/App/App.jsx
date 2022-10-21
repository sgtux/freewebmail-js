import './App.css'
import { AppDrawer, Toolbar } from '../'
import { EmailList } from '../../pages'

export function App() {
  return (
    <div className="App">
      <AppDrawer />
      <Toolbar />
      <EmailList />
    </div>
  )
}