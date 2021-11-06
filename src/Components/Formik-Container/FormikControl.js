import React from 'react'
import Input from './Input.js'
import Textarea from './Textarea.js'
import Select from './Select.js'
import RadioButton from './RadioButton.js'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker.js'

function FormikControl(props) {
	const { control, ...rest } = props
	switch(control) {
		case 'input': return <Input {...rest} />
		case 'textarea': return <Textarea {...rest} />
		case 'select': return <Select {...rest} />
		case 'radio': return <RadioButton {...rest} />
		case 'checkbox': return <CheckboxGroup {...rest} />
		case 'date': return <DatePicker {...rest} />
		default: return null
	}
}

export default FormikControl