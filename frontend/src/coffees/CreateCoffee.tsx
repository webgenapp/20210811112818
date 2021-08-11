import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Coffee, CoffeeError } from '../types'
import CoffeeForm from './CoffeeForm'
import { useHistory } from 'react-router-dom'

function CreateCoffee() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createCoffee = useMutation<Coffee, CoffeeError, Coffee>(
    (values) => {
      return client.post('/api/v1/coffees', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('coffees')
      },
    }
  )

  const handleSubmit = (
    values: Coffee,
    { setSubmitting }: FormikHelpers<Coffee>
  ) => {
    createCoffee.mutate(values)
    setSubmitting?.(false)
    history.push('/coffees')
  }

  return <CoffeeForm onSubmit={handleSubmit} />
}

export default CreateCoffee
