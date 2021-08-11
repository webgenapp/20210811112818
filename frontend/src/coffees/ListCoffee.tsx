import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Coffee } from '../types'
import { useHistory } from 'react-router-dom'

type CoffeePreviewProps = {
  coffee: Coffee
  handleEdit: (coffee: Coffee) => void
  handleDelete: (coffee: Coffee) => void
  handleDetail: (coffee: Coffee) => void
}

function CoffeePreview({
  coffee,
  handleEdit,
  handleDelete,
  handleDetail,
}: CoffeePreviewProps) {
  return (
    <>
      {coffee.flavour}
      <br />
      <button type='button' onClick={() => handleDetail(coffee)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(coffee)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(coffee)}>
        delete
      </button>
    </>
  )
}

function ListCoffees() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const coffeesQuery = useQuery<Coffee[]>('coffees', () => {
    return client
      .get('/api/v1/coffees')
      .then((response) => response.data) as Promise<Coffee[]>
  })

  const deleteCoffee = useMutation<any, any, Partial<Coffee>>(
    ({ id }) => {
      return client.delete(`/api/v1/coffees/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('coffees')
      },
    }
  )

  const handleEdit = ({ id }: Coffee) => {
    history.push(`/coffees/update/${id}`)
  }

  const handleDelete = ({ id }: Coffee) => {
    deleteCoffee.mutate({ id })
  }

  const handleDetail = ({ id }: Coffee) => {
    history.push(`/coffees/detail/${id}`)
  }

  return (
    <>
      <p>{coffeesQuery.data?.length} coffees</p>
      <ul>
        {coffeesQuery.data?.map((coffee) => (
          <li key={coffee.id}>
            <CoffeePreview
              coffee={coffee}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListCoffees
