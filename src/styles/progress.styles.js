// src/styles/progress.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

export const COLORS = {
  bgDark: '#b0e5e8',
  cardDark: '#d4fbfc',
  borderDark: '#1e293b',
  primary: '#0ea5e9',
  primarySolid: '#0ea5e9',
  primaryDark: '#030712',
  textPrimary: '#020617',
  textSecondary: '#94a3b8',
  textMuted: '#475599',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
    maxWidth: isDesktop ? 680 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subheading: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.bgDark,
    color: COLORS.textPrimary,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    fontSize: 14,
  },
  photoButton: {
    backgroundColor: COLORS.bgDark,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.borderDark,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  photoButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 8,
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: COLORS.primarySolid,
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default function Dummy() { return null; }