// src/app/(tabs)/coach.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

export const COLORS = {


 bgDark: '#b0e5e8', // slate-950
     cardDark: '#d4fbfc', // slate-900
     inputDark: '#d1e8e3',
     borderDark: '#1e293b', // slate-800
     borderFocus: '#0ea5e9', // sky-500
     primary: '#10b981', // sky-500
     primaryHover: '#0284c7', // sky-600
     primaryBorder: '#38bdf8', // sky-400
     textPrimary: '#020617',
     textSecondary: '#020617',
     textMuted: '#475569',
     };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    paddingHorizontal: 16,
    paddingTop: 48,
    maxWidth: isDesktop ? 680 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDark,
    paddingBottom: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.borderDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bubble: {
    padding: 14,
    borderRadius: 16,
    maxWidth: '80%',
  },
  aiBubble: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  userBubble: {
    backgroundColor: COLORS.primarySolid,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: COLORS.textPrimary,
  },
  userText: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 18,
    padding: 8,
    marginVertical: 16,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: COLORS.primarySolid,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});