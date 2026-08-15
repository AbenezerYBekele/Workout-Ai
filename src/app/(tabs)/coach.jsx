// src/app/(tabs)/coach.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Bot, User } from 'lucide-react-native';

import { useUserStore } from '../../store/useUserStore';
import { fetchAICoachReply } from '../../services/aiService';
import { styles, COLORS } from '../../styles/coach.styles';

export default function CoachScreen() {
  const userProfile = useUserStore((state) => state.userProfile);

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I'm Coach Max 🏋️‍♂️. How can I help you reach your ${
        userProfile?.goal ? userProfile.goal.replace('_', ' ') : 'fitness'
      } goals today?`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetchAICoachReply(
        userMessage.text,
        userProfile
      );

      const aiReply = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.reply,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error('Error in AI Coach:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Sorry, I ran into an error connecting. Please try again!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: COLORS.bgDark }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Coach Max </Text>
          <Text style={styles.subtitle}>Ask anything about workouts, diet, or form</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => {
            const isAI = item.sender === 'ai';
            return (
              <View style={[styles.messageRow, { justifyContent: isAI ? 'flex-start' : 'flex-end' }]}>
                {isAI && (
                  <View style={styles.aiAvatar}>
                    <Bot color={COLORS.primary} size={16} />
                  </View>
                )}

                <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
                  <Text style={[styles.messageText, isAI ? styles.aiText : styles.userText]}>
                    {item.text}
                  </Text>
                </View>

                {!isAI && (
                  <View style={styles.userAvatar}>
                    <User color={COLORS.textSecondary} size={16} />
                  </View>
                )}
              </View>
            );
          }}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask Coach Max a question..."
            placeholderTextColor={COLORS.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color={COLORS.primaryDark} size="small" /> : <Send color={COLORS.primaryDark} size={18} />}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}