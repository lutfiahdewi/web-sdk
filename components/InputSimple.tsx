import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
  }
  content: string;
  published: boolean;
}
export type InputProps = {
    type: string;
    label: string;
    name: string;
    placeholder: string;
    isRequired: boolean;
    isDisabled: boolean;
    id?: string;
    classLabel?: string;
    classInput?: string;
    other?: string;

}

const InputSimple: React.FC<{i: InputProps}> = ({ i }) => {
  const idInput = i.id ?? i.name
  return(
    <div className="mb-3">
            <label
              htmlFor={i.name}
              className={"block mb-2 text-lg font-medium text-slate-100" + i.classLabel}
            >
              {i.label}
            </label>
            <input
              type={i.type}
              id={idInput}
              name={i.name}
              className= {"bg-gray-50 border border-gray-700 text-gray-900 rounded-lg focus:ring-slate-100 focus:border-blue-500 block w-full p-2.5 " + i.classInput }
              placeholder={i.placeholder}
              required={i.isRequired}              
              disabled={i.isDisabled}              
            />
          </div>
//   <ReactMarkdown children={i.type} />
  )  
}

export default InputSimple