import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { firebaseData } from '../../provider/DataProvider'
import Firebase from '../../firebase/Firebase'

const colStyle = {
  backgroundColor: '#ffccd2',
};

const Promotions = () => {
  //const { handleDeletePromotion, promotions, getPromotions } = useContext(firebaseData)
  const db = Firebase.firestore();
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const unsub = db.collection('promotions').onSnapshot(snapshot => {
      const allPromotions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPromotions(allPromotions);
    });
    return () => {
      unsub();
    };
  }, []);

  const deletePromotion = id => {
    Firebase.firestore().collection('promotions')
      .doc(id)
      .delete();
  };
  return (

    <div className="row">
      {
        promotions.map((promotion) =>
          <Col key={promotion.id} md="4" className="mb-4">
            <div className="p-4 rounded-lg" style={colStyle}>
              <div>
                <img src={promotion.imageURL} className="w-100" alt="" />
                <div className="mt-3 text-center">
                  <Button className="ml-3 px-4 rounded-pill btn-block" variant="danger" size="lg" onClick={() => deletePromotion(promotion.id)}>حجز العرض</Button>
                </div>
                <div className="bg-white text-secondary rounded-lg text-right px-3 py-2 mt-3">
                  <small>قسم : {promotion.department}</small><br />
                  <small>كلمات مفتاحية : {promotion.keywords}</small>
                </div>
              </div>
            </div>
          </Col>
        )
      }

    </div>

  )
}

export default Promotions;
