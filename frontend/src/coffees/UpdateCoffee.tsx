import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import CoffeeForm from './CoffeeForm'
import { Coffee } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateCoffee() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Coffee>(['coffees', id], () =>
    client.get(`/api/v1/coffees/${id}`).then((response) => response.data)
  )

  const updateCoffee = useMutation<Coffee, any, Coffee>(
    (values: Coffee) =>
      client
        .put(`/api/v1/coffees/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('coffees')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const coffee = data as Coffee
  return (
    <CoffeeForm
      coffee={coffee}
      onSubmit={(values, { setSubmitting }) => {
        updateCoffee.mutate(values)
        setSubmitting?.(false)
        history.push('/coffees')
      }}
    />
  )
}

export default UpdateCoffee
