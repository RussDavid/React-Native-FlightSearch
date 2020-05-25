import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import FlightData from '../flight-data.json'

const SearchForm = ({ navigation }) => {
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [deptDate, setDeptDate] = useState();
    const [returnDate, setReturnDate] = useState();
    const [passengers, setPassengers] = useState();

    return (
        <React.Fragment>
            <Formik
                initialValues={{ origin: '', destination: '', deptDate: '', returnDate: '', passengers: '' }}
                onSubmit={values => {
                    setOrigin(values.origin);
                    setDestination(values.destination);
                    setDeptDate(values.deptDate);
                    if (values.returnDate !== '') {
                        setReturnDate(values.returnDate);
                    } else {
                        setReturnDate(null);
                    }
                    setPassengers(values.passengers);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <Text>Origin</Text>
                        <TextInput
                            onChangeText={handleChange('origin')}
                            onBlur={handleBlur('origin')}
                            value={values.origin}
                        />
                        <Text>Destination</Text>
                        <TextInput
                            onChangeText={handleChange('destination')}
                            onBlur={handleBlur('destination')}
                            value={values.destination}
                        />
                        <Text>Depature Date - DATE FORMAT: YYYY-MM-DD</Text>
                        <TextInput
                            onChangeText={handleChange('deptDate')}
                            onBlur={handleBlur('deptDate')}
                            value={values.deptDate}
                        />
                        <Text>Return Date - leave this field blank to search one way tickets</Text>
                        <TextInput
                            onChangeText={handleChange('returnDate')}
                            onBlur={handleBlur('returnDate')}
                            value={values.returnDate}
                        />
                        <Text>Passengers</Text>
                        <TextInput
                            onChangeText={handleChange('passengers')}
                            onBlur={handleBlur('passengers')}
                            value={values.passengers}
                        />
                        <Button onPress={handleSubmit} title="Search" />
                    </View>
                )}
            </Formik>
            <Text>
                FLIGHTS TO DESTINATION: {destination}
            </Text>
            {FlightData.map((originFlight) => {
                originFlight.origin.toLowerCase() === origin.toLowerCase() &&
                    originFlight.destination.toLowerCase() === destination.toLowerCase() &&
                    originFlight.departure_date === deptDate &&
                    <Text>Destination: {originFlight.destination}</Text>
                    <Text>Origin: {originFlight.origin}</Text>
                    <Text>Depature Date: {originFlight.departure_date}</Text>
                    <Text>Cost: {originFlight.cost * passengers}</Text>
            })
            }
            {deptDate != null && <Text>
                RETURN FLIGHTS: {returnDate}
            </Text>
            }
            {FlightData.map((destFlight) => {
                destFlight.origin.toLowerCase() === destination.toLowerCase() &&
                    destFlight.destination.toLowerCase() === origin.toLowerCase() &&
                    destFlight.departure_date === returnDate &&
                    <Text>Destination: {originFlight.destination}</Text>
                    <Text>Origin: {originFlight.origin}</Text>
                    <Text>Depature Date: {originFlight.departure_date}</Text>
                    <Text>Cost: {originFlight.cost * passengers}</Text>
            })}
        </React.Fragment>
    )
}

export default SearchForm;