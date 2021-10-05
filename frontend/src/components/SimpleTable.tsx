import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
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
    setViewRow: Dispatch<(prevState: undefined) => undefined>,
    onOpen: () => void
  ) => void;
}

interface Data {
  data: any[];
  limit: number;
  page: number;
  total: number;
  filter?: {
    all?: string;
  };
}

interface SimpleTableProps {
  headers: Header[];
  data?: Data;
  tableCaption: string;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  data,
  tableCaption,
}) => {
  const [isSm] = useMediaQuery("(max-width: 500px)");
  const [isMd] = useMediaQuery("(max-width: 780px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewRow, setViewRow] = useState();
  const size = isSm ? "sm" : isMd ? "md" : "l";

  return (
    <Box my={4} overflow="hidden">
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
            {data?.data
              ? data.data.map((row) => (
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
                          ? header.render(row, setViewRow, onOpen)
                          : row[header.key]}
                      </Td>
                    ))}
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </Box>
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
