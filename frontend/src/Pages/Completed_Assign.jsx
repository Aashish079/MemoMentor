import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective,Page, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import {employeesData, employeesGrid } from '../Data/dummy';
import {Header} from '../Components'
import { useStateContext } from '../Contexts/ContextProvider';
const Completed_Assign = () => {
  const {assignMentTitle}=useStateContext()
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Completed Assignments" />
      <GridComponent
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width= 'auto'
      >
        <ColumnsDirective>
          {assignMentTitle.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Completed_Assign;