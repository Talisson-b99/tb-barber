'use client'

import { useMutation } from '@tanstack/react-query'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { evaluateBooking } from '../actions/evalatue-booking'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'

interface StarRatingProps {
  bookingId: string
}

const StarRating = ({ bookingId }: StarRatingProps) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const handleClick = (index: number) => {
    setRating(index)
  }

  const { mutate } = useMutation({
    mutationFn: () => evaluateBooking(bookingId, rating),
    onSuccess: () => {
      toast.success('Avaliação realizada com sucesso', {
        id: 'evaluate-booking',
      })
    },
    onError: () => {
      toast.error('Erro ao avaliar', {
        id: 'evaluate-booking',
      })
    },
  })

  function handleClickConfirmEvaluation() {
    toast.loading('Avaliando...', {
      id: 'evaluate-booking',
    })
    mutate()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, index) => {
          index += 1
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              className={`${index <= (rating || hover) ? 'text-primary/50' : 'text-transparent'} py-5 focus:outline-none`}
            >
              <Star
                size={24}
                className={`${index <= (rating || hover) ? 'fill-primary/50 text-primary' : 'fill-transparent text-white'} `}
              />
            </button>
          )
        })}
      </div>
      <div className="flex gap-3">
        <Button className="w-full" variant={'secondary'}>
          <DialogClose>Cancelar</DialogClose>
        </Button>
        <Button className="w-full" onClick={handleClickConfirmEvaluation}>
          Confirmar
        </Button>
      </div>
    </div>
  )
}

export default StarRating
