import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import { Button, Collapse, Row, Col, Container, Alert } from 'react-bootstrap';
import FadeIn from 'react-fade-in'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { BookingsContext } from '../contexts/Bookings'
import pattern from '../assets/pattern.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import mada from '../assets/mada.png'
import mada2 from '../assets/mada2.png'
import stcpay from '../assets/stcpay.jfif'


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
    background: rgb(174,133,47);
    background: radial-gradient(circle, rgb(255 238 201 / 10%) 0%, rgb(179 144 72 / 20%) 100%);
    padding: 20px;
    border-radius: 10px;
  }
  .form-group.book-button{
      background: none;
  }
  .form-group .form-group{
      background:none !important;
      border:none !important;
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
  .DayPickerInput-Overlay{
    right:0;
    left: auto  
}
.bg-transparent{
    background:transparent !important;
}
.patternbg-container::before {
    content: "";
    background: url("${pattern}");
    background-color: #c1a365;
    background-size: 150px;
    opacity: 0.12;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }
  .bg-white{
    background: rgba(255,255,255,0.5) !important;
  }
`;
export default function Step2(props) {
    const [open, setOpen] = useState(false);
    const { totalFire, applyTax, totalObjFire } = useContext(BookingsContext);
    const [agreed, setAgreed] = useState("pending")
    useEffect(() => {
        let total = totalFire;
        let totalItems = totalObjFire;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (props.currentStep !== 2) { // Prop: The current step
        return null
    }
    // The markup for the Step 1 UI


    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.values.agreeToTerms === "yes") {
            let avlbl = true;
            totalObjFire.map(booking => {
                if (!booking.avlbl) {
                    avlbl = false;
                }
            })
            if (avlbl && totalFire > 0) {
                props.handleAddBooking()
            } else {
                props.setModalShow(true)
                setTimeout(function () { window.location.href = "/bookings-preview"; }, 3000);

                ;
            }
        } else {
            setAgreed("no")
        }
    }
    return (

        <Styles>
            <Form onSubmit={handleSubmit}>
                <FadeIn>
                    <p className="text-center text-secondary">عزيزي المراجع: المعلومات المعطاة هنا تعتبر خصوصية و لن يصرح بها لأحد ليس له علاقة بمعالجة المريض.</p>

                    <h5 className="text-center mb-3 font-weight-bold">التاريخ المرضي</h5>

                    <Form.Group className="text-right">
                        <Form.Label>هل لديك ماتصرح عنه ؟ *</Form.Label><br />
                        <span className="ml-3">
                            <label htmlFor="male" className="ml-2">نعم</label>
                            <input type="radio" required id="generalDeclareYes" name="generalDeclare" value="yes" checked={props.values.generalDeclare === "yes"} onChange={props.handleInputChange} />
                        </span>
                        <span>
                            <label htmlFor="female" className="ml-2">لا</label>
                            <input type="radio" id="generalDeclareNo" name="generalDeclare" value="no" checked={props.values.generalDeclare === "no"} onChange={props.handleInputChange} />
                        </span>
                    </Form.Group>

                    {props.values.generalDeclare === "yes" && (
                        <FadeIn>
                            <Form.Group className="text-right">
                                <Form.Label>الجنس *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="male" className="ml-2">ذكر</label>
                                    <input type="radio" required id="male" name="gender" value="male" checked={props.values.gender === "male"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="female" className="ml-2">أنثى</label>
                                    <input type="radio" id="female" name="gender" value="female" checked={props.values.gender === "female"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>
                            <Form.Group className="text-right">
                                <Form.Label>هل تستعمل أدوية حالياً؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="medicationYes" className="ml-2">نعم</label>
                                    <input type="radio" required id="medicationYes" name="medication" value="yes" checked={props.values.medication === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="medicationNo" className="ml-2">لا</label>
                                    <input type="radio" id="medicationNo" name="medication" value="no" checked={props.values.medication === "no"} onChange={props.handleInputChange} />
                                </span>

                                {props.values.medication === "yes" && (
                                    <FadeIn>
                                        <Form.Group controlId="medicineName" className="p-0">
                                            <Form.Label>إسم الدواء *</Form.Label>
                                            <Form.Control required as="textarea" rows="3" name="medicineName" value={props.values.medicineName || ''} onChange={props.handleInputChange} />
                                        </Form.Group>
                                    </FadeIn>
                                )}
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل سبق أن أجريت عملية جراحية أو علاج بالآشعة ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="surgeryRadioYes" className="ml-2">نعم</label>
                                    <input type="radio" required id="surgeryRadioYes" name="surgeryRadio" value="yes" checked={props.values.surgeryRadio === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="surgeryRadioNo" className="ml-2">لا</label>
                                    <input type="radio" id="surgeryRadioNo" name="surgeryRadio" value="no" checked={props.values.surgeryRadio === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل سبق أن أصبت بأي من الأمراض التالية :</Form.Label><br />
                                <ul className="list-unstyled row p-0">
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="heartDiseases"
                                            name="heartDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.heartDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="heartDiseases"
                                                className="d-inline text-right">
                                                أمراض القلب
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="bloodPressureDiseases"
                                            name="bloodPressureDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.bloodPressureDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="bloodPressureDiseases"
                                                className="d-inline text-right">
                                                أمراض ضغط الدم
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="epilepsyDiseases"
                                            name="epilepsyDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="epilepsyDiseases"
                                                className="d-inline text-right">
                                                أمراض الصرع
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="kidneyDiseases"
                                            name="kidneyDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.kidneyDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="kidneyDiseases"
                                                className="d-inline text-right">
                                                أمراض الكلى
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="diabetesDiseases"
                                            name="diabetesDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.diabetesDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="diabetesDiseases"
                                                className="d-inline text-right">
                                                أمراض السكري
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="aidsDiseases"
                                            name="aidsDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.aidsDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="aidsDiseases"
                                                className="d-inline text-right">
                                                مرض نقص المناعة \ الإيدز
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="liverDiseases"
                                            name="liverDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.liverDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="liverDiseases"
                                                className="d-inline text-right">
                                                التهاب الكبد الوبائي Hepatitis
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="cancerDiseases"
                                            name="cancerDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.cancerDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="cancerDiseases"
                                                className="d-inline text-right">
                                                السرطان
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="reproductionDiseases"
                                            name="reproductionDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.reproductionDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="reproductionDiseases"
                                                className="d-inline text-right">
                                                أمراض تناسلية
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="asthmaDiseases"
                                            name="asthmaDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.asthmaDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="asthmaDiseases"
                                                className="d-inline text-right">
                                                الربو
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="thyroidDiseases"
                                            name="thyroidDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.thyroidDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="thyroidDiseases"
                                                className="d-inline text-right">
                                                أمراض الغدة الدرقية
            </label>
                                        </p>
                                    </li>
                                    <li className="col-md-4 col-6 mt-3">
                                        <input
                                            type="checkbox"
                                            id="otherDiseases"
                                            name="otherDiseases"
                                            className="float-right ml-2"
                                            value="yes"
                                            checked={props.values.otherDiseases === "yes"}
                                            onChange={props.handleInputChange} />
                                        <p className="overflow-hidden mb-0">
                                            <label
                                                htmlFor="otherDiseases"
                                                className="d-inline text-right">
                                                أخرى
            </label>
                                        </p>
                                    </li>
                                </ul>
                                {props.values.otherDiseases === "yes" && (
                                    <FadeIn>
                                        <Form.Group controlId="otherDiseasesClarify" className="p-0">
                                            <Form.Label>لطفا وضح *</Form.Label>
                                            <Form.Control required as="textarea" rows="3" name="otherDiseasesClarify" value={props.values.otherDiseasesClarify || ''} onChange={props.handleInputChange} />
                                        </Form.Group>
                                    </FadeIn>
                                )}
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل أصابك أو أي من أفراد عائلتك أحد الأمراض المتعلقة بالنزيف أو التجلط ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="ruralCoagulationYes" className="ml-2">نعم</label>
                                    <input type="radio" required id="ruralCoagulationYes" name="ruralCoagulation" value="yes" checked={props.values.ruralCoagulation === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="ruralCoagulationNo" className="ml-2">لا</label>
                                    <input type="radio" id="ruralCoagulationNo" name="ruralCoagulation" value="no" checked={props.values.ruralCoagulation === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل لديك حساسية ضد البنسلين أو أي دواء آخر ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="penicillinOtherYes" className="ml-2">نعم</label>
                                    <input type="radio" required id="penicillinOtherYes" name="penicillinOther" value="yes" checked={props.values.penicillinOther === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="penicillinOtherNo" className="ml-2">لا</label>
                                    <input type="radio" id="penicillinOtherNo" name="penicillinOther" value="no" checked={props.values.penicillinOther === "no"} onChange={props.handleInputChange} />
                                </span>
                                {props.values.penicillinOther === "yes" && (
                                    <FadeIn>
                                        <Form.Group controlId="penicillinOtherClarify" className="p-0">
                                            <Form.Label>وضّح *</Form.Label>
                                            <Form.Control required as="textarea" rows="3" name="penicillinOtherClarify" value={props.values.penicillinOtherClarify || ''} onChange={props.handleInputChange} />
                                        </Form.Group>
                                    </FadeIn>
                                )}
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل سبق وتعالجت بأي من أدوية الكورتيزون ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="cortisoneYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="cortisoneYes" name="cortisone" value="yes" checked={props.values.cortisone === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="cortisoneNo" className="ml-2">لا</label>
                                    <input type="radio" id="cortisoneNo" name="cortisone" value="no" checked={props.values.cortisone === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل تدخن ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="smokingYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="smokingYes" name="smoking" value="yes" checked={props.values.smoking === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="smokingNo" className="ml-2">لا</label>
                                    <input type="radio" id="smokingNo" name="smoking" value="no" checked={props.values.smoking === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل عانيت من أي مشاكل نتيجة لعلاج أسنانك ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="teethProblemsYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="teethProblemsYes" name="teethProblems" value="yes" checked={props.values.teethProblems === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="teethProblemsNo" className="ml-2">لا</label>
                                    <input type="radio" id="teethProblemsNo" name="teethProblems" value="no" checked={props.values.teethProblems === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل تعاني من أي أمراض أو مشاكل صحية ليست مذكورة أعلاه ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="otherProblemsYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="otherProblemsYes" name="otherProblems" value="yes" checked={props.values.otherProblems === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="otherProblemsNo" className="ml-2">لا</label>
                                    <input type="radio" id="otherProblemsNo" name="otherProblems" value="no" checked={props.values.otherProblems === "no"} onChange={props.handleInputChange} />
                                </span>
                                {props.values.otherProblems === "yes" && (
                                    <FadeIn>
                                        <Form.Group controlId="otherProblemsClarify" className="p-0">
                                            <Form.Label>وضّح *</Form.Label>
                                            <Form.Control required as="textarea" rows="3" name="otherProblemsClarify" value={props.values.otherProblemsClarify || ''} onChange={props.handleInputChange} />
                                        </Form.Group>
                                    </FadeIn>
                                )}
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل يوجد ماتود التصريح عنه ؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="declareYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="declareYes" name="declare" value="yes" checked={props.values.declare === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="declareNo" className="ml-2">لا</label>
                                    <input type="radio" id="declareNo" name="declare" value="no" checked={props.values.declare === "no"} onChange={props.handleInputChange} />
                                </span>
                                {props.values.declare === "yes" && (
                                    <FadeIn>
                                        <Form.Group controlId="declaration" className="p-0">
                                            <Form.Label>التصريح *</Form.Label>
                                            <Form.Control required as="textarea" rows="3" name="declaration" value={props.values.declaration || ''} onChange={props.handleInputChange} />
                                        </Form.Group>
                                    </FadeIn>
                                )}
                            </Form.Group>

                            {props.values.gender === "female" && (
                                <>
                                    <Form.Group className="text-right">
                                        <Form.Label>هل أنت حامل ؟ *</Form.Label><br />
                                        <span className="ml-3">
                                            <label htmlFor="pregnantYes" className="ml-2">نعم</label>
                                            <input required type="radio" id="pregnantYes" name="pregnant" value="yes" checked={props.values.pregnant === "yes"} onChange={props.handleInputChange} />
                                        </span>
                                        <span>
                                            <label htmlFor="pregnantNo" className="ml-2">لا</label>
                                            <input type="radio" id="pregnantNo" name="pregnant" value="no" checked={props.values.pregnant === "no"} onChange={props.handleInputChange} />
                                        </span>
                                        {props.values.pregnant === "yes" && (
                                            <FadeIn>
                                                <Form.Group controlId="pregnantClarify" className="p-0">
                                                    <Form.Label>ما الموعد المحدد للولادة *</Form.Label><br />
                                                    {/*<DatePicker
                                                showOverlay={true}
                                                keepFocus={false}
                                                selected={props.values.birthDueDate}
                                                onChange={props.handleInputChange}
                                                value={props.values.birthDueDate || ''}
                                                minDate={new Date()}
                                                required
                                            />
 */}
                                                    <DayPickerInput
                                                        inputProps={
                                                            { required: true }
                                                        }
                                                        dayPickerProps={{ disabledDays: { before: new Date() } }}
                                                        onDayChange={props.handleInputChange}
                                                    />
                                                </Form.Group>
                                            </FadeIn>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="text-right">
                                        <Form.Label>هل تعانين من إضطرابات الدورة الشهرية ؟ *</Form.Label><br />
                                        <span className="ml-3">
                                            <label htmlFor="menstrualDisorderYes" className="ml-2">نعم</label>
                                            <input type="radio" required id="menstrualDisorderYes" name="menstrualDisorder" value="yes" checked={props.values.menstrualDisorder === "yes"} onChange={props.handleInputChange} />
                                        </span>
                                        <span>
                                            <label htmlFor="menstrualDisorderNo" className="ml-2">لا</label>
                                            <input type="radio" id="menstrualDisorderNo" name="menstrualDisorder" value="no" checked={props.values.menstrualDisorder === "no"} onChange={props.handleInputChange} />
                                        </span>
                                    </Form.Group>

                                    <Form.Group className="text-right">
                                        <Form.Label>هل تستعملين حبوب منع الحمل ؟ *</Form.Label><br />
                                        <span className="ml-3">
                                            <label htmlFor="birthControlYes" className="ml-2">نعم</label>
                                            <input required type="radio" id="birthControlYes" name="birthControl" value="yes" checked={props.values.birthControl === "yes"} onChange={props.handleInputChange} />
                                        </span>
                                        <span>
                                            <label htmlFor="birthControlNo" className="ml-2">لا</label>
                                            <input type="radio" id="birthControlNo" name="birthControl" value="no" checked={props.values.birthControl === "no"} onChange={props.handleInputChange} />
                                        </span>
                                    </Form.Group>
                                </>
                            )}
                            <h5 className="text-center mb-3 font-weight-bold"> العلاج بالليزر</h5>

                            <Form.Group className="text-right">
                                <Form.Label>هل سبق لك ان عملت الليزر؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="workedLasersYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="workedLasersYes" name="workedLasers" value="yes" checked={props.values.workedLasers === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="workedLasersNo" className="ml-2">لا</label>
                                    <input type="radio" id="workedLasersNo" name="workedLasers" value="no" checked={props.values.workedLasers === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>

                            <Form.Group className="text-right">
                                <Form.Label>هل لديك تحسس جلدي؟ *</Form.Label><br />
                                <span className="ml-3">
                                    <label htmlFor="skinAllergyYes" className="ml-2">نعم</label>
                                    <input required type="radio" id="skinAllergyYes" name="skinAllergy" value="yes" checked={props.values.skinAllergy === "yes"} onChange={props.handleInputChange} />
                                </span>
                                <span>
                                    <label htmlFor="skinAllergyNo" className="ml-2">لا</label>
                                    <input type="radio" id="skinAllergyNo" name="skinAllergy" value="no" checked={props.values.skinAllergy === "no"} onChange={props.handleInputChange} />
                                </span>
                            </Form.Group>
                        </FadeIn>
                    )}

                    <Form.Group className="text-right">
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn-warning"
                        >
                            قراءة نموذج اقرار العلاج بالليزر
</Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text" className="mt-3">
                                <h6 className="font-weight-bold">معلومات عامة :</h6>
                                <ul>
                                    <li>الليزر يؤثر على العين فيجب على المريض ارتداء النظارات خلال الجلسة.</li>
                                    <li>قد يشعر المريض بعد الليزر بالألم و يحصل احمرار و تورم, حرقان خفيف, تلون الجلد, تشكيل ندبة.</li>
                                    <li>يمكن استخدام مخدر موضعي للمنطقة الحساسة قبل العلاج لتخفيف من هذه المضايقات.</li>
                                    <li>قد يظهر بعض الشعر  بعد 5 الى 20 يوم.</li>
                                    <li>في حال ازالة الشعر الزغب (الخفيف) قد يتحول الى شعر سميك نوعا ما  في بعض المناطق  (ببعض الأجهزة) ويفضل إزالته بأجهزة مخصصة لذلك و اذا رغب المراجع بذلك يمكن شراء الخدمة بشكل مستقل حيث انها لا تدخل ضمن قيمة الجلسة.</li>
                                    <li>جلسات الرتوش مجانية وغير مدفوعة و تكون فقط على مكان وجود الشعر و تكون خلال 14 يوم فقط من تاريخ الجلسة الأساسية ولا يمكن باي حال من الأحوال تقديمها بعد ال 14 يوم كما يحق للمركز عدم تقديم جلسات الرتوش المجانية نهائيا في اي وقت ودون الرجوع للمريض او موافقته. </li>
                                    <li>يجب الالتزام باستخدام المرهم  الموصوف حسب الوصفة الطبية و ايضا الالتزام بتعليمات الطبيب.</li>
                                    <li>في حال اخذ العرض التسويقي  لا يتم استبدال منطقة باخرى حيث سيتم الالتزام بالمنطقة الموجودة ضمن العرض.</li>
                                    <li>قد يحتاج المريض الى عدة جلسات (4 – 8) للوصول الى المطلوب وهذا يعتمد بحسب كل حالة.</li>
                                    <li>يجب مراجعة الطبيب المعالج قبل البدء في الجلسة في حال كان المريض يعاني من عرض معين او يستخدم ادوية معينة ولتحديد نوع الجهاز المستخدم.</li>
                                    <li>يمنع استخدام الليزر مع الحوامل او مرضى الصرع, البهاق, الصدفية, او الاطفال دون سن البلوغ.</li>
                                    <li>في حال حدوث حرق لا سمح الله او تحسس يتم مراجعة العيادة فورا وخلال اسبوع بحد اقصى .</li>
                                </ul>
                                <h6>تعليمات هامة قبل الجلسة:</h6>
                                <ol>
                                    <li>عدم ازالة الشعر بالنتف او الشمع لمدة 6 الى 8 اسابيع قبل البدء بالجلسات.</li>
                                    <li>عدم التعرض لأشعة الشمس "الساونا " الجاكوزي" او تسمير البشرة لمدة شهر قبل الجلسة.</li>
                                    <li>تجنب اجراء جلسات ليزر اخرى او تقشير لمدة 20 يوم على الاقل قبل البدء بالجلسات.</li>
                                    <li>عدم استخدام كريمات تفتيح البشرة الغامقة قبل البدء بالجلسات باسبوعين.</li>
                                    <li>عدم تناول اي نوع من انواع الادوية و خصوصا الروكتان.</li>
                                    <li>ضرورة حلاقة المنطقة قبل يوم او يومين من الليزر و قبل الحضور للعيادة علماً ان المركز لا يسمح بتقديم الخدمة بالعيادة من قبل المراجع .</li>
                                </ol>
                                <h6 className="font-weight-bold">نصائح بعد الجلسة:</h6>
                                <ol>
                                    <li>غسل المنطقة المعالجة بالماء البارد بعد ساعتين من الجلسة.</li>
                                    <li>تجنب التعرض المباشر لأشعة الشمس "الساونا " الجاكوزي" الحمام المغربي او التقشير او التال لمدة تسع ايام على الاقل .</li>
                                    <li>تجنب لبس الملابس الضيقة و يفضل الملابس القطنية الواسعة.</li>
                                    <li>تجنب ازالة الشعر بالنتف او الشمع بين الجلسات.</li>
                                    <li>عدم استخدام مستحضرات التجميل او العطور لمدة 24 ساعة بعد الجلسة.</li>
                                    <li>عدم اجراء جلسات ليزر اخرى او تقشير لمدة 20 يوم بعد الجلسة.</li>
                                    <li>وضع كمادات باردة لمدة ربع ساعة للتخفيف من الألم و الاحمرار.</li>
                                    <li>يمكن استخدام الصابون على المنطقة المعالجة بعد يوم من الجلسة.</li>
                                    <li>عدم استخدام كريمات معطرة.</li>
                                    <li>استعمال واقي الشمس طوال فترة العلاج.</li>
                                </ol>
                                <h6 className="font-weight-bold">نصائح وارشادات : </h6>
                                <ul>
                                    <li>الانتظار ثلاثة اسابيع على الاقل في حال العلاج بالتقشير الكيميائي   .</li>
                                    <li>الانتظار 21 يوماً على الاقل قبل البدء باي جلسة ليزر جديدة  .</li>
                                    <li>الانتظار ثمان اسابيع في حال الخضوع لمعالجة سنفرة بالليزر مسبقا .</li>
                                    <li>الانتظار اسبوع  على الاقل في حال العلاج بالتقشير الكريستالي  .</li>
                                    <li>لا ينصح بالعلاج بالليزر للحامل ومرضى البهاق والصرع و الصدفية .</li>
                                    <li>يفضل ايقاف تناول الادوية الموضعية  قبل 3-5 ايام من الجلسة</li>
                                </ul>
                                <h6 className="font-weight-bold">
                                    عقد اتفاق وتفويض :
                                </h6>
                                <p>
                                    بهذا أفوض المركز الاختصاصي الطبي الاول  لعلاجي بالاجهزة والمعدات الطبية الموجودة بقسم الليزر  وذلك لتدمير انتقائي دون الحاق ضرر بالنسيج المحيط, و قد فهمت بأنه قد يحدث لي تندب او تحوصل او نقص بالتصبغ او زيادة بالتصبغ, و هي مضاعفات طبيعية لهذا الاجراء و غالباً تكون مؤقتة و تزول خلال ايام قليلة و للحصول على افضل النتائج قد تتكرر الجلسات أحياناً ويتوجب علي الانتظام في حضور الجلسات حسب المواعيد المعطاة لي ويحق للمركز في حال رغبتي بالغاء العرض اقتطاع قيمة الجلسات المنفذة بشكل كامل ودون استفادتي من الخصم وبالسعر الاساسي للجلسة والبالغ اربعمائة ريال وفي حال عدم قيامي باي جلسة فانني اوافق على سياسة المركز بالاسترجاع والتي تقتضي بان الاسترجاع يكون خلال ثلاثة ايام فقط من تاريخ اصدار الفاتورة ولسبب مقنع لدى المركز وعلى ان يتم  تحويل المبلغ الى رصيد لي لدى المركز ولا يحق لي باي حال من الاحوال المطالبة باستعادة المبالغ بعد الثلاث ايام ويتم تحويله كرصيد للمراجع بالعيادة, كما فهمت انه يتوجب علي الالتزام بالمواعيد المعطاة لي والا اتأخر عن الحضور لاكثر من خمس دقائق وفي حال تأخري لاكثر من خمس دقائق فان الموعد يتحول تلقائيا الى الانتظار كما لا يحق لي المطالبة بجلسة الرتوش التابعة لها و بالتالي تعتبر جلسة الرتوش مقدمة لي, وبان حقي في الفاتورة يسقط تلقائيا في حال عدم تنفيذي للخدمة خلال سنتين  من تاريخ صدور الفاتورة, وانه في حال رغبتي باجراء خدمة ازالة الشعر ذاتيا فانني اخلي مسؤولية المركز من اي مضاعفات قد تحصل لي خلال اجرائي لهذه الخدمة الذاتية وليس لي الحق بالمطالبة او الشكوى واتحمل مسؤولية اي عطل او ضرر يطرأ على الجهاز نتيجة استخدامي له و اتعهد بتغطية تكاليف الصلاح ان وجدت.
                                    و لقد فهمت انه بعد العلاج بالليزر على الفور قد تبدو منطقة العلاج حمراء متغيرة اللون و فيها انتفاخ يستمر لمدة ساعتين او اكثر و إن الاحمرار ربما يستمر من (3-2) ايام و في بعض الحالات يجب استخدام مضاد حيوي وقد فهمت وقرأت كل ما ورد بالتعليمات و العقد و التفويض اعلاه ووافقت عليهم .
                                </p>

                            </div>
                        </Collapse>
                    </Form.Group>
                    <Form.Group className="overflow-hidden alert alert-warning text-right">
                        <input
                            required
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            className="float-right ml-2"
                            value="yes"
                            checked={props.values.agreeToTerms === "yes"}
                            onChange={(e) => {
                                props.handleInputChange(e)
                                setAgreed(e.target.checked ? "yes" : "no")
                            }} />
                        <p className="overflow-hidden mb-0">
                            <label htmlFor="agreeToTerms" className="d-inline text-right">نعم انا اقر بصحة جميع المعلومات المذكورة أعلاه و أتحمل مسؤولية ما جاء فيها و انني قرأت نموذج اقرار العلاج بالليزر وأوافق على جميع الشروط والأحكام الواردة فيه وألتزم بالعمل بما جاء فيه دون ادنى مسؤولية على المركز الإختصاصي الطبي الأول.</label>
                        </p>
                    </Form.Group>

                    {agreed === "no" && (
                        <Alert variant="danger" className="text-right">
                            برجاء الموافقة على الإقرار والشروط
                        </Alert>
                    )}

                    
                    <Container className="booking-preview patternbg-container position-relative rounded-lg overflow-hidden my-3 mt-lg-0">
                        <Container className="heading p-3">
                            <Row className="bg-white py-3 rounded-lg overflow-hidden text-right py-2">
                                <Col xs={6}>
                                    <h6 className="text-center mb-0"><FontAwesomeIcon className="text-success" icon={faCheckCircle} /> الإجمالي {applyTax && <span className="small text-secondary"> + الضريبة</span>}</h6>

                                </Col>
                                <Col xs={6}>
                                    <h6 className="text-center font-weight-bold text-dark mb-0">{parseFloat(totalFire).toFixed(2)} ريال</h6>
                                </Col>

                            </Row>

                        </Container>
                    </Container>

                    <Form.Group className="text-right">

                        <Form.Label>وسيلة الدفع</Form.Label><br />
                        <span className="ml-3">
                            <input type="radio" required id="mada" name="paymentMethod" value="mada" checked={props.values.paymentMethod === "mada"} onChange={props.handleInputChange} />
                            <label htmlFor="male" className="ml-2" style={{marginTop: "-10px"}}><img src={window.ApplePaySession? mada : mada2} alt=""/></label>
                        </span><br />
                        <span>
                            <input type="radio" id="stcpay" name="paymentMethod" value="stcpay" checked={props.values.paymentMethod === "stcpay"} onChange={props.handleInputChange} />
                            <label htmlFor="female" className="ml-2" style={{marginTop: "-10px"}}><img style={{borderRadius: "5px"}} width="45" src={stcpay} alt=""/></label>

                        </span>
                    </Form.Group>



                    <Form.Group className="bg-transparent px-0 pt-0">
                        <Button type="submit" className="btn-block btn-lg">الحجز</Button>
                    </Form.Group>

                </FadeIn>
            </Form>
        </Styles>
    )
}


