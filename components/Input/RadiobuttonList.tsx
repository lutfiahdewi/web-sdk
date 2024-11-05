import { Dispatch, FC, SetStateAction, useRef } from "react"
import Radiobutton from "./Radiobutton"
import RadiobuttonOther from "./RadiobuttonOther"
import Wrapper from "./Wrapper"
export type Option = {
  nama: string
  isChecked?: boolean
  isDisabled?: boolean
}
export type InputProps = {
  OptionList: Option[]
  label: string
  name: string
  isRequired?: boolean
  classLabel?: string
  otherOption?: boolean
}

const RadiobuttonList: FC<{
  i: InputProps
  checkedItems: string
  setCheckedItems: Dispatch<SetStateAction<string>>
  lainnya?: string
  setLainnya?: Dispatch<SetStateAction<string>>
  children?: React.ReactNode
}> = ({ i, checkedItems, setCheckedItems, lainnya, setLainnya, children }) => {
  // Handle when an option choosen
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems( event.target.value);
    console.log(checkedItems)
  }

  return (
    <Wrapper>
      <label className={"block mb-2 text-lg font-medium text-slate-100 "}>
        {i.label}
        {i.isRequired && <span className="text-red-600"> *</span>}
      </label>
      {i.OptionList.map((option, idx) => (
        <Radiobutton
          Option={option}
          name={i.name}
          id={i.name + idx}
          key={i.name + idx.toString()}
          checked={checkedItems == option.nama}
          onChange={handleCheckboxChange}
        />
      ))}
      {(i.otherOption && lainnya != undefined && setLainnya!= undefined) && 
        <RadiobuttonOther
          name={i.name}
          checked={checkedItems == "Lainnya"}
          onChange={handleCheckboxChange}
          value={lainnya}
          setValue={setLainnya}
        />
      }
      <div className="children">{children}</div>
    </Wrapper>
  )
}

export default RadiobuttonList
