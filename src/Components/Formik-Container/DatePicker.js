import React from 'react'
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Field, ErrorMessage} from 'formik'
import FormikError from '../Formik-Error/FormikError.js'

function DatePicker (props) {
	const {label, name, ...rest} = props
	return (
		<div className='form-control'>
			<label htmlFor={name}>{label}</label>
			<Field name={name}>
				{({ form, field }) => {
						const { setFieldValue } = form
						const { value } = field
						return <DateView 
							id={name}
							{...field}
							{...rest}
							selected={value}
							onChange={val => setFieldValue(name, val)}
							showTimeSelect
							showTimeSelectOnly
							timeIntervals={5}
							timeFormat="HH:mm:ss"
							timeCaption="Time"
							dateFormat="HH:mm:ss"
							autoComplete="off"
							/>
					}
				}
			</Field>
			<ErrorMessage name={name} component={FormikError} />
		</div>
	)
}

export default DatePicker