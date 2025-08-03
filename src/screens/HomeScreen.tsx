import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getNotes, Note } from '../utils/storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
      console.log('Fetching Notes:', savedNotes);
    };
    if (isFocused) fetchNotes();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Button title="Add Note" onPress={() => navigation.navigate('AddNote')} />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => navigation.navigate('ViewNote', { noteId: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  note: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
});
