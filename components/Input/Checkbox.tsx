import { FC } from "react"

export type Option = {
  nama: string
  isChecked?: boolean
  isDisabled?: boolean
}

const Checkbox: FC<{
  Option: Option
  id: string
  name: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}> = ({ Option, id, name, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        name={"checkbox-" + name}
        id={"checkbox-" + id}
        value={Option.nama}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-green-400 "
      />
      <label htmlFor={"checkbox-" + id} className="ms-2  text-slate-100">
        {Option.nama}
      </label>
    </div>
  )
}

export default Checkbox
