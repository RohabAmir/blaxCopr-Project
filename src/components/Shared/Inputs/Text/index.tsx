import React, { FC } from 'react'
import { Input } from 'antd'
import { Controller, useFormContext } from "react-hook-form"
interface ITextInput {
  name: string,
  placeholder?: string,
  label?: string,
  // control: any
}

const TextInput: FC<ITextInput> = ({ name, placeholder, label }) => {
  const { control } = useFormContext();
  return (
    <div>
      {label && <div style={{ margin: '10px 0', color: "#454745",fontSize:'14px' }}>{label} :</div>}
      <Controller
        render={({ field }) => (
          <Input {...field} placeholder={placeholder} style={{ padding: "10px", height: "48px", width: '100%' }} />
        )}
        control={control}
        name={name}
      />
    </div>
  )
}

export default TextInput