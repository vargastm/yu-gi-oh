import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './Card'
import CardInfos from './CardInfos' 

interface CardInfosProps {
  id: string;
  name: string;
  card_images: {
    image_url: string;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [cardSize, setCardSize] = useState("medium"); // Valor padrão é "medium"
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCards = (cards as CardInfosProps[]).filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;
    setCardSize(selectedSize);
  };
  
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
      <div>
        <input type="text" onChange={handleSearchChange} />
        <select name="cardWidth" id="cardWidth" onChange={handleSelectChange}>
          <option value="small">Pequeno</option>
          <option value="medium" selected>Médio</option>
          <option value="large">Grande</option>
        </select>
      </div>
      <div className="content">
        <div className={`card-list ${cardSize}`}>
          {filteredCards.map(card => (
            <Card card={card} onClick={() => openCardInfo(card)}/>
          ))}
        </div>
        {selectedCard && <CardInfos card={selectedCard} />}
      </div>
    </>
  )
}

export default App
