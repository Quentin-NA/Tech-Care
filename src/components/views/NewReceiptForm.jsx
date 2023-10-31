import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../../css/newReceiptForm.css'; // Assurez-vous que le chemin du fichier CSS est correct

const NewReceiptForm = () => {

  const navigate = useNavigate(); 
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [failure, setFailure] = useState('');
  const [price, setPrice] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'model':
        setModel(value);
        break;
      case 'failure':
        setFailure(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'comment':
        setComment(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const elements = form.elements;
    const firstName = elements.firstName.value;
    const lastName = elements.lastName.value;
    const type = elements.type.value;
    const model = elements.model.value; 
    const failure = elements.failure.value;
    const price = elements.price.value;
    const comment = elements.comment.value;
    const email = elements.email.value;
    const phone = elements.phone.value;
  
    // Effectuez la requête POST avec Axios
    try {
      const response = await Axios.post('http://localhost:3001/receipts', {
        firstName: firstName, 
        lastName: lastName, 
        type: type, 
        model: model, 
        failure: failure, 
        price: price, 
        comment: comment,  
        email: email, 
        phone: phone,  
      });
      const newReceiptId = response.data.id;
      navigate(`/receipt/${newReceiptId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="matrix-form">
      <h1>Formulaire de Réparation d'Appareil</h1>
      <form onSubmit={handleSubmit}>

        <div className='details'>

          <div className='customer-details'>
            <h2>Informations client</h2>
            <div className="form-group">
              <label>Prénom:</label>
              <input type="text" id="firstName" value={firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Nom:</label>
              <input type="text" id="lastName" value={lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input id="email" type="text" value={email} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Telephone:</label>
              <input id="phone" type="text" value={phone} onChange={handleChange}/>
            </div>
          </div>

          <div className='device-details'>
            <h2>Informations appareil</h2>
            <div className="form-group">
              <label>Type d'Appareil:</label>
              <input type="text" id="type" value={type} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Modèle de l'Appareil:</label>
              <input type="text" id="model" value={model} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Type de Panne:</label>
              <input type="text" id="failure" value={failure} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tarif Annoncé en Magasin:</label>
              <input type="text" id="price" value={price} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Description de la Panne:</label>
              <textarea id="comment" value={comment} onChange={handleChange}></textarea>
            </div>
          </div>

        </div>

        <button className='validate-btn' type="submit">Valider</button>

      </form>
    </div>
  );
};

export default NewReceiptForm;
