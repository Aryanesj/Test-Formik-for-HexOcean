import React from 'react'
import {Field, ErrorMessage} from 'formik'
import FormikError from '../Formik-Error/FormikError.js'

function Textarea(props) {
	const {label, name, ...rest} = props
	return (
		<div className='form-control'>
			<label htmlFor={name}>{label}</label>
			<Field as='textarea' id={name} name={name} {...rest} />
			<ErrorMessage  name={name} component={FormikError} />
		</div>
	)
}

export default Textarea