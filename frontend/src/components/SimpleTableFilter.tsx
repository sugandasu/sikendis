import { Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface SimpleTableFilterProps {
  setFilterAll: React.Dispatch<React.SetStateAction<String>>;
}

export const SimpleTableFilter: React.FC<SimpleTableFilterProps> = ({
  setFilterAll,
}) => {
  const [filter, setFilter] = useState<string>();

  return (
    <Flex align="center" mb={4}>
      <Input
        placeholder="Cari"
        value={filter}
        onChange={(event) => {
          setFilter(event.currentTarget.value);
          setFilterAll(event.currentTarget.value);
        }}
      />
    </Flex>
  );
};
