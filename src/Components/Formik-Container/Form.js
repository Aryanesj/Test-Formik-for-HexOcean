import React from 'react'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl.js'
import axios from 'axios'

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
    cookingTimeDish: '',
    typeOfDish: '',
    numberOfSlices: '',
    diameter: '',
    sliceBread: '',
    spicinessScale: 6
  }

  const validationSchema = Yup.object({
    dish: Yup.string().required('Required'),
    cookingTimeDish: Yup.string().required('Required'),
    typeOfDish: Yup.string().required('Required'),
    numberOfSlices: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_PIZZA ? schema.required('Required') : schema.nullable()),
    diameter: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_PIZZA ? schema.required('Required') : schema.nullable()),
    spicinessScale: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_SOUP ? schema.required('Required') : schema.nullable()),
    sliceBread: Yup.number().when('typeOfDish', (typeOfDish, schema) => typeOfDish === ID_SANDWICH ? schema.required('Required') : schema.nullable()),
  })

  const onSubmit = values => {
    const commonData = {
      dish: values.dish,
      cookingTimeDish: values.cookingTimeDish,
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

    // FINAL DATA OBJECT!!!
    const data = {...commonData, ...variantData};

  axios
    .post('https://frosty-wood-6558.getsandbox.com/dishes', data)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    alert('Failed to make request! ' + JSON.stringify(error.message))
    });

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
              name='cookingTimeDish'
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
                control='input'
                label='Slices of bread:'
                name='sliceBread'
                type='number'
                placeholder='0'
                min='0'
                max='10'
              />
            </>)}

            <button type='submit' className='btn-submit' disabled={!formik.isValid}>Submit</button>
          </Form>
        }
      }
    </Formik>
  )
}

export default DishForm