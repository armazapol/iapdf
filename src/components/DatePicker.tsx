'use client'
import style from '@/styles/HistoryContainer.module.css'
import { FC, forwardRef, useCallback } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import {
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/input';
import {
  Stack,
  Box,
  Flex
} from '@chakra-ui/react';
import {
  CalendarIcon,
} from '@chakra-ui/icons';
import { css } from '@emotion/css';
import { ClassNames } from '@emotion/react';
import  ScrollDate  from '@/components/ScrollDate';
import { useState } from 'react';

const CustomInput = forwardRef<any, any>((props, ref) => {
  
  const { onClick, value, ...rest } = props;

  return (
    <InputGroup className="group ml-[-40px]" >
      <InputLeftElement
        userSelect="none"
        pointerEvents="none"
        display="flex"
        alignItems="center"
        height="100%"
        pl="8"
        className="text-[#6C606C] group-focus-within:text-[#FFFFFF]"  
      >
        <CalendarIcon />
      </InputLeftElement>
      <Input
        {...rest}
        ref={ref}
        placeholder="Select Date"
        className="w-[125px] h-[40px] bg-[#FFFFFF] placeholder-[#6C606C] rounded-[6px] border border-[#B2B2B2] pl-8 focus:bg-[#2E3A59] focus:placeholder-white focus:h-[40px]"
        cursor="pointer"
        onClick={onClick}
      />
    </InputGroup>
  );
});


// Componente CustomHeader
const CustomHeader = ({
 
}: any) => {
  return (
    <Stack direction="row" pb={1} alignItems="center" textAlign="left" pl={4} pr={6}>
      <div className="flex flex-col ml-4 mr-4 mt-2">
        <div className='flex gap-[10px]'>
          <button className={style.btnTime}>Today</button>
          <button className={style.btnTime} >Week</button>
          <button className={style.btnTime} >Month</button>
          <button className={style.btnTime} >Year</button>
        </div>
        <div className="border-[0.5px] w-[99%]  border-[#D0D5DD] mt-3 mb-1"></div>
      </div>
    </Stack>
  );
};

// Estilos para el DatePicker
function useDatePickerStyles() {
  return css`
    .react-datepicker {
      background-color: red;
      box-shadow: var(--chakra-shadows-sm);
      border-radius: 18px;
      &__header {
        background: none;
        border-bottom: none;
      }
     
      &__month {
        margin-top: 0;
        position: relative;
        left: -44px;
      }

      &__day-name {
        color: #364261; /* gray.400 */
        font-weight: 500;
        width: 28px;
        text-align: center;
        position: relative;
        left: -44px;
        font-size: 10px;
      }

      &__day {
        line-height: 28px;
        color: #364261; /* gray.700 */
        width: 28px;
        height: 28px;
        border-radius: 8px;
        text-align: center;
        font-size: 12px;
      }

      &_day:not(.react-datepickerday--selected, .react-datepicker_day--keyboard-selected):hover {
        background-color: white;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
      }

      &__day--today {
        background-color: #edf2f7; /* gray.100 */
        font-weight: 400;
      }

      &__day--selected,
      &__day--keyboard-selected {
        background-color: #3B82F6; /* gray.700 */
        color: white;
      }
    }
  `;
}

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
}

// Componente DatePicker
const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const styles = useDatePickerStyles();
  const render = useCallback(
    ({ css }: { css: (styles: any) => string }) => {
      return (
          <Stack>
            <ReactDatePicker
            dateFormat="dd MMMM, yyyy"
            showPopperArrow={false}
            popperClassName={css({ marginTop: '-5px', marginLeft:'92px'})}
            calendarClassName={styles}
            selected={value}
            onChange={(date) =>
              Array.isArray(date) ? onChange(date[0]) : onChange(date)
            }
            customInput={<CustomInput />}
            renderCustomHeader={CustomHeader}
            open={isOpen} 
            onInputClick={() => setIsOpen(true)} 
            >
              <Box className="w-[0px] h-[0px]" >
                <ScrollDate/>
              </Box>
              <Box className=" w-[303px] flex flex-col mb-4 ml-[10px] " >
                <div className="border-[0.5px] w-[100%] border-[#D0D5DD] relative top-[5px] mb-5"></div>
                <Box className="flex justify-between mt-1 ">
                  <button onClick={()=>setIsOpen(false)} className="w-[80px] border border-[#2E3A59] rounded-[6px] p-2 cursor-pointer text-xs font-medium leading-[12px] h-[33px]">Cancel</button>
                  <button className='w-[80px] border p-2 rounded-[6px] bg-[#2E3A59] text-[#FFFFFF] from-neutral-500 cursor-pointer font-medium text-xs leading-[12px] h-[33px]'>Apply</button> 
                </Box>
              </Box>
            </ReactDatePicker>
        </Stack>
      );
    },
    [styles, value, onChange, isOpen]
  );
  return <ClassNames>{render}</ClassNames>;
};

// Componente DatePicker 
const DatePickerWithScroll: FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <Flex direction="row" align="flex-start" gap={4}>
      <Box ml={40}>
        <DatePicker value={value} onChange={onChange} />
      </Box>
    </Flex>
  );
};

export default DatePickerWithScroll;