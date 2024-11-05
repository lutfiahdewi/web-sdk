import { FC, useState, SetStateAction, Dispatch, useRef } from "react"

const RadiobuttonOther: FC<{
  name: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
  setValue: Dispatch<SetStateAction<string>>
}> = ({ name, checked, onChange, value, setValue }) => {
  //const [required, setRequired] = useState<boolean>(Option.isRequired)
  //const [disabled, setDisabled] = useState<boolean>(Option.isDisabled)

  const switchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const inputDOM: HTMLElement = document.getElementById("radio-other" + name)
    onChange(event)
    //setRequired(!required)
    //setDisabled(!disabled)
    console.log(event.target.value)
    /*if (!checked) {
      inputDOM.style.backgroundColor = "#f9fafb"
    } else {
      setValue("")
      inputDOM.style.backgroundColor = "#9ca3af"
    }*/
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
          type="radio"
          name={"radio" + name}
          id={"radio-other-option" + name}
          value="Lainnya"
          onChange={switchInput}
          checked={checked}
          className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-400 "
        ></input>
        <label
          htmlFor={"radio-other-option" + name}
          className="ms-2 text-slate-100"
        >
          Lainnya
        </label>
      </div>
      {checked && (
        <div className="mb-2" id={"radio-other" + name}>
          <input
            type="text"
            name={'radio-'+name}
            value={value}
            className="border  border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 w-full last:p-2.5 "
            placeholder="Lainnya"
            required={checked}
            disabled={!checked}
            onChange={handleChange}
          />
        </div>
      )}
      <style jsx>{`
        #${"radio-other" + name} {
          transition: all 0.5s ease;
          visibility: ${checked ? "visible" : "hidden"}
          opacity: ${checked ? "1" : "0"}
        }
      `}</style>
    </>
  )
}

export default RadiobuttonOther
