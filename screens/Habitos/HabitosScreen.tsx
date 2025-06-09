import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router'
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from "./HabitosStyle";
import {habits, days} from '@/app/data';

const router = useRouter();

  const handleViewHabit = (id: string) => {
        router.push({
            pathname: `/habitos/[id]`, 
            params: { id: id } 
        });
    };



// const habits = [
//     { title: 'Cepillarse los dientes', time: '06:30 am' },
//     { title: 'Hacer tarea', time: '10:00 am' },
//     { title: 'Comer fruta', time: '11:00 am' },
//     { title: 'Tomar agua', time: '12:00 pm' },
//     { title: 'Descansar', time: '04:00 pm' },
//     { title: 'Cepillarse los dientes', time: '06:30 am' },
//     { title: 'Hacer tarea', time: '10:00 am' },
//     { title: 'Comer fruta', time: '11:00 am' },
//     { title: 'Tomar agua', time: '12:00 pm' },
//     { title: 'Descansar', time: '04:00 pm' },
// ];

// const days = [
//     'Diariamente',
//     'Lunes',
//     'Martes',
//     'Miércoles',
//     'Jueves',
//     'Viernes',
//     'Sábado',
//     'Domingo',
// ];

const HabitScreen = () => {
    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                {/* <Text style={styles.headerText}>Lista de habitos</Text> */}
            </View>

            {/* Días de la semana */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.daysScroll}
                contentContainerStyle={styles.daysContainer}
            >
                {days.map((day, index) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            index === 0 && styles.selectedDay,
                        ]}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                index === 0 && styles.selectedDayText,
                            ]}
                        >
                            {day}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Lista de hábitos (scrollable) */}
            <View style={styles.habitListContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {habits.map((habit, index) => (
                        <View key={index} style={styles.habitCard}>
                            <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color="#3730A3" />
                            <Text style={styles.habitTitle}>{habit.title}</Text>
                            <Text style={styles.habitTime}>{habit.time}</Text>
                             <TouchableOpacity
                                onPress={() => handleViewHabit(habit.id.toString())} // Asegúrate de que habit.id sea string
                                style={styles.icon}
                            >
                                <Feather name="eye" size={20} color="#9FA6FF" />
                            </TouchableOpacity>
                            <Feather name="edit-3" size={20} color="#9FA6FF" style={styles.icon} />
                            <Feather name="trash-2" size={20} color="#9FA6FF" />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Botón de agregar */}
            <TouchableOpacity style={styles.addButton}>
                <Feather name="plus" size={24} color="#3730A3" />
            </TouchableOpacity>
        </View>
    );
};

export default HabitScreen;