import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import gql from "graphql-tag";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { InputField } from "../../../components/InputField";
import { useCreatePenggunaMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const uploadFileMutation = gql`
  mutation UploadImage($file: Upload!) {
    singleUpload(file: $file)
  }
`;

const DashboardPenggunaTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna", link: "/dashboard/pengguna", isCurrentPage: false },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createPengguna] = useCreatePenggunaMutation();

  const [upload] = useMutation(uploadFileMutation);
  const [fileToUpload, setFileToUpload] = useState<File>();

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    setShowCrop(true);
    const file = e;
    let imageDataUrl: any = await readFile(file);

    setImageSrc(imageDataUrl);
  };

  const onDrop = useCallback(
    ([file]) => {
      console.log([file]);
      console.log("single file", file);
      console.log("file 0:", file[0]);
      setFileToUpload(file);
      onFileChange(file);
    },
    [upload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputDrop = () => {
    if (fileToUpload) {
      return <Text>📷 ✅</Text>;
    } else if (isDragActive) {
      return <Text>Drop the image here</Text>;
    } else {
      return (
        <Text>
          Drag 'n' drop your image here, or just click to select an image🍎
        </Text>
      );
    }
  };

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box borderWidth="1px" borderRadius="md">
          <Box p={5}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Pengguna</Text>
              <NextLink href="/dashboard/pengguna">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              <Formik
                initialValues={{
                  nip: "",
                  nama: "",
                  jabatan: "",
                  instansi: "",
                  subBagian: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createPengguna({
                    variables: {
                      payload: values,
                      fotoProfil: fileToUpload,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "penggunas" });
                    },
                  });
                  if (response.data?.createPengguna.errors) {
                    setErrors(toErrorMap(response.data.createPengguna.errors));
                  } else if (response.data?.createPengguna.pengguna) {
                    router.push("/dashboard/pengguna");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField name="nip" label="Nip" placeholder="nip" />
                    <InputField name="nama" label="Nama" placeholder="nama" />
                    <InputField
                      name="jabatan"
                      label="Jabatan"
                      placeholder="jabatan"
                    />
                    <InputField
                      name="instansi"
                      label="Instansi"
                      placeholder="instansi"
                    />
                    <InputField
                      name="subBagian"
                      label="Sub bagian"
                      placeholder="subBagian"
                    />
                    <Box
                      mt={2}
                      mb={4}
                      borderColor="dark"
                      borderStyle="dashed"
                      borderWidth="2px"
                      borderRadius="lg"
                      p={5}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <InputDrop></InputDrop>
                    </Box>
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Pengguna
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardPenggunaTambah;
