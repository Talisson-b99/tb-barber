import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/app/components/ui/dialog'

interface DialogConfirmationReservationProps {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
}

const DialogConfirmationReservation = ({
  isDialogOpen,
  setIsDialogOpen,
}: DialogConfirmationReservationProps) => {
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="flex w-[70%] flex-col items-center justify-center rounded-lg">
        <CheckCircle2 className="h-20 w-20 fill-primary text-black" />
        <DialogTitle className="text-center text-xl font-bold">
          Reserva Realizada com Sucesso!
        </DialogTitle>

        <span className="text-sm text-muted-foreground">
          Sua reserva foi agendada com sucesso.
        </span>
        <Button
          onClick={() => setIsDialogOpen(false)}
          className="w-full"
          variant={'secondary'}
        >
          Confirmar
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirmationReservation
