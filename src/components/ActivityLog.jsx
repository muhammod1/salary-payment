import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Select, useToast } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";
import { Input } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { successToastMessage } from "../helpers/toast";


const ActivityLog = ({
  searchTerm,
  handleSearch,
  selectedUser,
  handleSelect,
  allUsers,
  selectedDate,
  setSelectedDate,
  handleDateChange,
  handleDateClick,
  setIsCalendar,
  isCalendar,
  handleDownloadPDF,
  generatePDF,
  onButtonClick,
}) => {
  const toast = useToast();

  return (
    <div className="flex gap-4 flex-col tablet:flex-row justify-between relative">
      <div>
        <p className="font-[500] text-[20px] laptop:text-[25px]">
          Activity log
        </p>
        <p className="">
          View and{" "}
          <button className="underline cursor-pointer" 
          onClick={() => {
            generatePDF()
            successToastMessage(toast, "Downloaded");
          }}
          >
            download
          </button>{" "}
          activity log
        </p>
      </div>
      <div className="block tablet:flex gap-3 tablet:flex-row w-fit ">
        <div className="">
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            fontSize={"14px"}
            pl={6}
            onChange={handleSearch}
          />
          <ImSearch className="relative -top-[1.6rem] w-5 h-3 left-1 text-[#B9BBBE] " />
        </div>
        <div className="tablet:w-[30%] w-[50%]  ">
          <Select
            fontWeight={"500"}
            placeholder=""
            value={selectedUser}
            onChange={handleSelect}
          >
            {allUsers.map((user, index) => (
              <option key={index} value={user.value}>
                {user.label}
              </option>
            ))}
          </Select>
        </div>
        {!isCalendar ? (
          <div
            onClick={() => {
              setIsCalendar(true);
            }}
            className="flex cursor-pointer w-[150px]  px-2 items-center gap-2 h-[38px] rounded-md  border-2 border-[#EEEEEE]"
          >
            <CiCalendar className="font-bold" />
            <p className="text-sm tablet:text-[16px] font-semibold">
              Date range
            </p>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsCalendar(false);
            }}
            className="flex cursor-pointer  w-[150px]  px-2 items-center gap-2 h-[38px] rounded-md  border-2 border-[#EEEEEE]"
          >
            <CiCalendar className="font-bold" />
            <p className="text-sm tablet:text-[16px] font-semibold">
              Date range
            </p>
          </div>
        )}
      </div>
      {isCalendar && (
        <>
          <div className="-right-10 top-28 laptop:top-12 z-50 shadow-xl absolute">
            <Calendar onChange={handleDateClick} value={selectedDate} />
            {/* <p>Selected Date: {selectedDate && selectedDate.length > 0 && selectedDate[0].time}</p> */}
          </div>
          <div
            onClick={() => {
              setIsCalendar(false);
            }}
            className=" z-10 h-[110vh] w-[98vw] absolute -top-[61vh] right-0 -left-20"
          />
        </>
      )}
      {selectedDate}
    </div>
  );
};

export default ActivityLog;
