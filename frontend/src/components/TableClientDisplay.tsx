import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaEllipsisH,
  FaFilter,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import {
  Column,
  SortingRule,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

type TableClientProps = {
  columns: Array<Column<any> & { hidden?: boolean }>;
  data: any[];
  tableCaption: string;
  sortBy?: SortingRule<any>[];
  size?: "sm" | "md" | "lg";
};

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  return (
    <Input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        setGlobalFilter(e.target.value);
      }}
    ></Input>
  );
};

export const TableClientDisplay: React.FC<TableClientProps> = ({
  columns,
  data,
  tableCaption,
  sortBy,
  size = "md",
}) => {
  const ReactTable: React.FC<TableClientProps> = ({
    columns,
    data,
    tableCaption,
  }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      rows,
      //
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize, globalFilter },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: 0,
          sortBy,
          hiddenColumns: columns.map((column) => {
            if (column?.hidden && column.hidden === true)
              return column.id || column.accessor;
          }) as any,
        },
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

    useEffect(() => {
      setTimeout(() => {
        if (canNextPage) {
          nextPage();
        } else {
          gotoPage(0);
        }
      }, 10000);
    }, [pageIndex]);

    return (
      <Box my={5}>
        <Flex align="center" mb={5}>
          <Text size="sm">
            Tampilkan {page.length} data dari {rows.length}
          </Text>
          <Spacer></Spacer>
          <HStack spacing={1}>
            <Box>
              <Popover size="xs">
                <PopoverTrigger>
                  <IconButton
                    aria-label="cari"
                    size="sm"
                    icon={<FaFilter />}
                  ></IconButton>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Cari</PopoverHeader>
                  <PopoverBody>
                    <GlobalFilter
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Select
              size="sm"
              rounded="md"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>
        <Flex overflow="scroll" mb={5}>
          <Table {...getTableProps} size={size}>
            <TableCaption>{tableCaption}</TableCaption>
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon as={FaSortUp} />
                        ) : (
                          <Icon as={FaSortDown} />
                        )
                      ) : column.canSort ? (
                        <Icon as={FaSort} />
                      ) : (
                        ""
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex align="center">
          <Text fontSize="sm">
            Halaman {pageIndex + 1} dari {pageOptions.length}
          </Text>
          <Spacer></Spacer>
          <HStack spacing={1}>
            <IconButton
              aria-label="sebelum"
              size="sm"
              icon={<FaAngleLeft />}
              onClick={previousPage}
              disabled={!canPreviousPage}
            ></IconButton>
            <Box>
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label="ke halaman"
                    size="sm"
                    icon={<FaEllipsisH />}
                  ></IconButton>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Halaman Pilihan</PopoverHeader>
                  <PopoverBody>
                    <HStack spacing={1}>
                      <Input
                        onChange={(e) => {
                          const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(page);
                        }}
                      ></Input>
                    </HStack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <IconButton
              aria-label="lanjutan"
              size="sm"
              icon={<FaAngleRight />}
              onClick={nextPage}
              disabled={!canNextPage}
            ></IconButton>
          </HStack>
        </Flex>
      </Box>
    );
  };

  return (
    <ReactTable
      columns={columns}
      data={data}
      tableCaption={tableCaption}
      sortBy={sortBy}
    ></ReactTable>
  );
};
