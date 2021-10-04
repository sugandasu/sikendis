import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { Dispatch, useState } from "react";
import { SimpleTableModal } from "./SimpleTableModal";

interface Header {
  label: string;
  key: string;
  hide?: boolean;
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
  filter: {
    all: string;
  };
}

interface SimpleTableProps {
  headers: Header[];
  data: Data;
  tableCaption: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setFilterAll: React.Dispatch<React.SetStateAction<String>>;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  data,
  tableCaption,
  setPage,
  setLimit,
  setFilterAll,
}) => {
  const [isSm] = useMediaQuery("(max-width: 500px)");
  const [isMd] = useMediaQuery("(max-width: 780px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewRow, setViewRow] = useState();

  const totalPage = Math.ceil(data.total / data.limit);
  const onlyOnePage = totalPage === 0 || totalPage === 1;

  const [kePage, setKePage] = useState<number>();

  let buttons = [];

  if (!onlyOnePage) {
    if (!isSm) {
      if (data.page !== 1) {
        buttons = buttons.concat([1]);
      }
    }

    if (!isSm) {
      const midBottom = Math.floor(data.page / 2);
      if (midBottom > 0 && buttons.indexOf(midBottom) === -1) {
        buttons = buttons.concat([midBottom]);
      }
    }

    if (data.page - 1 > 0 && buttons.indexOf(data.page - 1) === -1) {
      buttons = buttons.concat([data.page - 1]);
    }

    if (buttons.indexOf(data.page) === -1) {
      buttons = buttons.concat([data.page]);
    }

    if (data.page + 1 < totalPage && buttons.indexOf(data.page + 1) === -1) {
      buttons = buttons.concat([data.page + 1]);
    }

    if (!isSm) {
      const midTop = (data.page + totalPage) / 2;
      if (buttons.indexOf(midTop)) {
        buttons = buttons.concat(midTop);
      }
    }

    if (!isSm) {
      if (buttons.indexOf(totalPage) === -1) {
        buttons = buttons.concat([totalPage]);
      }
    }
  }

  const size = isSm ? "sm" : isMd ? "md" : "l";

  return (
    <Box my={4} overflow="hidden">
      <Flex align="center" mb={4}>
        <Input
          placeholder="Cari"
          value={data.filter.all}
          onChange={(event) => {
            setFilterAll(event.currentTarget.value);
          }}
        />
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
          <Select
            value={data.limit}
            onChange={(event) => {
              setLimit(parseInt(event.currentTarget.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </Flex>
      </Flex>
      <Box width="100%" overflowX="scroll" pb={5}>
        <Table size={size}>
          <TableCaption>{tableCaption}</TableCaption>
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th
                  fontWeight="regular"
                  key={header.key}
                  display={
                    header.hide ||
                    (isSm && header.hideSm) ||
                    (isMd && header.hideMd)
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
                      header.hide ||
                      (isSm && header.hideSm) ||
                      (isMd && header.hideMd)
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
      </Box>
      <Flex my={4}>
        <Flex ml="auto">
          {buttons.map((button, b) => (
            <Button
              key={b}
              mr={1}
              disabled={button === data.page ? true : null}
              fontSize="sm"
              onClick={() => {
                setPage(button);
              }}
            >
              {button}
            </Button>
          ))}
          <Popover>
            <PopoverTrigger>
              <Button>Ke</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pilih Page</PopoverHeader>
              <PopoverBody>
                <Flex align="center">
                  <Input
                    type="number"
                    value={kePage}
                    onChange={(event) => {
                      setKePage(parseInt(event.currentTarget.value));
                    }}
                    mr={2}
                  ></Input>
                  <Button
                    color="white"
                    bgColor="blue.500"
                    onClick={() => {
                      if (kePage > 0 && kePage <= totalPage) {
                        setPage(kePage);
                      }
                    }}
                  >
                    Pilih
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      <Box>
        <SimpleTableModal
          headers={headers}
          row={viewRow}
          tableCaption={tableCaption}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </Box>
  );
};
