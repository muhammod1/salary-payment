import React, { useState } from "react";
import arrowDown from "../../assets/arrowDown.svg";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import download from "../../assets/download.svg";
import DeleteStaff from "./DeleteStaff";
import EditStaff from "./EditStaff";
import profile from "../../assets/profile.png";

const table = [
  {
    id: 1,
    head: "User ID",
  },
  {
    id: 8,
    head: "User name",
  },
  {
    id: 2,
    head: "Staff name",
  },
  {
    id: 3,
    head: "Role",
  },
  {
    id: 4,
    head: "Date Stated",
    // img: arrowDown,
  },
  {
    id: 5,
    head: "End date",
  },
  {
    id: 6,
    head: "Salary",
    // img: arrowDown,
  },
  {
    id: 7,
    head: "Action",
  },
];

const StaffTable = ({ currentPosts }) => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr className="font-[500] text-[18px]">
              <Td>
                <Checkbox
                  isChecked={allChecked}
                  className="accent-primary"
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, e.target.checked])
                  }
                >
                  {" "}
                </Checkbox>
              </Td>
              {table?.map((item) => (
                <Td key={item.id}>
                  <span className="flex gap-2 items-center justify-center">
                    {item.head}
                    {item.img === arrowDown ? (
                      <img src={item?.img} alt="" />
                    ) : (
                      ""
                    )}
                  </span>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {currentPosts?.map((item) => (
              <Tr key={item._id}>
                <Td>
                  <Checkbox
                    isChecked={checkedItems[item._id]}
                    className="accent-primary"
                    onChange={(e) =>
                      setCheckedItems([
                        e.target.checked,
                        checkedItems[item._id],
                      ])
                    }
                  >
                    {" "}
                  </Checkbox>
                </Td>
                
                <Td>{item?._id?.slice(0, 5)}</Td> 
                <Td>{item?.discord_username?.slice(0, -5)}</Td>
                <Td display={"flex"} gap={2} alignItems="center">
                  <img
                    className="h-[40px] rounded-full w-[40px]"
                    src={
                      item?.image?.url === undefined
                        ? profile
                        : item?.image?.url
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-[16px]">
                      {item.full_name}
                    </p>
                    <div className="flex gap-2">
                      <p>{item.email} -</p>
                      <p className="underline">
                        {item.wallet_address?.slice(0, 4)}...
                        {item.wallet_address?.slice(
                          -3,
                          item.wallet_address.length
                        )}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <span className="bg-[#F7F7F7] px-3 py-1 rounded-md">
                    {item.job_role}
                  </span>
                </Td>
                <Td>{formatDate(item.start_date)} </Td>
                <Td>
                  {formatDate(item.end_date)}
                  {item.end_item}
                </Td>
                <Td>{item.salary}</Td>
                <Td>
                  <Menu bg="primary">
                    <MenuButton
                      as={Button}
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                    >
                      <BsThreeDotsVertical className="cursor-pointerml-auto text-[grey]" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem fontWeight="semi-bold">
                        <EditStaff item={item} />
                      </MenuItem>
                      <MenuItem fontWeight="semi-bold">
                        <DeleteStaff />
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffTable;
