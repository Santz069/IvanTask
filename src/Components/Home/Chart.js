//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Color} from '../../Constatnts';

// create a component
const Chart = ({
  expenseReportData,
  amountAxis,
  getSelectedYearOrderAndExpenses,
}) => {
  const [seletedYear, setSelectedYear] = useState();

  useEffect(() => {
    if (expenseReportData.length) {
      setSelectedYear(expenseReportData[expenseReportData.length - 1].year);
    } else {
      setSelectedYear();
    }

    return () => {
      setSelectedYear();
    };
  }, []);
  return (
    <>
      {expenseReportData?.length ? (
        <View style={styles.chartContainer}>
          <View style={styles.amountContainer}>
            {amountAxis?.map((amount, index) => (
              <View key={index} style={styles.amountItem}>
                <Text>{amount}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartBarContainer}>
            {expenseReportData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedYear(item?.year),
                    getSelectedYearOrderAndExpenses(item);
                }}
                style={{
                  height: '100%',
                  width: '20%',
                  alignItems: 'center',
                  backgroundColor:
                    item?.year == seletedYear
                      ? Color.bottomTabGrey
                      : Color.screen,
                  flexDirection: 'column',
                }}>
                <View style={styles.chartBarStyle}>
                  <View
                    style={{
                      height: `${parseInt((item?.totalAmount / 20000) * 100)}%`,
                      width: '80%',
                      backgroundColor: Color.limeGreen,
                      borderRadius: 5,
                    }}></View>
                </View>
                <View style={styles.chartYearContainer}>
                  <Text>{item?.year}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={{fontSize: 16, color: Color.bottomTabGrey}}>
            No data available
          </Text>
        </View>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  amountContainer: {
    width: '20%',
    height: '100%',
    flexDirection: 'column',
  },
  amountItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartBarContainer: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartBarStyle: {
    height: '84%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartYearContainer: {
    height: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Chart;
