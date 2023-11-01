import {Link, useParams} from "react-router-dom";
import {useGetCardsQuery, useGetDeckQuery} from "@/services/decks";
import {useAuthMeQuery} from "@/services/auth";
import {ArrowBackSvg} from "@/assets/components/arrowBackSvg.tsx";
import {Typography} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";

export const Deck = () => {

  let {id} = useParams();

  const {data} = useGetDeckQuery({id})

  const {data: auth} = useAuthMeQuery()

  const {data: cards} = useGetCardsQuery({id})



  console.log(data)
  return <div>
    <div>
      <ArrowBackSvg/>
      <Typography variant={'body2'}
                  to={"/decks"}
                  as={Link}
                  children={'Back to Packs List'}/>
    </div>
    {data?.userId === auth?.id ?
      <div>
        {cards?.items.length === 0 && <Typography variant={'body1'}
                                               as={'p'}
                                               children={'This pack is empty. Click add new card to fill this pack'}/>}
        <Button type={'button'} children={'Add New Card'}/>
      </div>
      : <div>

      </div>
    }

  </div>
}