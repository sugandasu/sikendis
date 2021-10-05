import {
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
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SimpleTablePaginationProps {
  page: number;
  total: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const SimpleTablePagination: React.FC<SimpleTablePaginationProps> = ({
  page,
  total,
  limit,
  setPage,
}) => {
  const [isSm] = useMediaQuery("(max-width: 500px)");

  const totalPage = Math.ceil(total / limit);
  const onlyOnePage = totalPage === 0 || totalPage === 1;
  const [kePage, setKePage] = useState<number>();

  let buttons = [];

  if (!onlyOnePage) {
    if (!isSm) {
      if (page !== 1) {
        buttons = buttons.concat([1]);
      }
    }

    if (!isSm) {
      const midBottom = Math.floor(page / 2);
      if (midBottom > 0 && buttons.indexOf(midBottom) === -1) {
        buttons = buttons.concat([midBottom]);
      }
    }

    if (page - 1 > 0 && buttons.indexOf(page - 1) === -1) {
      buttons = buttons.concat([page - 1]);
    }

    if (buttons.indexOf(page) === -1) {
      buttons = buttons.concat([page]);
    }

    if (page + 1 < totalPage && buttons.indexOf(page + 1) === -1) {
      buttons = buttons.concat([page + 1]);
    }

    if (!isSm) {
      const midTop = Math.ceil((page + totalPage) / 2);
      if (buttons.indexOf(midTop)) {
        buttons = buttons.concat(midTop);
      }
    }

    if (!isSm) {
      if (buttons.indexOf(totalPage) === -1) {
        buttons = buttons.concat([totalPage]);
      }
    }
  } else {
    buttons = buttons.concat([page]);
  }

  return (
    <Flex my={4}>
      <Flex ml="auto">
        {buttons.map((button, b) => (
          <Button
            key={b}
            mr={1}
            disabled={button === page ? true : null}
            fontSize="sm"
            onClick={() => {
              setPage(button);
            }}
          >
            {button}
          </Button>
        ))}
        {onlyOnePage ? null : (
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
        )}
      </Flex>
    </Flex>
  );
};
