import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { firebaseData } from '../provider/DataProvider'
const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;
export const Members = (props) => {
    const { //handleDelete, 
        getBookings, bookings
        //, handleAddBooking 
    } = useContext(firebaseData)

    useEffect(() => {
        getBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* const deleteMed = id => {
        handleDelete("bookings", id);
    } */
    return (
        <Styles>
            <div className="h3 text-center my-4 text-secondary">عدد المسجلين :  {bookings.length}</div>

            <div className={props.loading ? "p-3 d-none" : "p-3"}>
                {
                    bookings.map((booking) =>
                        <div key={booking.id}>
                            <a className="btn btn-outline-primary btn-lg btn-block text-right mb-3" data-toggle="collapse" href={"#member" + booking.id} role="button" aria-expanded="false" aria-controls={"member" + booking.id} >
                                إسم الزائر : {booking.fullName}
                            </a>
                            <div className="collapse mb-3" id={"member" + booking.id} >
                                <div className="text-right bg-light border px-md-4 px-3 py-md-3 py-2 rounded-lg">
                                    <div className="text-center mb-4">
                                        <h5 className="bg-info py-2 rounded-lg text-white">بيانات الزائر</h5>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>الإسم بالكامل : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.fullName}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>رقم الجوال : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.phoneNumber}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>البريد الإلكتروني : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.emailAddress}</Col>
                                    </div>
                                    <div className="text-center my-4">
                                        <h5 className="bg-info py-2 rounded-lg text-white">التاريخ المرضي</h5>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>الجنس : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.gender}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تستعمل أدوية حالياً؟ : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.medication}</Col>

                                    </div>
                                    {booking.medication === "yes" && (
                                        <div className="row my-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>إسم الأدوية : </strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.medicineName}</Col>
                                        </div>
                                    )}
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق أن أجريت عملية جراحية أو علاج بالآشعة ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.surgeryRadio}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق أن أصبت بالأمراض التالية :</strong></Col>
                                        <Col xs="7" md="8" xl="9">
                                            <div className="row">
                                                {booking.heartDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض القلب : {booking.heartDiseases}
                                                    </Col>
                                                )}
                                                {booking.kidneyDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض الكلى : {booking.kidneyDiseases}
                                                    </Col>
                                                )}
                                                {booking.liverDiseases === "yes" && (
                                                    <Col xs="4">
                                                        التهاب الكبد الوبائي Hepatitis : {booking.liverDiseases}
                                                    </Col>
                                                )}
                                                {booking.asthmaDiseases === "yes" && (
                                                    <Col xs="4">
                                                        الربو : {booking.asthmaDiseases}
                                                    </Col>
                                                )}
                                                {booking.bloodPressureDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض ضغط الدم : {booking.bloodPressureDiseases}
                                                    </Col>
                                                )}
                                                {booking.diabetesDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض السكري : {booking.diabetesDiseases}
                                                    </Col>
                                                )}
                                                {booking.cancerDiseases === "yes" && (
                                                    <Col xs="4">
                                                        السرطان : {booking.cancerDiseases}
                                                    </Col>
                                                )}
                                                {booking.thyroidDiseases === "yes" && (
                                                    <Col xs="4">
                                                        امراض الغدة الدرقية : {booking.thyroidDiseases}
                                                    </Col>
                                                )}
                                                {booking.epilepsyDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض الصرع : {booking.epilepsyDiseases}
                                                    </Col>
                                                )}
                                                {booking.aidsDiseases === "yes" && (
                                                    <Col xs="4">
                                                        مرض نقص المناعة\الإيدز : {booking.aidsDiseases}
                                                    </Col>
                                                )}
                                                {booking.reproductionDiseases === "yes" && (
                                                    <Col xs="4">
                                                        أمراض تناسلية : {booking.reproductionDiseases}
                                                    </Col>
                                                )}
                                                {booking.otherDiseases === "yes" && (
                                                    <>
                                                        <Col xs="4">
                                                            أخرى : {booking.otherDiseases}
                                                        </Col>
                                                        {booking.otherDiseases === "yes" && (
                                                            <Col xs="12">
                                                                الأمراض الأخرى : <br />
                                                                {booking.otherDiseasesClarify}
                                                            </Col>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل أصابك أو أي من أفراد عائلتك أحد الأمراض المتعلقة بالنزيف أو التجلط ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.ruralCoagulation}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل لديك حساسية ضد البنسلين أو أي دواء آخر ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.penicillinOther}</Col>
                                    </div>
                                    {booking.penicillinOther === "yes" && (
                                        <div className="row my-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>وضح :</strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.penicillinOtherClarify}</Col>
                                        </div>
                                    )}

                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق وتعالجت بأي من أدوية الكورتيزون ؟ : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.cortisone}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تدخن ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.smoking}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل عانيت من أي مشاكل نتيجة لعلاج أسنانك ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.teethProblems}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تعاني من أي أمراض أو مشاكل صحية ليست مذكورة أعلاه ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.otherProblems}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل يوجد ماتود التصريح عنه ؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.declare}</Col>
                                    </div>
                                    {booking.declare === "yes" && (
                                        <div className="row my-2">
                                            <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>التصريح :</strong></Col>
                                            <Col xs="7" md="8" xl="9">{booking.declaration}</Col>
                                        </div>
                                    )}

                                    {booking.gender === "female" && (
                                        <>
                                            <div className="row my-2">
                                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل أنت حامل ؟ :</strong></Col>
                                                <Col xs="7" md="8" xl="9">{booking.pregnant}</Col>
                                            </div>
                                            {booking.pregnant === "yes" && (
                                                <div className="row my-2">
                                                    <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>موعد الولادة :</strong></Col>
                                                    <Col xs="7" md="8" xl="9">{booking.birthDueDate}</Col>
                                                </div>
                                            )}
                                            <div className="row my-2">
                                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تعانين من إضطرابات الدورة الشهرية ؟ :</strong></Col>
                                                <Col xs="7" md="8" xl="9">{booking.menstrualDisorder}</Col>
                                            </div>
                                            <div className="row my-2">
                                                <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل تستعملين حبوب منع الحمل ؟ :</strong></Col>
                                                <Col xs="7" md="8" xl="9">{booking.birthControl}</Col>
                                            </div>
                                        </>
                                    )}
                                    <div className="text-center my-4">
                                        <h5 className="bg-info py-2 rounded-lg text-white">العلاج بالليزر</h5>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل سبق لك ان عملت الليزر؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.workedLasers}</Col>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>هل لديك تحسس جلدي؟ :</strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.skinAllergy}</Col>
                                    </div>

                                    <div className="text-center my-4">
                                        <h5 className="bg-info py-2 rounded-lg text-white">الموافقة</h5>
                                    </div>
                                    <div className="row my-2">
                                        <Col xs="5" md="4" xl="3" className="text-secondary text-left"><strong>وافق على الشروط ؟ : </strong></Col>
                                        <Col xs="7" md="8" xl="9">{booking.agreeToTerms}</Col>
                                    </div>

                                </div>
                            </div>


                        </div>
                    )
                }


            </div >
        </Styles>
    )
}