import React from 'react'
import {Field, ErrorMessage} from 'formik'
import FormikError from '../Formik-Error/FormikError.js'

function CheckboxGroup(props) {
	const {label, name, options, ...rest} = props
	return (
		<div className='form-control2'>
			<label htmlFor="">{label}</label>

			<Field name={name} {...rest}>
				{
					({ field }) => {
						return options.map(option => {
							return (
								<React.Fragment key={option.key}>
									<input 
									type="checkbox"
									id={option.value}
									{...field}
									value={option.value}
									checked={field.value.includes(option.value)}
								/>

								<label htmlFor={option.value}>{option.key}</label>

								</React.Fragment>
							)
						})
					}
				}
			</Field>
			<ErrorMessage name={name} component={FormikError} />
		</div>
	)
}

export default CheckboxGroup