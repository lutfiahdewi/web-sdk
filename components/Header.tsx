import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()

  function isActive(pathname: string) {
    return router.pathname === pathname
  }

  return (
    <nav className="bg-slate-50  shadow-lg px-16 py-4 flex justify-between items-center z-50">
      <div className="logo-nama flex items-center gap-2">
        <img src="bps-logo.png" alt="Logo BPS" className="h-10 w-auto" />
        <div className="nama text-lg font-bold italic leading-none">
          <div>BADAN PUSAT STATISTIK</div>
          <div>KABUPATEN JOMBANG</div>
        </div>
      </div>
      <div className="menu font-medium flex gap-4">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/table")}>
            Daftar Tamu
          </a>
        </Link>
        
      </div>
    </nav>
  )
}

export default Header
