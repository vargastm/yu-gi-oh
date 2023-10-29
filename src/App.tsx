import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './Card'
import CardInfos from './CardInfos' 

interface CardInfosProps {
  id: string;
  name: string;
  card_images: {
    image_url_cropped: string;
  }[];
  type: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  race: string;
  desc: string;
}

function App() {
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState<CardInfosProps>();
  
  useEffect(() => {
      axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date').then(response => {
        setCards(response.data.data)
        setSelectedCard(response.data.data[0]);
      })

    },[]
  )
  
  const openCardInfo = (card: CardInfosProps) => {
    setSelectedCard(card);
  };


  return (
    <>
      <div className="content">
        <div className="card-list">
          {cards && cards.map(card => {
            return (        
              <Card card={card} onClick={() => openCardInfo(card)}/>
            )
          })}
        </div>
        {selectedCard && <CardInfos card={selectedCard} />}
      </div>
    </>
  )
}

export default App
