//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color, windowDimention} from '../../Constatnts';
import {
  getFormattedDate,
  getFormattedDateForSingleOrder,
} from '../../Service/Service';

// create a component
const PurchaseOrderHistory = ({title, monthWiseOrders}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {title ? (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        ) : (
          <></>
        )}
        {monthWiseOrders?.length ? (
          <View style={styles.monthWiseContainer}>
            {monthWiseOrders?.map((month, index) => (
              <View key={index}>
                {month?.orders.length ? (
                  <View>
                    <Text style={styles.formatedMonth}>
                      {getFormattedDate(month?.date)}
                    </Text>
                    {month?.orders.length ? (
                      <>
                        {month?.orders.map((order, index) => (
                          <View key={index} style={styles.orderContainer}>
                            <View style={styles.orderDateStatusContainer}>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <View
                                  style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor:
                                      order?.orderStatus == 'Approved'
                                        ? Color.shadeGreen
                                        : Color.shadeRed,
                                    padding: 4,
                                    borderRadius: 5,
                                  }}>
                                  <Text
                                    style={{
                                      color:
                                        order?.orderStatus == 'Approved'
                                          ? Color.darkGreen
                                          : Color.darkRed,
                                    }}>
                                    {order?.orderStatus}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}>
                                <Text style={{color: Color.bottomTabGrey}}>
                                  {getFormattedDateForSingleOrder(
                                    order?.orderDate,
                                  )}
                                </Text>
                              </View>
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={{color: Color.bottomTabGrey}}>
                                PO Number
                                <Text
                                  style={{
                                    color: Color.deepSeaBlue,
                                  }}>{`  #${order?.orderNumber}`}</Text>
                              </Text>
                            </View>
                            <View style={{flex: 1}}>
                              <Text style={{color: Color.bottomTabGrey}}>
                                PO Amount
                                <Text
                                  style={{
                                    color: Color.black,
                                  }}>{` : $${order?.orderAmount}`}</Text>
                              </Text>
                            </View>
                          </View>
                        ))}
                      </>
                    ) : (
                      <View style={styles.singleMonthNoOrder}>
                        <Text style={{color: Color.bottomTabGrey}}>
                          This month no order vailable
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.outerNoOrderAvailable}>
            <Text style={styles.outerNoOrderText}>No order available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    width: windowDimention.windowWidth,
  },
  titleText: {color: Color.black, fontSize: 16, fontWeight: 'bold'},
  titleContainer: {
    height: 50,
    width: windowDimention.windowWidth,
    justifyContent: 'center',
    padding: 10,
  },
  monthWiseContainer: {
    minHeight: 200,
    width: windowDimention.windowWidth,
    flexDirection: 'column',
    padding: 10,
  },
  formatedMonth: {
    color: Color.bottomTabGrey,
    marginTop: 20,
    marginBottom: 10,
  },
  orderContainer: {
    minHeight: 100,
    width: windowDimention.windowWidth - 20,
    flexDirection: 'column',
    padding: 20,
    borderWidth: 1,
    borderColor: Color.bottomTabGrey,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderDateStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  singleMonthNoOrder: {
    minHeight: 100,
    width: windowDimention.windowWidth - 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.bottomTabGrey,
  },
  outerNoOrderAvailable: {
    minHeight: 200,
    width: windowDimention.windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  outerNoOrderText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Color.bottomTabGrey,
  },
});

//make this component available to the app
export default PurchaseOrderHistory;
