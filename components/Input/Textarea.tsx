import { FC, SetStateAction, Dispatch } from "react"
import Wrapper from "./Wrapper"

export type InputProps = {
  rows: number
  label: string
  name: string
  placeholder: string
  isRequired?: boolean
  isDisabled?: boolean
  classLabel?: string
  classInput?: string
}

const InputTextarea: FC<{
  i: InputProps
  value: string
  setValue: Dispatch<SetStateAction<string>>
  children?: React.ReactNode
}> = ({ i, value, setValue, children }) => {
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
      <textarea
        rows={4}
        value={value}
        id={"textarea-"+i.name}
        name={i.name}
        className={
          "bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 " +
          i.classInput
        }
        placeholder={i.placeholder}
        required={i.isRequired}
        disabled={i.isDisabled}
        onChange={handleChange}
      ></textarea>

      <div className="children">{children}</div>
    </Wrapper>
  )
}

export default InputTextarea
