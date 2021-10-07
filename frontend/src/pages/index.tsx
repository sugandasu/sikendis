import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useIsGuest } from "../middlewares/useIsGuest";
import { toErrorMap } from "../utils/toErrorMap";

const Index: React.FC<{}> = ({}) => {
  useIsGuest();
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Flex height="100vh" align="center">
      <Flex
        width="100%"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        justify="center"
      >
        <Box pt={8} px={8} my="auto" width={{ md: "100%", sm: "100%" }}>
          <Box>
            <Box justify="center" width="100%">
              <Image
                mx="auto"
                textAlign="center"
                maxHeight={16}
                bgColor="transparent"
                name="Sikendis"
                src="/sikendis-logo.png"
              />
            </Box>
            <Heading fontSize="4xl" textAlign="center">
              SIKENDIS
            </Heading>
            <Text fontSize="xl" textAlign="center">
              Sistem Kendaraan Dinas
            </Text>
            <Text textAlign="center">
              sekretariat daerah Prov. Sulawesi Tengah
            </Text>
          </Box>
          <Box>
            <Image width="100%" src={"/datapoint.png"} alt="data point" />
          </Box>
        </Box>
        <Box px={8} my="auto" align="center" width={{ md: "60%", sm: "100%" }}>
          <Heading textAlign="center">Login</Heading>
          <Box>
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
                      width="100%"
                      name="usernameOrEmail"
                      label="Username or Email"
                      placeholder="username or email"
                    />
                    <InputField
                      width="100%"
                      name="password"
                      label="Password"
                      placeholder="password"
                      type="password"
                    />
                    <Button
                      width="100%"
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      bgColor="#6c63ff"
                      color="white"
                    >
                      login
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Index;
