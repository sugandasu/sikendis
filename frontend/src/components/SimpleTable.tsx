import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMediaQuery,
  Text,
  Input,
  Spacer,
  IconButton,
  Select,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, useState } from "react";
import { SimpleTableModal } from "./SimpleTableModal";

interface Header {
  label: string;
  key: string;
  hideSm?: boolean;
  hideMd?: boolean;
  render?: (
    data: object,
    showView: boolean,
    setViewRow: Dispatch<(prevState: undefined) => undefined>,
    onOpen: () => void
  ) => void;
}

interface Data {
  data: any[];
  limit: number;
  page: number;
  total: number;
}

interface SimpleTableProps {
  headers: Header[];
  data: Data;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ headers, data }) => {
  const [isSm] = useMediaQuery("(max-width: 500px)");
  const [isMd] = useMediaQuery("(max-width: 780px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewRow, setViewRow] = useState();

  const totalPage = Math.ceil(data.total / data.limit);
  const onlyOnePage = totalPage === 0 || totalPage === 1;

  const hideFirstPage = onlyOnePage;
  const hidePreviousPage = onlyOnePage;
  const hideNextPage = onlyOnePage;
  const hideLastPage = onlyOnePage;

  let buttons = [1];

  if (!onlyOnePage) {
    const midBottom = Math.floor(data.page / 2);
    const midTop = (data.page + totalPage) / 2;
    if (isSm) {
    }
    if (isMd) {
    }
  }

  return (
    <Box my={4}>
      <Flex align="center" mb={4}>
        <Input placeholder="Filter" />
      </Flex>
      <Flex align="center" mb={4}>
        <Text fontSize="xs">
          Page {data.page} dari {totalPage}
        </Text>
        <Spacer></Spacer>
        <Flex align="center" mr={1}>
          <Text mr={1} fontSize="xs">
            Show
          </Text>
          <Select>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </Flex>
      </Flex>
      <Table>
        <TableCaption>Pengguna kendaraan</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header) => (
              <Th
                key={header.key}
                display={
                  (isSm && header.hideSm) || (isMd && header.hideMd)
                    ? "none"
                    : null
                }
              >
                {header.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((row) => (
            <Tr key={row.id}>
              {headers.map((header) => (
                <Td
                  key={row.id + header.key}
                  display={
                    (isSm && header.hideSm) || (isMd && header.hideMd)
                      ? "none"
                      : null
                  }
                >
                  {header.render
                    ? header.render(row, isMd, setViewRow, onOpen)
                    : row[header.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex mb={4}>
        <Flex ml="auto">
          <IconButton
            aria-label="page pertama"
            mr={1}
            icon={<ArrowLeftIcon />}
            display={hideFirstPage ? "none" : null}
          />
          <IconButton
            aria-label="sebelumnya"
            mr={1}
            icon={<ChevronLeftIcon />}
            display={hidePreviousPage ? "none" : null}
          />
          {buttons.map((button, b) => (
            <Button
              key={b}
              mr={1}
              disabled={button === data.page ? true : null}
            >
              {button}
            </Button>
          ))}
          <IconButton
            aria-label="selanjutnya"
            mr={1}
            icon={<ChevronRightIcon />}
            display={hideNextPage ? "none" : null}
          />
          <IconButton
            aria-label="page terakhir"
            icon={<ArrowRightIcon />}
            display={hideLastPage ? "none" : null}
          />
        </Flex>
      </Flex>
      <Box p={4}>
        <SimpleTableModal
          headers={headers}
          row={viewRow}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </Box>
  );
};
