// app/onboarding.styles.js
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

// Design System Colors
export const COLORS = {
  bgDark: '#b0e5e8', // slate-950
  cardDark: '#d4fbfc', // slate-900
  inputDark: '#d1e8e3',
  borderDark: '#1e293b', // slate-800
  borderFocus: '#0ea5e9', // sky-500



  // Accents
  primary: '#10b981', // sky-500
  primaryHover: '#0284c7', // sky-600
  primaryBorder: '#38bdf8', // sky-400
  textPrimary: '#020617',
  textSecondary: '#020617',
  textMuted: '#475569',

  // Active States
  activeCardBg: 'rgba(14, 165, 233, 0.15)',
  activeCardBorder: '#0ea5e9',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    maxWidth: isDesktop ? 600 : '100%',
    width: '100%',
    alignSelf: 'center',
  },

  // Progress Bar Header
  progressSection: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: COLORS.borderDark,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
  },

  // Step Section Headings
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  stepSubheading: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },

  // Inputs
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  inputBoxFocused: {
    borderColor: COLORS.borderFocus,
    backgroundColor: COLORS.inputDark,
  },
  textInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  rowGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  halfInput: {
    flex: 1,
  },

  // Option Cards (Single Select)
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  optionCard: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCardActive: {
    backgroundColor: COLORS.activeCardBg,
    borderColor: COLORS.activeCardBorder,
  },
  optionCardText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  optionCardTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },

  // Large Goal Cards
  goalCard: {
    padding: 16,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalCardActive: {
    backgroundColor: COLORS.activeCardBg,
    borderColor: COLORS.activeCardBorder,
  },
  goalCardText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  goalCardTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },

  // Chips (Multi-select)
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  chipActive: {
    backgroundColor: COLORS.activeCardBg,
    borderColor: COLORS.activeCardBorder,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },

  // Days per Week Grid
  dayGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayPill: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayPillActive: {
    backgroundColor: COLORS.activeCardBg,
    borderColor: COLORS.activeCardBorder,
  },
  dayPillText: {
    color: COLORS.textSecondary,
    fontWeight: '700',
    fontSize: 16,
  },
  dayPillTextActive: {
    color: COLORS.primary,
  },

  // Navigation Bar
  navRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
    paddingTop: 24,
  },
  backButton: {
    flex: 1,
    height: 52,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '700',
    fontSize: 14,
  },
  nextButton: {
    flex: 2,
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nextButtonText: {
    color: COLORS.bgDark,
    fontWeight: '800',
    fontSize: 14,
    marginRight: 6,
  },
});