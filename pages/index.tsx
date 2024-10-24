import Layout from "../components/Layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"

export default function Home() {
  return (
    <Layout>
      <section className="static">
        <div className="background absolute h-full z-0">
          <img src="bps-jkt.jpg" alt="" className="h-full" />
        </div>
        <div className="form absolute right-0 w-1/2 h-full bg-blue-800 rounded-l-xl shadow-md p-12 z-10">
          <div className="mb-3">
            <label
              htmlFor="nama"
              className="block mb-2 text-lg font-medium text-slate-100"
            >
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              className="bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Nama lengkap"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium text-slate-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="nowa"
              className="block mb-2 text-lg font-medium text-slate-100"
            >
              Nomor Whatsapp
            </label>
            <input
              type="tel"
              id="nowa"
              name="nowa"
              className="bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Nomor Whatsapp"
              required
            />
          </div>
          
        </div>
        <button></button>
      </section>
    </Layout>
  )
}
