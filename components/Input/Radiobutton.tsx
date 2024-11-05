import { FC } from "react"

export type Option = {
  nama: string
  isChecked?: boolean
  isDisabled?: boolean
}

const Radiobutton: FC<{
  Option: Option
  name: string
  id: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}> = ({ Option, id, name, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id={"radio-" + id}
        value={Option.nama}
        name={'radio-'+name}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-400 "
      ></input>
      <label htmlFor={"radio-" + id} className="ms-2 text-slate-100">
        {Option.nama}
      </label>
    </div>
  )
}

export default Radiobutton
