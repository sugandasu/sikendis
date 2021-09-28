import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { GeneralLayout } from "../components/GeneralLayout";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <GeneralLayout>
      <Box mt={10}>
        <Box mb={5}>
          <Heading textAlign="center">SIKENDIS</Heading>
        </Box>
        <Box maxW="lg" mx="auto">
          <Box>
            <Heading>Register</Heading>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await register({ variables: values });
                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.user) {
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    router.push("/dashboard");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box>
                    <InputField
                      name="username"
                      label="Username"
                      placeholder="Username"
                    />
                    <InputField
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                    />
                    <InputField
                      name="password"
                      label="Password"
                      placeholder="password"
                      type="password"
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      login
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </GeneralLayout>
  );
};

export default Register;
