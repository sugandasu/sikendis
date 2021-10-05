import { Flex, Select, Spacer, Text } from "@chakra-ui/react";
import React from "react";

interface SimpleTableLimitProps {
  page: number;
  total: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const SimpleTableLimit: React.FC<SimpleTableLimitProps> = ({
  page,
  total,
  limit,
  setLimit,
}) => {
  const totalPage = Math.ceil(total / limit);
  return (
    <Flex align="center" mb={4}>
      <Text fontSize="xs">
        Page {page} dari {totalPage}
      </Text>
      <Spacer></Spacer>
      <Flex align="center" mr={1}>
        <Text mr={1} fontSize="xs">
          Show
        </Text>
        <Select
          value={limit}
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
  );
};
