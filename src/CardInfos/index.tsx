import './style.css'

interface CardInfosProps {
  card: {
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
  };
}

function formatTypeClass(type: string) {
  return type.replace(/\s+/g, '-').toLowerCase();
}

const CardInfos: React.FC<CardInfosProps> = ({ card }) => {
  const { type } = card;
  const typeClass = formatTypeClass(type);

  return (
    <div className={`card-info ${typeClass}`}>
      <div className="card-info-content">
        <h2>Nome: {card.name}</h2>
        <img src={card.card_images[0].image_url_cropped} alt={card.name}/>
        <p>Tipo: {card.type}</p>
        {card.atk && <p>Ataque: {card.atk}</p>}
        {card.def && <p>Defesa: {card.def}</p>}
        {card.level && <p>Level: {card.level}</p>}
        {card.attribute && <p>Atributo: {card.attribute}</p>}
        <p>Raça: {card.race}</p>
        <p>Descrição: {card.desc}</p>
      </div>
    </div>
  );
};

export default CardInfos;
