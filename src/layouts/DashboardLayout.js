import React, { useContext, useEffect } from 'react'
import Sidebar from '../dashboard/components/Sidebar';
import Header from '../dashboard/components/Header';
import { Container, Spinner } from "react-bootstrap";
import '../index.css';
import Login from '../SigninDash'
import { firebaseData } from '../provider/DataProvider'

export default ({ children }) => {
  const { handleCheckPrivilege, admin, employee, pending } = useContext(firebaseData)
  useEffect(() => {
    handleCheckPrivilege();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      {!pending &&
        <>
          {!(admin || employee) ? (<Login />) : (<Container fluid className="px-0">
            <Sidebar admin={admin} />
            <div>
              <div className="" id="page-content-wrapper">
                <Header />
                {children}
              </div>
            </div>
          </Container>)}
        </>
      }
      {pending &&
        <div className="text-center py-5 my-5">
          <Spinner animation="border" variant="secondary" />
        </div>
      }
    </>
  );
}