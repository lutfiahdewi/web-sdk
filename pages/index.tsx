import { SetStateAction, useState } from "react"
import {
  KeperluanList,
  PekerjaanList,
  PemanfaatanList,
  SaranaList,
  DataList,
} from "../lib/optionData"
import * as Yup from "yup"
import Layout from "../components/Layout"
import InputSimple from "../components/Input/Simple"
import InputNoTelp from "../components/Input/NoTelp"
import InputCheckbox from "../components/Input/CheckboxList"
import InputRadiobutton from "../components/Input/RadiobuttonList"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import InputTextarea from "../components/Input/Textarea"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
}

export default function Home() {
  // Form input states
  const [nama, setNama] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [noTelp, setNoTelp] = useState<string>("")
  const [keperluan, setKeperluan] = useState<string[]>([])
  const [keperluanLain, setKeperluanLain] = useState<string>("")
  const [keperluanLengkap, setKeperluanLengkap] = useState<string>("")
  
  const [pekerjaan, setPekerjaan] = useState<string>("")
  const [pekerjaanLain, setPekerjaanLain] = useState<string>("")
  const [pemanfaatan, setPemanfaatan] = useState<string>("")
  const [pemanfaatanLain, setPemanfaatanLain] = useState<string>("")
  const [sarana, setSarana] = useState<string[]>([])
  const [data, setData] = useState<string[]>([])
  const [dataLain, setDataLain] = useState<string>("")
  const [detailData, setDetailData] = useState<string>("")
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format email menggunakan @ Contoh: example@mail.com")
      .required("Email harus diisi!"),
  })

  // Error states for form fields
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate the form data against the schema
      await validationSchema.validate({ email }, { abortEarly: false })
      // Clear errors if validation passes
      setErrors({})
      alert("Form valid!")
    } catch (err) {
      // Set validation errors
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}
        err.inner.forEach(error => {
          if (error.path) validationErrors[error.path] = error.message
        })
        setErrors(validationErrors)
      }
    }
  }
  return (
    <Layout>
      <section className="static">
        <div className="background absolute h-full z-0 hidden md:block">
          <img src="bps-jkt.jpg" alt="" className="h-full" />
        </div>
        <div className="form absolute right-0 w-full md:w-1/2 overflow-y-auto h-full bg-blue-800 md:rounded-l-xl shadow-md p-12 z-10">
          <div className="step-1 ">
            <InputSimple
              i={{
                type: "text",
                label: "Nama",
                name: "nama",
                placeholder: "Nama Lengkap",
                isRequired: true,
              }}
              value={nama}
              setValue={setNama}
            ></InputSimple>
            <InputSimple
              i={{
                type: "email",
                label: "Email",
                name: "email",
                placeholder: "Email",
                isRequired: true,
              }}
              value={email}
              setValue={setEmail}
            >
              {errors.email && (
                <p className="mt-1 text-red-600 font-semibold">
                  {errors.email}
                </p>
              )}
            </InputSimple>
            <InputNoTelp
              i={{
                label: "Nomor telepon whatsapp",
                isRequired: true,
              }}
              value={noTelp}
              setValue={setNoTelp}
            >
              <div className="text-sm text-slate-50">
                Tanpa angka 0 didepannya
              </div>
            </InputNoTelp>
            <InputCheckbox
              i={{
                label: "Keperluan",
                name: "keperluan",
                OptionList: KeperluanList,
                isRequired: true,
                otherOption: false,
              }}
              checkedItems={keperluan}
              setCheckedItems={setKeperluan}
              lainnya={keperluanLain}
              setLainnya={setKeperluanLain}
            />
          </div>
          <InputRadiobutton
            i={{
              label: "Pekerjaan Utama",
              OptionList: PekerjaanList,
              name: "kerja",
              isRequired: true,
              otherOption: true,
            }}
            checkedItems={pekerjaan}
            setCheckedItems={setPekerjaan}
            lainnya={pekerjaanLain}
            setLainnya={setPekerjaanLain}
          ></InputRadiobutton>
          <InputTextarea
            i={{
              rows: 5,
              label: "Tuliskan Keperluan Anda Lebih Lengkap",
              name: "keperluan",
              placeholder: "",
            }}
            value={keperluanLengkap}
            setValue={setKeperluanLengkap}
          >
            <div className="text-sm text-slate-50">
              Contoh : Mengumpulkan dokumen Susenas Contoh : Bertemu Ibu Lely
            </div>
          </InputTextarea>
          <InputRadiobutton
            i={{
              label: "Pemanfaatan Utama Hasil Kunjungan dan atau akses layanan",
              OptionList: PemanfaatanList,
              name: "pemanfaatan",
              isRequired: true,
              otherOption: true,
            }}
            checkedItems={pemanfaatan}
            setCheckedItems={setPemanfaatan}
            lainnya={pemanfaatanLain}
            setLainnya={setPemanfaatanLain}
          ></InputRadiobutton>
          <InputCheckbox
            i={{
              OptionList: SaranaList,
              label: "Sarana Permintaan Data/Konsultasi",
              name: "sarana",
              isRequired: true,
            }}
            checkedItems={sarana}
            setCheckedItems={setSarana}
          ></InputCheckbox>
          <InputCheckbox
            i={{
              OptionList: DataList,
              label: "Data yang dibutuhkan",
              name: "data",
              isRequired: true,
              otherOption: true,
            }}
            checkedItems={data}
            setCheckedItems={setData}
            lainnya={dataLain}
            setLainnya={setDataLain}
          ></InputCheckbox>
          <InputTextarea
            i={{
              rows: 5,
              label: "Tuliskan Data Apa Saja yang Saudara Butuhkan ",
              placeholder: "Tuliskan Detail Data yang Butuhkan ",
              name: "Detail-data",
            }}
            value={detailData}
            setValue={setDetailData}
          >
            <div className="text-sm text-slate-50">
              Contoh : Data Penduduk Kabupaten Jombang Tahun 2020 - 2023{" "}
            </div>
          </InputTextarea>
          <button
            type="button"
            className="text-slate-50 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="my-12">
            <p>{nama}</p>
            <p>{email}</p>
            <p>{noTelp}</p>
            <p>Keperluan: {keperluan.join(", ")}</p>
            <p>Keperluan Lainnya: {keperluanLain}</p>
            <p>Keperluan lengkap: {keperluanLengkap}</p>
            <p>Pekerjaan: {pekerjaan}</p>
            <p>PekerjaanLain: {pekerjaanLain}</p>
            <p>Pemanfaatan: {pemanfaatan}</p>
            <p>Pemanfaatan Lain: {pemanfaatanLain}</p>
            <p>Sarana: {sarana}</p>
            <p>data: {data}</p>
            <p>data lain: {dataLain}</p>
            <p>detail data: {detailData}</p>
            <p>Confirmed: {confirmation.valueOf()}</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
