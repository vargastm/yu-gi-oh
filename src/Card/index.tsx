interface CardProps {
  card: {
    id: string;
    name: string;
    card_images: {
      image_url: string;
    }[];
  };
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div onClick={onClick} id={card.id}>
      <img src={card.card_images[0].image_url} alt={card.name} />
    </div>
  );
};

export default Card;

