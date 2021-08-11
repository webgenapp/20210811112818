import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Coffee } from '../types'

function DetailCoffee() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Coffee>(['coffees', id], () =>
    client.get(`/api/v1/coffees/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const coffee = data as Coffee

  return (
    <div>
      <label>{coffee.flavour}</label>
      <br />
    </div>
  )
}

export default DetailCoffee
