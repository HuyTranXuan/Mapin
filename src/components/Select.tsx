type SelectProps = {
  value: string
  options: string[]
  placeHolder?: string
  defaultValue?: string
  className?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = (props: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange) props.onChange(event)
  }

  return (
    <select
      value={props.value}
      className={`select ${props.className || ''}`}
      onChange={handleChange}
    >
      {!props.defaultValue && (
        <option value=''>{props.placeHolder || '---'}</option>
      )}
      {props.options.map((option, index) => (
        <option value={index} key={index} defaultValue={props.defaultValue}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Select
