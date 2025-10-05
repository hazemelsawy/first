import React from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const Styles = styled.div`
  input[type="radio"]{
      width:30px;
      height:30px;
  }
  #agreeToTerms{
      width:30px;
      height:30px;
  }
  .form-group {
    background: #eee;
    padding: 20px;
    border-radius: 10px;
  }
  .alert-warning{
    background:#fff3cd
  }
  .form-group span{
      overflow:hidden;
      display:inline-block;
      padding-top:15px;
  }
  span label{
      float:right;
      margin-top:5px;
  }
  span input[type="radio"]{
    float:right;
    margin-left: 20px;
  }
  li input[type="checkbox"]{
      width:20px;
      height:20px;
  }
`;
export default function Step3(props) {
    const handleFormSubmit = e => {
        e.preventDefault();

    }
    if (props.currentStep !== 3) { // Prop: The current step
        return null
    }
    // The markup for the Step 1 UI
    return (
        <Styles>
            <h5 className="text-center mb-3 font-weight-bold">الدفع</h5>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="fullName" className="text-right">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <Form.Control type="text" name="emailAddress" value={props.values.emailAddress} onChange={props.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="fullName" className="text-right">
                    <Form.Label>رقم الهاتف</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={props.values.phoneNumber} onChange={props.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="fullName" className="text-right">
                    <Form.Label>رقم البطاقة</Form.Label>
                    <Form.Control type="text" name="cardNumber" value={props.values.cardNumber} onChange={props.handleInputChange} />
                </Form.Group>
                <Form.Group className="overflow-hidden alert alert-warning text-right">
                    <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        className="float-right ml-2"
                        value="yes"
                        checked={props.values.agreeToTerms === "yes"}
                        onChange={props.handleInputChange} />
                    <p className="overflow-hidden mb-0">
                        <label htmlFor="agreeToTerms" className="d-inline text-right">نعم انا {props.values.fullName} اقر بصحة جميع المعلومات المذكورة أعلاه و أتحمل مسؤولية ما جاء فيها و انني قرأت نموذج اقرار للعلاج بالليزر للعمل بما جاء فيه دون ادنى مسؤولية على المركز الإختصاصي الطبي الأول.</label>
                    </p>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput4" className="bg-white px-0 pt-0">
                    <Button type="submit" className="btn-block btn-lg">الحــــجز</Button>
                </Form.Group>
                <div id="example-collapse-text" className="mt-3">
                            <h6 className="font-weight-bold">General information:</h6>
                            <ul>
                                <li>The laser affects the eye, so the patient must wear glasses during the session.</li>
                                <li>After the laser, the patient may feel pain and redness and swelling, mild burning, discoloration of the skin, scar formation occurs.</li>
                                <li>A local anesthetic can be used for the sensitive area before treatment to relieve this discomfort. Some hair may appear after 5 to 20 days.</li>
                                <li>In the case of wanting to remove light hair (fluff), it may turn into somewhat thick hair in some areas (in some devices), and it is preferred to remove it with dedicated devices for that.</li>
                                <li>Free retouch sessions are unpaid and are only on the location of the hair and it’s done within 14 days only from the date of the basic session and cannot be provided in any way after the 14 days. However the center has the right not to provide free retouch sessions at any time and without referring to the patient or his approval.</li>
                                <li>You must adhere to the use of the ointment prescribed according to the prescription and also adhere to the doctor's instructions.</li>
                                <li>In the event that the marketing offer is taken, it will not be replaced with other service, as the area within the offer will be adhered to.</li>
                                <li>The patient may need several sessions (4-8) to reach the required and this depends on each case.</li>
                                <li>The attending physician should be consulted before starting the session if the patient has a specific symptom or uses certain medications and to determine the type of device used.</li>
                                <li>It is forbidden to use lasers with pregnant women, patients with epilepsy, vitiligo, psoriasis, or children under the age of puberty.</li>
                                <li>In the event of a burn, God forbid or allergic, the clinic is reviewed immediately and within a week maximum.</li>
                            </ul>
                            <h6>Important instructions before the session:</h6>
                            <ol>
                                <li>Not to remove hair with pluck or wax for 6 to 8 weeks before starting the sessions.</li>
                                <li>Not being exposed to sunlight, "sauna," Jacuzzi, or suntan for a month before the session.</li>
                                <li>Avoid conducting other laser sessions or peeling for at least 20 days before starting the sessions.</li>
                                <li>Do not use dark skin whitening creams two weeks before starting sessions.</li>
                                <li>Not to take any kind of medicine, especially Roaccutane.</li>
                                <li>The need to shave the area a day or two before the laser and before attending the clinic, knowing that the center does not allow the service to be provided in the clinic by the patient.</li>
                            </ol>
                            <h6 className="font-weight-bold">Post-session tips:</h6>
                            <ol>
                                <li>Wash the treated area with cold water two hours after the session.</li>
                                <li>Avoid direct exposure to sunlight, "Sauna," Jacuzzi, "Moroccan bath, peeling or dressing for at least nine days.</li>
                                <li>Avoid wearing tight-fitting clothes and prefer wide cotton clothes.</li>
                                <li>Avoid removing hair with pluck, wax or peeling between sessions.</li>
                                <li>Not to use cosmetics or perfumes for 24 hours after the session.</li>
                                <li>Not to conduct other laser sessions or peeling for 20 days after the session.</li>
                                <li>Apply cold compresses for a quarter of an hour to relieve pain and redness.</li>
                                <li>Soap can be used on the treated area a day after the session.</li>
                                <li>Do not use scented creams.</li>
                                <li>Use sunscreen after the sessions are over, not during or before them.</li>
                            </ol>
                            <h6 className="font-weight-bold">Tips and Advice:</h6>
                            <ul>
                                <li>Wait at least three weeks for chemical peels.</li>
                                <li>Wait at least 21 days before starting any new laser session.</li>
                                <li>Wait eight weeks if the laser treatment is already done.</li>
                                <li>Wait at least a week for treatment with crystal peeling.</li>
                                <li>It is preferable to stop taking topical medications 3-5 days before the session</li>
                            </ul>
                            <h6 className="font-weight-bold">
                                Agreement and authorization contract:
            </h6>
                            <p> I hereby authorize the First Specialized Medical Center to treat my medical
                            devices and equipment in the laser department in order to selectively destroy
                            it without causing damage to the surrounding tissue, and I have understood that
                            it may occur to me scarring or blurring or hypopigmentation or increased pigmentation,
                            which are natural complications of this procedure and are often temporary and  They
                            disappear within a few days and to obtain the best results, the sessions may be repeated
                            sometimes and I have to attend the sessions according to the dates given to me and the
                            center has the right in the event that I want to cancel the offer to deduct the value of
                            the executed sessions completely and without my benefit from the discount and the basic
                            price of the session and amounting to four hundred riyals and  In the event that I do not
                            have any session, I agree to the policy of the center to recover, which requires that the
                            return be within only three days from the date of the invoice is issued and I have no right
                            to demand the refund of the funds after the three days and be transferred as a balance to the
                            patient  in the clinic, as I understood that I must adhere to  with the dates given to me and
                            not be late for more than five minutes and in the event of delaying for more than five minutes,
                            the appointment will automatically turn to waiting, as I do not have the right to request a retouch
                            session that is affiliated with it, and therefore the retouch session is considered to be submitted
                            to me, and that my right to the bill falls automatically in the event of failure to implement  for
                            service within two years from the date of the bill’s issuance, and in the event that I want to conduct
                            a self-hair removal service, I am clearing the center’s responsibility of any complications that may
                            occur to me during my procedure for this self-service and I have no right to claim or complain and bear
                            responsibility for any malfunction or damage to the device as a result of my use of it  And I pledge to
                            cover the costs of validity, if any. And I understood that after the laser treatment
                            immediately the treatment area may appear red in color and have swelling that lasts for
                            two hours or more and that the redness may last from (2-3) days and in some cases an
                            antibiotic should be used and I understood and read everything that was mentioned The
                    above instructions and approval and authorization form are approved by them.</p>
                        </div>
            </Form>
        </Styles>

    )
}