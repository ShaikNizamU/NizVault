import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getNoteById, deleteNote, Note } from '../utils/storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type RouteParams = RouteProp<RootStackParamList, 'ViewNote'>;

export default function ViewNoteScreen() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const n = await getNoteById(route.params.noteId);
      if (n) setNote(n);
    };
    fetchNote();
  }, []);

  const handleDelete = async () => {
    if (note) {
      await deleteNote(note.id);
      navigation.goBack();
    }
  };

  if (!note) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Button title="Delete Note" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, marginBottom: 20 },
});
