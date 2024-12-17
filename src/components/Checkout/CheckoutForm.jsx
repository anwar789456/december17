import { useState, useEffect } from "react";
import { submitOrder } from "../../api/checkout";
import "./style.scss";
import Link from "next/link";
const countries = ['Tunisie', 'France', 'Allemagne', 'Belgique'];
const statesByCountry = {Tunisie: ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'],France: ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandie", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur", "Guadeloupe", "Guyane", "La Réunion", "Martinique", "Mayotte"],Allemagne: ["Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Niedersachsen", "Mecklenburg-Vorpommern", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"],Belgique: ["Anvers", "Limbourg", "Flandre-Orientale", "Brabant flamand", "Flandre-Occidentale", "Brabant wallon", "Hainaut", "Liège", "Luxembourg", "Namur", "Bruxelles-Capitale"]};

export default function CheckoutForm({ cartItems }) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    telephone: "",
    country: "",
    state: "",
    comments: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      nomPrenom: formData.firstName,
      pays: formData.country,
      gouvernorat: formData.state,
      email: formData.email,
      telephone: formData.telephone,
      comments: formData.comments,
      cartItems,
    };
    try {
      await submitOrder(orderData);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        document.getElementById("redirect-link").click();
        localStorage.setItem('cartItems', JSON.stringify([]));
      }, 6000);
    } catch (error) {
      alert("Error submitting order. Please try again.");
    }
  };

  return (
    <div className="checkout-form-container">
      <Link href="/" id="redirect-link">
        <div style={{ display: "none" }}>Home</div>
      </Link>
      {showMessage && (
        <div className="successmessageDiv">
          <div className="success-message">
            <span>Traitement de la Commande en cours!</span>
            <button className="close-btn" onClick={() => setShowMessage(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  width={14}
                  height={14}
                  fill={"none"}>
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <p>Nom & Prénom</p>
          <input autoComplete="off" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange}  className="inputField" />
        </div>
        <div className="form-group">
          <p>Pays</p>
          <select id="country" name="country" value={formData.country} onChange={handleInputChange}  className="inputField" >
            <option value="">Select Pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <p>Gouvernorat</p>
          <select id="state" name="state" value={formData.state} onChange={handleInputChange}  disabled={!formData.country} className={`inputField selectField ${!formData.country ? "select-disabled" : ""}`} >
            <option value="">Select Gouvernorat</option>
            {formData.country && statesByCountry[formData.country].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <p>Email</p>
          <input placeholder="example@gmail.com" autoComplete="off" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}  className="inputField" />
        </div>
        <div className="form-group">
          <p>Téléphone</p>
          <input placeholder="+216" autoComplete="off" type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange}  className="inputField" />
        </div>
        <div className="form-group">
          <p>Commentaire</p>
          <textarea placeholder="Ce champs n'est pas obligatoire" autoComplete="off" id="comments" name="comments" value={formData.comments} onChange={handleInputChange} className="textarea" />
        </div>
        <button type="submit" className="submit-button">Confirmer la commande</button>
      </form>
    </div>
  );
}