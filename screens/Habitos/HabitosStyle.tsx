import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3730A3',
        paddingVertical: 30,
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    daysScroll: {
        height: 40,
        maxHeight: 40,
        marginTop: 10,
        marginBottom: 5,
    },
    daysContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    dayButton: {
        backgroundColor: '#e4e4e4',
        borderRadius: 20,
        paddingHorizontal: 14,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },

    selectedDay: {
        backgroundColor: '#9FA6FF',
    },
    dayText: {
        color: '#333',
        fontWeight: '500',
    },
    selectedDayText: {
        color: '#fff',
    },
    habitListContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        maxHeight: height * 0.65,
    },
    habitCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 12,
    },
    habitTitle: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    habitTime: {
        color: '#9FA6FF',
        fontSize: 14,
        marginRight: 10,
    },
    icon: {
        marginHorizontal: 4,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#3730A3',
        padding: 10,
        elevation: 4,
    },
});

export default styles;