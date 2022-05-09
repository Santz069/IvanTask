//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Color, windowDimention} from '../../Constatnts';
import Store from '../../Store/Store';
import Chart from './Chart';
import PurchaseOrderHistory from './PurchaseOrderHistory';

const tabItems = ['SCORECARD', "TODAY'S SCHEDULE", 'SWON'];
const amountAxis = ['20k', '15k', '10k', '5k', '0', ''];

// create a component
const ScoreScheduleChart = () => {
  const [seletedTab, setSelectedTab] = useState(2);
  const [seletedYear, setSelectedYear] = useState();
  const [seletedYearTotalExpense, setSeletedYearTotalExpense] = useState('');
  const [seletedYearMonthWiseOrders, setSeletedYearMonthWiseOrders] = useState(
    [],
  );

  useEffect(() => {
    if (Store.expenses.length) {
      setSelectedYear(Store.expenses[Store.expenses.length - 1].year);
      setSeletedYearTotalExpense(
        Store.expenses[Store.expenses.length - 1].totalAmount,
      );
      setSeletedYearMonthWiseOrders(
        Store.expenses[Store.expenses.length - 1].monthWiseOrders,
      );
    } else {
      setSelectedYear();
      setSeletedYearTotalExpense('');
      setSeletedYearMonthWiseOrders([]);
    }

    return () => {
      setSelectedYear();
      setSeletedYearTotalExpense('');
      setSeletedYearMonthWiseOrders([]);
    };
  }, []);

  const getSelectedYearOrderAndExpenses = item => {
    setSeletedYearTotalExpense(item?.totalAmount);
    if (item?.monthWiseOrders.length) {
      setSeletedYearMonthWiseOrders(item?.monthWiseOrders);
    } else {
      setSeletedYearMonthWiseOrders([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartScheduleScoreContainer}>
        {tabItems.map((item, index) => (
          <TouchableOpacity
            disabled={index != 2 ? true : false}
            onPress={() => setSelectedTab(index)}
            key={index}
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              borderBottomWidth: index == seletedTab ? 2 : 0,
            }}>
            <Text style={styles.tabItemStyle}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.chartContainer}>
        {seletedTab == 2 ? (
          <Chart
            expenseReportData={Store.expenses}
            amountAxis={amountAxis}
            getSelectedYearOrderAndExpenses={item =>
              getSelectedYearOrderAndExpenses(item)
            }
          />
        ) : seletedTab == 1 ? (
          <View style={styles.scheduleContainer}>
            <Text style={{fontSize: 16, color: Color.bottomTabGrey}}>
              No data available
            </Text>
          </View>
        ) : (
          <View style={styles.scorecardContainer}>
            <Text style={{fontSize: 16, color: Color.bottomTabGrey}}>
              No data available
            </Text>
          </View>
        )}
      </View>
      {seletedTab == 2 && Store.expenses.length ? (
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseHeaderStyle}>Total Expenses</Text>
          <Text style={styles.expenseAmountStyle}>
            ${' '}
            {Number(seletedYearTotalExpense)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Text>
        </View>
      ) : (
        <></>
      )}

      <View>
        <PurchaseOrderHistory
          title="PURCHASE ORDER HISTORY"
          monthWiseOrders={seletedYearMonthWiseOrders}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: windowDimention.windowWidth,
    flexDirection: 'column',
  },
  expenseContainer: {
    width: windowDimention.windowWidth,
    minHeight: 80,
    maxHeight: 100,
    borderBottomWidth: 1,
    borderBottomColor: Color.bottomTabGrey,
    borderTopWidth: 1,
    borderTopColor: Color.bottomTabGrey,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    width: windowDimention.windowWidth,
    height: 300,
    paddingVertical: 20,
  },
  tabItemStyle: {
    color: Color.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  expenseHeaderStyle: {
    color: Color.black,
    fontSize: 16,
  },
  expenseAmountStyle: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scheduleContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scorecardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartScheduleScoreContainer: {
    width: windowDimention.windowWidth,
    flexDirection: 'row',
    minHeight: 40,
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: Color.bottomTabGrey,
  },
});

//make this component available to the app
export default ScoreScheduleChart;
