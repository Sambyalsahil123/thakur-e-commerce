import React, { Suspense } from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm currentUser={currentUser} />
        </Suspense>
      </FormWrap>
    </Container>
  );
};

export default Register;
