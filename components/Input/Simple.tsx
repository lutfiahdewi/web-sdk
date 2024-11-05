import { FC, SetStateAction, Dispatch } from "react"
import Wrapper from "./Wrapper"

export type InputProps = {
  type: string
  label: string
  name: string
  placeholder: string
  isRequired?: boolean
  isDisabled?: boolean
  id?: string
  classLabel?: string
  classInput?: string
}

const InputSimple: FC<{
  i: InputProps
  value: string
  setValue: Dispatch<SetStateAction<string>>
  children?: React.ReactNode
}> = ({ i, value, setValue, children }) => {
  const idInput = i.id ?? i.name
  const handleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setValue(event.target.value)
  }

  return (
    <Wrapper>
      <label
        htmlFor={i.name}
        className={
          "block mb-2 text-lg font-medium text-slate-100 " + i.classLabel
        }
      >
        {i.label}
        {i.isRequired && <span className="text-red-600"> *</span>}
      </label>
      <input
        type={i.type}
        value={value}
        id={idInput}
        name={i.name}
        className={
          "bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 " +
          i.classInput
        }
        placeholder={i.placeholder}
        required={i.isRequired}
        disabled={i.isDisabled}
        onChange={handleChange}
      />
      <div className="children">{children}</div>
    </Wrapper>
  )
}

export default InputSimple
