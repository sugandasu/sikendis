import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { GeneralLayout } from "../components/GeneralLayout";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <GeneralLayout>
      <Box mt={10}>
        <Box mb={5}>
          <Heading textAlign="center">SIKENDIS</Heading>
        </Box>
        <Box maxW="lg" mx="auto">
          <Box>
            <Heading>Login</Heading>
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({ variables: values });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
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
                      name="usernameOrEmail"
                      label="Username or Email"
                      placeholder="username or email"
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

export default Login;
