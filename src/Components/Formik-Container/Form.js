import React from 'react'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl.js'


const ID_PIZZA = 'pizza';
const ID_SOUP = 'soup';
const ID_SANDWICH = 'sandwich'

const DishForm = () => {

  const dropdownOptions = [
    {key: 'Choose a dish', value: ''},
    {key: 'Pizza', value: ID_PIZZA},
    {key: 'Soup', value: ID_SOUP},
    {key: 'Sandwich', value: ID_SANDWICH}
  ]

  const initialValues = {
    dish: '',
    timeDish: '',
    typeOfDish: '',
    numberOfSlices: '',
    diameter: '',
    sliceBread: '',
    spicinessScale: 6
  }

  const validationSchema = Yup.object({
    dish: Yup.string().required('Required'),
    timeDish: Yup.string().required('Required'),
    typeOfDish: Yup.string().required('Required'),
    numberOfSlices: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_PIZZA ? schema.required('Required') : schema.nullable()),
    diameter: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_PIZZA ? schema.required('Required') : schema.nullable()),
    spicinessScale: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_SOUP ? schema.required('Required') : schema.nullable()),
    sliceBread: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_SANDWICH ? schema.required('Required') : schema.nullable()),
  })

  const onSubmit = values => {
    const commonData = {
      dish: values.dish,
      timeDish: values.timeDish,
      typeOfDish: values.typeOfDish,
    }
    let variantData = {};
    if (values.typeOfDish === ID_PIZZA) {
      variantData = {
        numberOfSlices: values.numberOfSlices,
        diameter: values.diameter
      }
    }

    if (values.typeOfDish === ID_SOUP) {
      variantData = {
        spicinessScale: values.spicinessScale,
      }
    }

    if (values.typeOfDish === ID_SANDWICH) {
      variantData = {
        sliceBread: values.sliceBread,
      }
    }

    // ФИНАЛЬНЫЙ ОБЪЕКТ С ДАННЫМИ!!!
    const data = {...commonData, ...variantData};

    console.log(data);
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {
        formik => {
          // console.log(formik.values);
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

            {formik.values.typeOfDish === ID_PIZZA && (<>
              <FormikControl
                className='form-nubmer'
                control='input'
                label='Number of slices:'
                name='numberOfSlices'
                type='number'
                placeholder='0'
                min='0'
                max="15"
              />
              <FormikControl
                control='input'
                label='Diameter:'
                name='diameter'
                type='number'
                placeholder='30,5 cm'
                min="30.5"
                max="90.5"
                step="10 cm"
              />
            </>)}

            {formik.values.typeOfDish === ID_SOUP && (<>
              <FormikControl
                className='form-nubmer'
                control='input'
                label='Spiciness scale:'
                name='spicinessScale'
                type='range'
                min='1'
                max='10'
              />
            </>)}

            {formik.values.typeOfDish === ID_SANDWICH && (<>
              <FormikControl
                className='form-nubmer'
                control='input'
                label='Slices of bread:'
                name='sliceBread'
                type='number'
                placeholder='0'
                min='0'
                max='10'
              />
            </>)}

            <button type='submit' disabled={!formik.isValid}>Submit</button>
          </Form>
        }
      }
    </Formik>
  )
}

export default DishForm