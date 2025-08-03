import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { saveNote } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Oops!', 'Please add a title');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Oops!', 'Note content cannot be empty');
      return;
    }

    try {
      await saveNote(title, content);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Note</Text>
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="What's this about?"
          placeholderTextColor={COLORS.gray400}
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          autoFocus
          maxLength={60}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          placeholder="Start writing your thoughts..."
          placeholderTextColor={COLORS.gray400}
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.contentInput}
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, (!title || !content) && styles.disabledButton]}
            onPress={handleSave}
            disabled={!title || !content}
          >
            <Text style={styles.buttonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  titleInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 16,
    marginBottom: 24,
    borderRadius: 12,
    fontSize: 18,
    color: COLORS.textPrimary,
    elevation: 2,
    shadowColor: COLORS.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    minHeight: 200,
    elevation: 2,
    shadowColor: COLORS.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: COLORS.black,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: COLORS.shadowPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  disabledButton: {
    backgroundColor: COLORS.gray300,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});