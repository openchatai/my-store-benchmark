import ReactDOM from 'react-dom/client'
import App from './App'
import { MainShell } from './Shell'
import "@fontsource-variable/montserrat"
import './index.css';
import { SWRConfig } from 'swr'
import { ping } from './data';
import { Toaster } from './@/ui/sonner';
import { ThemeProvider } from "next-themes"

const pinga = (await ping()).data === '200';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='light' themes={['light', 'dark']}>
    <SWRConfig
      value={{
        isOnline() {
          return pinga
        },
      }}
    >
      <MainShell>
        <App />
      </MainShell>
      <Toaster />
    </SWRConfig>
  </ThemeProvider>

)
