import React, { Dispatch, SetStateAction } from "react"
import IndoFlag from "../Icons/IndoFlag"
import Wrapper from "./Wrapper"

export type InputProps = {
  label: string
  placeholder?: string
  pattern?: string
  isRequired?: boolean
  isDisabled?: boolean
  classLabel?: string
}

const InputNoTelp: React.FC<{
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
        htmlFor="phone-input"
        className={
          "block mb-2 text-lg font-medium text-slate-100 " + i.classLabel
        }
      >
        {i.label}
        {i.isRequired ? <span className="text-red-600"> *</span> : ""}
      </label>
      <div className="flex items-center">
        <button
          id="dropdown-phone-button"
          data-dropdown-toggle="dropdown-phone"
          className="flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
          type="button"
          disabled
        >
          <div className="py-2.5 ps-4 ">+62</div>
          <IndoFlag className="ms-2 me-4 h-6 w-auto" />
        </button>

        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            pattern={i.pattern ?? "[0-9]{10,12}"}
            placeholder={i.placeholder ?? "8123456789"}
            required={i.isRequired}
            disabled={i.isDisabled}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="children">{children}</div>
    </Wrapper>
  )
}

export default InputNoTelp
