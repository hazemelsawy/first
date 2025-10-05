import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { MedicalStaffUnit } from '../components/MedicalStaffUnit'
import MedicalStaffSkeleton from '../skeletons/MedicalStaff'
import { firebaseData } from '../provider/DataProvider'
import FadeIn from 'react-fade-in';

const Styles = styled.div`
  h3{
    color: #ae852f;
  }
`;
export const MedicalStaff = () => {
  const { medicalStaffLoading
    //,medicalStaff 
  } = useContext(firebaseData)
  return (
    <Styles>
      <Container>
        <h3 className="text-center font-weight-bold mb-4">الطاقم الطبي</h3>
        {/*<div className="h3 text-center my-4 text-secondary">( يوجد {medicalStaff.length} اطباء )</div>*/}
        <FadeIn>
          <MedicalStaffSkeleton loading={medicalStaffLoading} />
          <MedicalStaffSkeleton loading={medicalStaffLoading} />
          <MedicalStaffSkeleton loading={medicalStaffLoading} />
          <MedicalStaffSkeleton loading={medicalStaffLoading} />
        </FadeIn>
        <FadeIn>
          <MedicalStaffUnit loading={medicalStaffLoading} />
        </FadeIn>
      </Container>
    </Styles>
  )
}