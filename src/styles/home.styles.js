// src/app/(tabs)/home.styles.js (or app/(tabs)/home.styles.js)
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isDesktop = Platform.OS === 'web' && width >= 768;

// Design System Color Tokens
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



  // Feature Palettes
  amberBg: 'rgba(69, 26, 3, 0.6)',
  amberBorder: '#78350f',
  amberText: '#fbbf24',

  skyBg: 'rgba(8, 47, 73, 0.4)',
  skyBorder: '#0c4a6e',
  skyText: '#38bdf8',

  emeraldBg: 'rgba(6, 78, 59, 0.6)',
  emeraldBorder: '#065f46',
  emeraldText: '#34d399',

  orangeBg: 'rgba(67, 20, 7, 0.6)',
  orangeBorder: '#7c2d12',
  orangeText: '#fb923c',

  roseBg: 'rgba(76, 5, 25, 0.3)',
  roseBorder: 'rgba(136, 19, 55, 0.6)',
  roseText: '#fb7185',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 32,
    maxWidth: isDesktop ? 680 : '100%',
    width: '100%',
    alignSelf: 'center',
  },

  // Greeting Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingSub: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  greetingName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.amberBg,
    borderWidth: 1,
    borderColor: COLORS.amberBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  streakText: {
    color: COLORS.amberText,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },

  // AI Daily Tip Card
  tipCard: {
    backgroundColor: COLORS.skyBg,
    borderWidth: 1,
    borderColor: COLORS.skyBorder,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    color: COLORS.skyText,
    fontWeight: '600',
    fontSize: 10,
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tipBody: {
    color: '#e2e8f0', // slate-200
    fontSize: 13,
    lineHeight: 20,
  },

  // Section Headings
  sectionHeading: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
    letterSpacing: -0.3,
  },

  // Scheduled Workout Action Card
  planCard: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planInfo: {
    flex: 1,
    marginRight: 12,
  },
  planBadge: {
    backgroundColor: 'rgba(8, 47, 73, 0.6)',
    borderWidth: 1,
    borderColor: COLORS.skyBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  planBadgeText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  planTitle: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 20,
  },
  planSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  planIconBox: {
    backgroundColor: COLORS.bgDark,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  planButton: {
    backgroundColor: COLORS.primarySolid,
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    fontSize: 14,
    marginRight: 6,
  },

  // Daily Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 16,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 2,
  },
  metricUnit: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 2,
  },

  // Quick Shortcuts List
  shortcutsList: {
    gap: 10,
    marginBottom: 16,
  },
  shortcutCard: {
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shortcutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  shortcutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  shortcutTextWrapper: {
    flex: 1,
  },
  shortcutTitle: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  shortcutSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  // Sign Out Button
  signOutButton: {
    backgroundColor: COLORS.roseBg,
    borderWidth: 1,
    borderColor: COLORS.roseBorder,
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signOutText: {
    color: COLORS.roseText,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 8,
  },
});