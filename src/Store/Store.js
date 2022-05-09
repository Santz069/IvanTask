import { ImageConstant } from "../Constatnts";


 const Store = {
  expenses: [
    {
      year: '2019',
      totalAmount: 12200,
      monthWiseOrders: [
        {
          date: '01-09-2019',
          orders: [
            {
              orderDate: '25-09-2019',
              orderStatus: 'Approved',
              orderNumber: 'PO253614',
              orderAmount: 5000,
            },
          ],
        },
        {
          date: '01-10-2019',
          orders: [
            {
              orderDate: '24-10-2019',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 6500,
            },
          ],
        },
        {
          date: '01-11-2019',
          orders: [
            {
              orderDate: '23-11-2019',
              orderStatus: 'Approved',
              orderNumber: 'PO253612',
              orderAmount: 700,
            },
          ],
        },
      ],
    },
    {
      year: '2020',
      totalAmount: 10200,
      monthWiseOrders: [
        {
          date: '01-09-2020',
          orders: [
            {
              orderDate: '25-09-2020',
              orderStatus: 'Approved',
              orderNumber: 'PO253614',
              orderAmount: 5000,
            },
          ],
        },
        {
          date: '01-10-2020',
          orders: [
            {
              orderDate: '24-10-2020',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 500,
            },
            {
              orderDate: '23-10-2020',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 700,
            },
          ],
        },
        {
          date: '01-11-2020',
          orders: [
            {
              orderDate: '23-11-2020',
              orderStatus: 'Approved',
              orderNumber: 'PO253612',
              orderAmount: 4000,
            },
          ],
        },
      ],
    },
    {
      year: '2021',
      totalAmount: 7800,
      monthWiseOrders: [
        {
          date: '01-09-2021',
          orders: [
            {
              orderDate: '25-09-2021',
              orderStatus: 'Approved',
              orderNumber: 'PO253614',
              orderAmount: 5000,
            },
            {
              orderDate: '21-09-2021',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 700,
            },
          ],
        },
        {
          date: '01-10-2021',
          orders: [
            {
              orderDate: '24-10-2021',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 500,
            },
          ],
        },
        {
          date: '01-11-2021',
          orders: [
            {
              orderDate: '23-11-2021',
              orderStatus: 'Approved',
              orderNumber: 'PO253612',
              orderAmount: 1600,
            },
          ],
        },
      ],
    },
    {
      year: '2022',
      totalAmount: 10200,
      monthWiseOrders: [
        {
          date: '01-01-2022',
          orders: [
            {
              orderDate: '25-01-2022',
              orderStatus: 'Approved',
              orderNumber: 'PO253614',
              orderAmount: 5000,
            },
            {
              orderDate: '22-01-2022',
              orderStatus: 'Rejected',
              orderNumber: 'PO253613',
              orderAmount: 700,
            },
          ],
        },
        {
          date: '01-02-2022',
          orders: [
            {
              orderDate: '01-02-2022',
              orderStatus: 'Approved',
              orderNumber: 'PO253613',
              orderAmount: 500,
            },
          ],
        },
        {
          date: '01-03-2022',
          orders: [
            {
              orderDate: '23-03-2022',
              orderStatus: 'Approved',
              orderNumber: 'PO253612',
              orderAmount: 3200,
            },
          ],
        },
      ],
    },
  ],
  worksData: [
    {
      workDate: '07-04-2022',
      trendStatus: 'High',
      workDescription: 'System fo reporting faults and breakdowns',
      currentStatus: 'Assigned',
      workNumber: 'WON56987452',
      customer: {
        type: 'Customer',
        name: 'Robert Odell',
        lat: 52.23654856,
        lng: 12.36542145,
        customerImage: ImageConstant.userPhoto,
      },
      otherPerson: [
        {personImage: ImageConstant.userPhoto},
        {personImage: ImageConstant.userPhoto},
      ],
      poType: 'PO',
      poCount: 2,
      noteType: 'Note',
      noteCount: 2,
    },
    {
      workDate: '03-04-2022',
      trendStatus: 'Medium',
      currentStatus: 'Assigned',
      workNumber: 'WON56987420',
      workDescription: 'System fo reporting faults and breakdowns',
      customer: {
        type: 'Customer',
        name: 'Robert Dawyne',
        lat: 52.23654856,
        lng: 12.36542145,
        customerImage: ImageConstant.userPhoto,
      },
      otherPerson: [
        {personImage: ImageConstant.userPhoto},
        {personImage: ImageConstant.userPhoto},
      ],
      poType: 'PO',
      poCount: 2,
      noteType: 'Note',
      noteCount: 2,
    },
    {
      workDate: '01-04-2022',
      trendStatus: 'Medium',
      currentStatus: 'Assigned',
      workNumber: 'WON56987425',
      workDescription: 'System fo reporting faults and breakdowns',
      customer: {
        type: 'Customer',
        name: 'Robert Unknown',
        lat: 52.23654856,
        lng: 12.36542145,
        customerImage: ImageConstant.userPhoto,
      },
      otherPerson: [
        {personImage: ImageConstant.userPhoto},
        {personImage: ImageConstant.userPhoto},
      ],
      poType: 'PO',
      poCount: 2,
      noteType: 'Note',
      noteCount: 2,
    },
  ],
  notesData:[]
};

export default Store
