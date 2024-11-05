import { FC, useState, SetStateAction, Dispatch } from "react"

export type Option = {
  id: string
  isDisabled: boolean
  isRequired: boolean
}

const CheckboxOther: FC<{
  Option: Option
  name: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  setValue: Dispatch<SetStateAction<string>>
}> = ({ Option, name, checked, onChange, value, setValue }) => {
  const [required, setRequired] = useState<boolean>(Option.isRequired)
  const [disabled, setDisabled] = useState<boolean>(Option.isDisabled)
  const switchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequired(!required)
    setDisabled(!disabled)
    onChange(event)
  }
  const handleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setValue(event.target.value)
  }
  return (
    <>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id={"checkbox-other-option" + name}
          value="Lainnya"
          className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-green-400 "
          onChange={switchInput}
          checked={checked}
        />
        <label
          htmlFor={"checkbox-other-option" + name}
          className="ms-2  text-slate-100"
        >
          Lainnya
        </label>
      </div>
      {checked && (
        <div className="mb-2">
          <input
            type="text"
            name={"checkbox-" + name}
            id="checkbox-other"
            value={value}
            className="border  border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full last:p-2.5 "
            placeholder="Lainnya"
            required={checked}
            disabled={!checked}
            onChange={handleChange}
          />
        </div>
      )}
    </>
  )
}

export default CheckboxOther
