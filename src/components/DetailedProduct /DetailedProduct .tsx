import './DetailedProduct.css';
import React from 'react';
import dressPick from '../../assets/images/dress.png';

const DetailedProduct: React.FC = () => {
  return (
    <div className="prod-container">
      <div className="prod-pic">
        <img src={dressPick} alt="Dress" />
      </div>
      <div className="prod-desc-container">
        <h2 className="prod-title">Linen dress</h2>
        <div className="desc-wrapper">
          <h4 className="prod-desc-title">Info</h4>
          <p className="prod-desc">
            Dress made of 100% linen. Casual feminine dress with puffed sleeves. The length of the
            dress is midi, below the knee. Button closure on the back, neck without trimming.
            Natural coconut buttons. Free cut bodice with darts, moderately puffy skirt, puffy
            sleeves above the elbow, gathered on the elastic band at the bottom. Basic dress will
            suit girls of any age, as well as pregnant women. Linen dress looks expensive and noble,
            will become the basis of any fashionable image. 100% softened linen with a crumpled
            effect perfectly transmits air and absorbs moisture, it is a hypoallergenic material of
            the highest quality. The manufacturer of the fabric is Orsha Flax Factory (Belarus). The
            dress will fit well for a height of 155-170 cm. Model&apos;s height is 171 cm, chest
            circumference is 74 cm, dress size on the photo is 38.
          </p>
        </div>
        <div className="price">
          $ <span className="cost">1</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
