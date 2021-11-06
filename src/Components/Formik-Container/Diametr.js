import React from 'react';
import {Field, ErrorMessage} from 'formik';
import FormikError from '../Formik-Error/FormikError.js';

function Diameter(props) {
	const {label, name, ...rest} = props
	return (
		<div className='form-control' >
			<label htmlFor={name} pattern="\d+(\.\d{2})?">{label}</label>
			<Field id={name} name={name} {...rest} autoComplete="off" />
			<ErrorMessage name={name} component={FormikError} />
		</div>
	)
}

export default Diameter