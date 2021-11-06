import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl.js'

const DishForm = () => {

	const dropdownOptions = [
		{ key:'Choose a dish', value: '' },
		{ key:'Pizza', value: 'pizza' },
		{ key:'Soup', value: 'soup' },
		{ key:'Sandwich', value: 'sandwich' }
]

	const initialValues = {
		dish: '',
		timeDish: '',
		typeOfDish: '',
		numberOfSlices: '',
		diameter: '',
		sliceBread: '',
		spicinessScale: ''
	}

	const validationSchema = Yup.object({
		dish: Yup.string().required('Required'),
		timeDish: Yup.string().required('Required').nullable(),
		typeOfDish: Yup.string().required('Required'),
		numberOfSlices: Yup.number().required('Required'),
		diameter: Yup.number().required('Required'),
		sliceBread: Yup.number().required('Required'),
		spicinessScale: Yup.number().required('Required')
	})

	const onSubmit = values => {
		console.log('Form data', values)
	}

	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} >
			{
				formik => {
					return <Form className='form-control'>

					<FormikControl
						control='input'
						type='text'
						label='Dish name'
						name='dish'
					/>

					<FormikControl 
						control='date'
						label='Choose a cooking time' 
						name='timeDish'
					/>

					<FormikControl
						className='form-dish'
						control='select'
						label='Type of dish'
						name='typeOfDish'
						options={dropdownOptions}
					/>
{/*---------------------------------------------------------------------------------*/}
					<FormikControl
						className='form-nubmer'
						control ='input'
						label='Number of slices:'
						name='numberOfSlices'
						type='number'
						placeholder='0'
						min='0'
						max="15"
					/>


					<FormikControl 
						control ='input'
						label='Diameter:'
						name='diameter'
						type='number'
						placeholder='30,5 cm'
						min="30.5"
						max="90.5"
						step="10 cm"
					/>

					<FormikControl
						className='form-nubmer'
						control ='input'
						label='Spiciness scale:'
						name='spicinessScale'
						type='range'
						min='1'
						max='10'
					/>

					<FormikControl
						className='form-nubmer'
						control ='input'
						label='Slices of bread:'
						name='sliceBread'
						type='number'
						placeholder='0'
						min='0'
						max='10'
					/>


						<button type='submit' disabled={!formik.isValid}>Submit</button>
					</Form>
				}
			}
		</Formik>
	)
}

export default DishForm