import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { InputField } from "../../components/InputField";
import { useMeQuery, useUpdateAkunMutation } from "../../generated/graphql";
import { useIsAuth } from "../../middlewares/useIsAuth";
import { toErrorMap } from "../../utils/toErrorMap";

const DashboardAkun: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Akun", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useMeQuery();
  const [updateAkun] = useUpdateAkunMutation();
  const toast = useToast({
    title: "Akun",
    position: "top-right",
    isClosable: true,
  });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Akun</Text>
            </Flex>
            <Box>
              {!loading && data && data.me ? (
                <Formik
                  initialValues={{
                    username: data.me.username,
                    email: data.me.email,
                    password: "",
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await updateAkun({
                      variables: {
                        payload: values,
                      },
                      update: (cache) => {
                        cache.evict({ fieldName: "me" });
                      },
                    });

                    if (response.data?.updateAkun.errors) {
                      setErrors(toErrorMap(response.data.updateAkun.errors));
                    } else if (response.data?.updateAkun.user) {
                      toast({
                        status: "success",
                        description: "Akun berhasil diubah",
                      });
                    }
                  }}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
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
                        Ubah Akun
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardAkun;
