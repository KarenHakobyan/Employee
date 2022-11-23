import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getEmployees } from '../../store/fileAttachment/fileAttachmentSlice';

const Employees: FC = () => {
    const dispatch = useDispatch();

    const { employeesStatistic } = useSelector(
        (state: RootState) => {
          const {
            employees: {employeesStatistic},
          } = state;

          return {
            employeesStatistic
          };
        }
      );

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    if (!employeesStatistic) {
        return <></>;
    }


    return (
        <>
            {
                Object.values(employeesStatistic)?.map((item: any) => {
                    return item.map((val: any) => {
                        return (
                        <>
                            <div className="divider my-3 bold" />{Object.values(val).map((employee: any) => {
                            return (
                                <div className='mr-4 btn-primary font-weight-bold my-2 d-flex justify-content-center'>
                                    <div className='font-size-lg'>{employee?.name} {employee === +employee && `${employee}%`}</div>
                                </div>
                            );

                        })}
                        </>
                    )
                    })
                })
            }
        </>
    );
}

export default Employees;