import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { getNoteById, deleteNote, Note } from '../utils/storage';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import COLORS from '../constants/colors';

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
  }, [route.params.noteId]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            if (note) {
              await deleteNote(note.id);
              navigation.goBack();
            }
          } 
        }
      ]
    );
  };

  const handleEdit = () => {
    if (note) {
      navigation.navigate('AddNote', { 
        noteId: note.id,
        initialTitle: note.title,
        initialContent: note.content 
      });
    }
  };

  if (!note) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading note...</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          {/* <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>Edit</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={[styles.actionButtonText, { color: COLORS.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.dateText}>
          {formatDate(note.updatedAt || note.createdAt)}
        </Text>
        
        <Text style={styles.title}>{note.title}</Text>
        
        <Text style={styles.content}>{note.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 24,
    lineHeight: 36,
  },
  content: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
});