import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import { getNotes, Note } from '../utils/storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
      console.log('📘 Notes Fetched:', savedNotes);
    };
    if (isFocused) fetchNotes();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={[
        styles.noteCard,
        { backgroundColor: getRandomPastelColor() }
      ]}
      onPress={() => navigation.navigate('ViewNote', { noteId: item.id })}
    >
      <Text style={styles.noteTitle}>{item.title || 'Untitled Note'}</Text>
      <Text numberOfLines={2} style={styles.noteSnippet}>
        {item.content || 'No content'}
      </Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <Text style={styles.headerSubtitle}>{notes.length} notes</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/note.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No Notes Yet</Text>
            <Text style={styles.emptyText}>
              Tap the + button to create your first note
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Image
          source={require('../assets/add.png')}
          style={styles.fabIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Helper function for pastel colors
const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 90%)`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  noteCard: {
    width: width / 2 - 20,
    padding: 15,
    borderRadius: 15,
    minHeight: 120,
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
  },
  noteSnippet: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
  noteFooter: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 8,
  },
  noteDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyImage: {
    width: 150,
    height: 150,
    opacity: 0.5,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.gray,
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    right: 35,
    bottom: 70,
    backgroundColor: COLORS.black,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white,
  },
});