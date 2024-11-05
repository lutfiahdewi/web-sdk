import { Dispatch, FC, SetStateAction } from "react"
import Checkbox from "./Checkbox"
import CheckboxOther from "./CheckboxOther"
import Wrapper from "./Wrapper"

export type Option = {
  nama: string
  isChecked?: boolean
  isDisabled?: boolean
}
export type InputProps = {
  OptionList: Option[]
  label: string
  name:string
  isRequired?: boolean
  classLabel?: string
  otherOption?: boolean
}

const CheckboxList: FC<{
  i: InputProps
  checkedItems: string[]
  setCheckedItems: Dispatch<SetStateAction<string[]>>
  lainnya?: string
  setLainnya?: Dispatch<SetStateAction<string>>
  children?: React.ReactNode
}> = ({ i, checkedItems, setCheckedItems, lainnya, setLainnya, children }) => {
  // Handle when an option checked
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setCheckedItems(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    )
  }

  return (
    <Wrapper>
      <label className={"block mb-2 text-lg font-medium text-slate-100 "}>
        {i.label}
        {i.isRequired && <span className="text-red-600"> *</span>}
      </label>
      {i.OptionList.map((option, idx) => (
        <Checkbox
          Option={option}
          name={i.name}
          id={i.name + idx}
          key={i.name + idx.toString()}
          checked={checkedItems.includes(option.nama)}
          onChange={handleCheckboxChange}
        />
      ))}
      {(i.otherOption && lainnya != undefined && setLainnya!= undefined) && 
        <CheckboxOther
          name={i.name}
          Option={{ id:i.name, isRequired: false, isDisabled: true }}
          checked={checkedItems.includes("Lainnya")}
          onChange={handleCheckboxChange}
          value={lainnya}
          setValue={setLainnya}
        />
      }
      <div className="children">{children}</div>
    </Wrapper>
  )
}

export default CheckboxList
