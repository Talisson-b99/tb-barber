import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

const BookingItem = () => {
  return (
    <>
      <h2 className="mt-6 text-sm font-bold text-muted-foreground">
        Agendamentos
      </h2>

      <Card className="mt-3">
        <CardContent className="flex justify-between p-0">
          <div className="flex-1 p-3">
            <Badge className="text-bold bg-[#221C3D] text-xs text-[#8162FF]">
              Confirmado
            </Badge>
            <h3 className="mb-2 mt-3 font-bold">Corte de Cabelo</h3>
            <div className="flex gap-2">
              <Avatar className="size-6">
                <AvatarImage src="/avatar.png" />
              </Avatar>
              <span className="text-sm">Vintage Barber</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 px-5 text-center">
            <p className="text-xs">Fevereiro</p>
            <p className="text-xl">06</p>
            <p className="text-xs">09:45</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
