import Header from "./Header"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Buku Tamu BPS',
    default: 'Buku Tamu BPS', // a default is required when creating a template
  },
  icons:{
    icon: "../public/bps-logo.png"
  }
}

type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = props => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>

  </div>
)

export default Layout
